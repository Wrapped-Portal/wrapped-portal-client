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
    restoreSession: (state, action) => {
      if (action.payload.accessToken) {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
      }
    },
  },
});

export const { login, logout, storeToken, restoreSession } = loginSlice.actions;

export default loginSlice.reducer;
