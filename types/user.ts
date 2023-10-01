export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  name: string;
  lastName: string;
  isCarRented: boolean;
  rentPrice?: number;
  apps: string[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
