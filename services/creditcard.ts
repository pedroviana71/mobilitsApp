import {
  ICreateCreditCard,
  ICreditCardResponse,
} from '../types/creditCard.types';
import {api} from './api';

const creditCard = api.injectEndpoints({
  endpoints: build => ({
    createCreditCard: build.mutation<ICreditCardResponse, ICreateCreditCard>({
      query: creditCard => ({
        url: '/creditCard/create',
        method: 'POST',
        body: creditCard,
      }),
      invalidatesTags: ['CreditCard'],
    }),
    getCreditCards: build.query<ICreditCardResponse[], string>({
      query: userId => ({
        url: `/creditCard?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['CreditCard'],
    }),
  }),
  overrideExisting: true,
});

export const {useCreateCreditCardMutation, useGetCreditCardsQuery} = creditCard;
