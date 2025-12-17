const { validateUserInput } = require('../src/models/userModel');

describe('validateUserInput', () => {
  it('returns normalized user data', () => {
    const result = validateUserInput({ name: ' Alice ', email: 'Test@Email.com ' });
    expect(result).toEqual({ name: 'Alice', email: 'test@email.com' });
  });

  it('throws on missing name', () => {
    expect(() => validateUserInput({ email: 'user@example.com' })).toThrow('Name is required');
  });

  it('throws on invalid email', () => {
    expect(() => validateUserInput({ name: 'Bob', email: 'invalid' })).toThrow('A valid email is required');
  });
});