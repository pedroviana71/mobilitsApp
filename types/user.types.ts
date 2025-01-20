export interface User {
  _id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface UserLogin {
  email: string | null;
  password: string | null;
}

export interface UserRegister extends UserLogin {
  _id: string;
  name: string | null;
}
export interface createUserResponse {
  user: {_id: string; name?: string};
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
