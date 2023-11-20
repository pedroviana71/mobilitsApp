import {
  Tokens,
  UserLogin,
  UserRegister,
  UserLoginResponse,
} from '../types/user';
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
    createUser: build.mutation<Tokens, UserLogin>({
      query: (createUser: UserRegister) => ({
        url: '/auth/createuser',
        method: 'POST',
        body: createUser,
      }),
    }),
    apiCheck: build.mutation({
      query: () => ({
        url: '/auth/check',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useCreateUserMutation, useApiCheckMutation} =
  userApi;
