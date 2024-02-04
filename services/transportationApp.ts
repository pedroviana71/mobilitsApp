import {ICreateApp, ICreateAppResponse} from '../types/app.types';
import {api} from './api';

const appApi = api.injectEndpoints({
  endpoints: build => ({
    createApp: build.mutation<ICreateAppResponse, ICreateApp>({
      query: createApp => ({
        url: '/transportation-app/create',
        method: 'POST',
        body: createApp,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useCreateAppMutation} = appApi;
