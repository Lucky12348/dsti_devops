describe('database initialization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('initializes and exposes a database instance', async () => {
    const { initDatabase } = require('../src/database');
    const db = await initDatabase(':memory:');
    expect(db.prepare).toBeDefined();
    const row = await new Promise((resolve, reject) => {
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    expect(row.name).toBe('users');
  });

  it('throws when database is not initialized', () => {
    const { getDatabase } = require('../src/database');
    expect(() => getDatabase()).toThrow('Database has not been initialized');
  });
});