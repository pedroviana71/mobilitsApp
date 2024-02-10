import {passwordValidation} from './passwordValidation';

describe('password validation', () => {
  test('it should return true', () => {
    const result = passwordValidation('12345678');
    expect(result).toBe(true);
  });
  test('it should return false', () => {
    const result = passwordValidation('12345');
    expect(result).toBe(false);
  });
});
