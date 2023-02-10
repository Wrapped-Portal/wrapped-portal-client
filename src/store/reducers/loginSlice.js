/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    storeToken: (state, action) => {
      if (action.payload.token) {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      }
    },
  },
});

export const { login, logout, storeToken } = loginSlice.actions;

export default loginSlice.reducer;
