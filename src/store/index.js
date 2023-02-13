/** @format */

import { configureStore } from '@reduxjs/toolkit';
import getToken from './middleware/getToken';
import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';
import cookie from './middleware/cookie';

const store = configureStore({
  reducer: {
    login: login,
  },

  middleware: [cookie, getToken, loggerMiddleware],
});

export default store;
