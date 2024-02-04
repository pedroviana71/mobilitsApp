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
export interface createUserResponse {
  user: {_id: string};
  tokens: Tokens;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  apps: string[];
  isCarRented: boolean;
  rentPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginResponse {
  user: User;
  tokens: Tokens;
}
