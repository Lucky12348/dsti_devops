const express = require('express');
const { initDatabase } = require('./database');
const usersRouter = require('../routes/users');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

function createApp(dbPath) {
  const dbReady = initDatabase(dbPath);

  const app = express();
  app.use(express.json());

  app.use(async (req, res, next) => {
    try {
      await dbReady;
      next();
    } catch (err) {
      next(err);
    }
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/users', usersRouter);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.json(swaggerSpec);
  });

  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    console.error(err); // surface unexpected errors
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
