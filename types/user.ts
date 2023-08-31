export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  firstName: string;
  lastName: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
