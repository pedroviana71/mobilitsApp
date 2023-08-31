import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserRegister} from '../types/user';

const initialState: UserRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
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
  },
});

export const {
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
} = userSlice.actions;

export default userSlice.reducer;
