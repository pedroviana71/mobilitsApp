import {Tokens, UserLogin, UserRegister} from '../types/user';
import {api} from './api';

const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Tokens, UserLogin>({
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
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useCreateUserMutation} = userApi;
