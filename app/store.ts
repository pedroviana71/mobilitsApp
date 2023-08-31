import {configureStore} from '@reduxjs/toolkit';
import {api} from '../services/api';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
