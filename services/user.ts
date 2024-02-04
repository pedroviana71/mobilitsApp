import {
  Tokens,
  UserLogin,
  UserRegister,
  UserLoginResponse,
  User,
  createUserResponse,
} from '../types/user.types';
import {api} from './api';

const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<UserLoginResponse, UserLogin>({
      query: (user: UserLogin) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    createUser: build.mutation<createUserResponse, UserLogin>({
      query: (createUser: UserRegister) => ({
        url: '/auth/createuser',
        method: 'POST',
        body: createUser,
      }),
    }),
    getUser: build.query<User, string>({
      query: id => ({
        url: `/auth/getUser/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useCreateUserMutation, useGetUserQuery} =
  userApi;
