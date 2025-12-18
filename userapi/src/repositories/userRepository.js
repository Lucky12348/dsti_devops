const { initDatabase, get, all, run } = require('../database');
const { mapUserRow } = require('../models/userModel');

async function listUsers() {
  const db = await initDatabase();
  const rows = await all(db, 'SELECT * FROM users ORDER BY id');
  return rows.map(mapUserRow);
}

async function getUserById(id) {
  const db = await initDatabase();
  const row = await get(db, 'SELECT * FROM users WHERE id = ?', [id]);
  return mapUserRow(row);
}

async function createUser(user) {
  const db = await initDatabase();
  const result = await run(
    db,
    'INSERT INTO users (name, email, created_at, updated_at) VALUES (?, ?, datetime("now"), datetime("now"))',
    [user.name, user.email]
  );
  return getUserById(result.lastID);
}

async function updateUser(id, user) {
  const db = await initDatabase();
  const result = await run(
    db,
    'UPDATE users SET name = ?, email = ?, updated_at = datetime("now") WHERE id = ?',
    [user.name, user.email, id]
  );
  if (result.changes === 0) {
    return null;
  }
  return getUserById(id);
}

async function deleteUser(id) {
  const db = await initDatabase();
  const result = await run(db, 'DELETE FROM users WHERE id = ?', [id]);
  return result.changes > 0;
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
