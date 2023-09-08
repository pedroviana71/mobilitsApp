import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserRegister} from '../types/user';

const initialState: UserRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isCarRented: false,
  rentValue: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
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
    setUserCarRentValue: (state, action: PayloadAction<string>) => {
      state.rentValue = action.payload;
    },
  },
});

export const {
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
  setIsUserCarRented,
  setUserCarRentValue,
} = userSlice.actions;

export default userSlice.reducer;
