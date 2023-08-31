import {Tokens, UserLogin} from '../types/user';
import {api} from './api';

const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Tokens, UserLogin>({
      query: (user: UserLogin) => ({
        url: '/auth/login',
        method: 'POST',
        user,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation} = userApi;
