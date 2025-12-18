const request = require('supertest');
const { createApp } = require('../src/app');

describe('Users API', () => {
  let app;

  beforeEach(() => {
    app = createApp(':memory:');
  });

  it('returns health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('creates and retrieves a user', async () => {
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'Jane Doe', email: 'jane@example.com' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toBeDefined();

    const getResponse = await request(app).get(`/users/${createResponse.body.id}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.email).toBe('jane@example.com');
  });

  it('updates a user', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({ name: 'Old Name', email: 'old@example.com' });

    const updateResponse = await request(app)
      .put(`/users/${body.id}`)
      .send({ name: 'New Name', email: 'new@example.com' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('New Name');
  });

  it('deletes a user', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({ name: 'To Delete', email: 'delete@example.com' });

    const deleteResponse = await request(app).delete(`/users/${body.id}`);
    expect(deleteResponse.status).toBe(204);

    const missingResponse = await request(app).get(`/users/${body.id}`);
    expect(missingResponse.status).toBe(404);
  });

  it('validates bad input', async () => {
    const response = await request(app).post('/users').send({ name: '', email: 'bad' });
    expect(response.status).toBe(400);
  });
});