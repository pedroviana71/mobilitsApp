import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserRegister} from '../types/user.types';

const initialState: UserRegister = {
  _id: '',
  name: '',
  email: '',
  password: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const {
  setUserName,
  setUserEmail,
  setUserPassword,
  setUserId,
} = userSlice.actions;

export default userSlice.reducer;
