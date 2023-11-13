import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import getTokens from '../utils/getTokens';
import * as Keychain from 'react-native-keychain';

type dataType = {
  message: string;
  error: string;
  statusCode: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.40.114:3000/',
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

  if (
    tokens &&
    result.error &&
    result.error.status === 401 &&
    (result.error.data as dataType).message === 'Token expired'
  ) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {
          refreshToken: tokens.refreshToken,
        },
      },
      api,
      extraOptions,
    );

    console.log(refreshResult, 'AQUIPORRA');
    if (refreshResult.data) {
      // api.dispatch();

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch();
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
