/** @format */

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const initialState = {
  loginClicked: false,
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
    loginClick: (state) => {
      state.loginClicked = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.loginClicked = false;
      cookies.remove('loginClicked');
    },
    storeToken: (state, action) => {
      if (action.payload.token) {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      }
    },
    restoreSession: (state, action) => {
      if (action.payload?.accessToken) {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
      }
    },
  },
});

export const { login, logout, storeToken, restoreSession, loginClick } =
  loginSlice.actions;

export default loginSlice.reducer;
