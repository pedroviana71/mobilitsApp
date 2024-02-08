import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserRegister} from '../types/user.types';

const initialState: UserRegister = {
  _id: '',
  name: '',
  lastName: '',
  email: '',
  password: '',
  isCarRented: false,
  rentPrice: 0,
  apps: [''],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsUserCarRented: (state, action: PayloadAction<boolean>) => {
      state.isCarRented = action.payload;
    },
    setUserCarRentPrice: (state, action: PayloadAction<number>) => {
      state.rentPrice = action.payload;
    },
    setUserApps: (state, action: PayloadAction<string[]>) => {
      state.apps = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const {
  setUserName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
  setIsUserCarRented,
  setUserCarRentPrice,
  setUserApps,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
