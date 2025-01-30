export interface User {
  _id: string;
  name: string;
  email: string ;
  password: string;
  createdAt: string;
  updatedAt: string;
}


export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  _id: string;
  name: string | null;
}
export interface CreateUserResponse {
  user: {_id: string; name: string};
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: Pick<User, 'name' | '_id'>;
  tokens: Tokens;
}
