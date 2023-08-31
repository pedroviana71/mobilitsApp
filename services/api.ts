import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.40.114:3000/'}),
  endpoints: () => ({}),
});
