export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  firstName: string;
  lastName: string;
  isCarRented: boolean;
  rentValue?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
