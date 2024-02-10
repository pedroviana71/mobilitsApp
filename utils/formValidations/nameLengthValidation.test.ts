import {nameLengthValidation} from './nameLengthValidation';

describe('name length validation', () => {
  test('it should be valid', () => {
    const result = nameLengthValidation('pedro');
    expect(result).toBe(true);
  });
  test('it should be more than 1 characters', () => {
    const result = nameLengthValidation('p');
    expect(result).toBe(false);
  });

  test('it should be less than 50 characters', () => {
    const result = nameLengthValidation(
      'pedropedropedropedropedropedropedropedropedropedro',
    );
    expect(result).toBe(false);
  });
});
