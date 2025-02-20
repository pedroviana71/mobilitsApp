import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserRegister} from '../types/user.types';

const initialState: UserRegister = {
  _id: '',
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRegister>) => {
      return action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
