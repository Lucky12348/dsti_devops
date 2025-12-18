const express = require('express');
const { validateUserInput } = require('../models/userModel');
const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../repositories/userRepository');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = validateUserInput(req.body);
    const created = await createUser(user);
    return res.status(201).json(created);
  } catch (error) {
    if (error && error.message) {
      return res.status(400).json({ error: error.message });
    }
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = validateUserInput(req.body);
    const updated = await updateUser(id, user);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(updated);
  } catch (error) {
    if (error && error.message) {
      return res.status(400).json({ error: error.message });
    }
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const removed = await deleteUser(id);
    if (!removed) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
