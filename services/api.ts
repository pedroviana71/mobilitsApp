import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import getTokens from '../utils/getTokens';
import * as Keychain from 'react-native-keychain';
import {createUserResponse} from '../types/user.types';
import {resetTokens} from '../utils/resetTokens';

type dataType = {
  message: string;
  error: string;
  statusCode: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.40.115:3000/', //ip do modem de fortal
  // baseUrl: 'http://192.168.15.1:3000/', // ip do modem de minas
  credentials: 'include',
  prepareHeaders: async headers => {
    const tokens = await getTokens();
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
  const tokens = await getTokens();
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
      const newTokens = (refreshResult.data as createUserResponse).tokens;

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
      await Keychain.resetInternetCredentials('userId');
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['User'],
});
