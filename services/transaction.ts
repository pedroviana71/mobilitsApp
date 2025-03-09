import {
  ICreateTransaction,
  ITransactionResponse,
} from '../types/transaction.types';
import {api} from './api';

const transaction = api.injectEndpoints({
  endpoints: build => ({
    createTransaction: build.mutation<ITransactionResponse, ICreateTransaction>(
      {
        query: creditCard => ({
          url: '/transaction/create',
          method: 'POST',
          body: creditCard,
        }),
        invalidatesTags: ['Transaction'],
      },
    ),
    getTransactions: build.query<ITransactionResponse[], string>({
      query: userId => ({
        url: `/transaction?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
  }),
  overrideExisting: true,
});

export const {useCreateTransactionMutation, useGetTransactionsQuery} =
  transaction;
