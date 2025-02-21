import {
  UserLogin,
  UserRegister,
  LoginResponse,
  User,
  CreateUserResponse,
} from '../types/user.types';
import {api} from './api';

const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, UserLogin>({
      query: (user: UserLogin) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    createUser: build.mutation<CreateUserResponse, Partial<User>>({
      query: (createUser: Partial<User>) => ({
        url: '/auth/createuser',
        method: 'POST',
        body: createUser,
      }),
    }),
    createAnonymousUser: build.mutation<CreateUserResponse, void>({
      query: () => ({
        url: '/auth/createAnonymousUser',
        method: 'POST',
        body: {isAnonimous: true},
      }),
    }),
    getUser: build.query<User, string>({
      query: id => ({
        url: `/auth/getUser/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useGetUserQuery,
  useCreateAnonymousUserMutation,
} = userApi;
