export const passwordValidation = (password: string, passwordConfirmation?: string): boolean => {
  const isPasswordLong = password.length >= 8;
  const isPasswordMatching = password === passwordConfirmation;

  if (!isPasswordLong || !isPasswordMatching) {
    return false;
  }

  return true;
};
