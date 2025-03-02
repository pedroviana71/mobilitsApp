import {ICreateAccount, ICreateAppResponse} from '../types/app.types';
import {api} from './api';

const accountApi = api.injectEndpoints({
  endpoints: build => ({
    createAccount: build.mutation<ICreateAppResponse, ICreateAccount>({
      query: account => ({
        url: '/account/create',
        method: 'POST',
        body: account,
      }),
      invalidatesTags: ['Account'],
    }),
    getAccounts: build.query<ICreateAppResponse[], string>({
      query: userId => ({
        url: `/account?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['Account'],
    }),
  }),
  overrideExisting: true,
});

export const {useCreateAccountMutation, useGetAccountsQuery} = accountApi;
