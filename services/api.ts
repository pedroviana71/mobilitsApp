import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import getTokensAndUserId from '../utils/getTokens';
import * as Keychain from 'react-native-keychain';
import {CreateUserResponse} from '../types/user.types';
import {resetTokens} from '../utils/resetTokens';
import {CONSTANTS} from '../utils/constants';

type dataType = {
  message: string;
  error: string;
  statusCode: number;
};

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://192.168.40.138:3000/', //ip do modem  CABEADO de fortal
  // baseUrl: 'http://192.168.15.1:3000/', // ip do modem de minas
  baseUrl: 'http://192.168.40.114:3000/', // ip do modem WIFI de fortal
  credentials: 'include',
  prepareHeaders: async headers => {
    const tokens = await getTokensAndUserId();
    if (tokens) {
      headers.set('authorization', `Bearer ${tokens.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const tokens = await getTokensAndUserId();
  const userId = await Keychain.getInternetCredentials('userId');

  if (
    tokens &&
    userId &&
    result.error &&
    result.error.status === 401 &&
    (result.error.data as dataType).message === 'Token expired'
  ) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          userId: userId.password,
          refreshToken: tokens.refreshToken,
        },
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      const newTokens = (refreshResult.data as CreateUserResponse).tokens;

      resetTokens();

      await Keychain.setInternetCredentials(
        'accessToken',
        'accessToken',
        newTokens.accessToken,
      );
      await Keychain.setInternetCredentials(
        'refreshToken',
        'refreshToken',
        newTokens.refreshToken,
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      await resetTokens();
      await baseQuery(
        {
          url: '/auth/logout',
          method: 'POST',
          body: {
            id: userId.password,
          },
        },
        api,
        extraOptions,
      );
      await Keychain.resetInternetCredentials(CONSTANTS.USER_ID);
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['User', 'Account', 'CreditCard', 'Transaction'],
});
