export const emailValidation = (email: string): boolean => {
  const validation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return validation.test(email);
};
