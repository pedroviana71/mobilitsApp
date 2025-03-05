import {ICreateAccount, ICreateAppResponse} from '../types/app.types';
import {api} from './api';

const creditCard = api.injectEndpoints({
  endpoints: build => ({
    createCreditCard: build.mutation<ICreateAppResponse, ICreateAccount>({
      query: account => ({
        url: '/account/create',
        method: 'POST',
        body: account,
      }),
      invalidatesTags: ['Account'],
    }),
    getCreditCards: build.query<ICreateAppResponse[], string>({
      query: userId => ({
        url: `/account?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['Account'],
    }),
  }),
  overrideExisting: true,
});

export const {useCreateCreditCardMutation, useGetCreditCardsQuery} = creditCard;
