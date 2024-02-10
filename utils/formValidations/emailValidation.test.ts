import {emailValidation} from './emailValidation';

describe('email validation', () => {
  test('it should return true', () => {
    const result = emailValidation('email@gmail.com');
    expect(result).toBe(true);
  });

  test('it should return false', () => {
    const result = emailValidation('teste');
    expect(result).toBe(false);
  });

  test('it should return true', () => {
    const result = emailValidation('teste@teste.com.br');
    expect(result).toBe(true);
  });

  test('it should return false', () => {
    const result = emailValidation('teste!teste.com.br');
    expect(result).toBe(false);
  });

  test('it should return false', () => {
    const result = emailValidation('teste@teste');
    expect(result).toBe(false);
  });
});
