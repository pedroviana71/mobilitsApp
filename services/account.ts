import {ICreateAccount, IAccountResponse} from '../types/account.types';
import {api} from './api';

const accountApi = api.injectEndpoints({
  endpoints: build => ({
    createAccount: build.mutation<IAccountResponse, ICreateAccount>({
      query: account => ({
        url: '/account/create',
        method: 'POST',
        body: account,
      }),
      invalidatesTags: ['Account'],
    }),
    getAccounts: build.query<IAccountResponse[], string>({
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
