export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  apps: App[];
  isCarRented: boolean;
  rentPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface App {
  _id: string;
  name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  _id: string;
  name: string;
  lastName: string;
  isCarRented: boolean;
  rentPrice?: number;
  apps: string[];
}
export interface createUserResponse {
  user: {_id: string; name: string};
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserLoginResponse {
  user: Pick<User, 'name' | '_id'>;
  tokens: Tokens;
}
