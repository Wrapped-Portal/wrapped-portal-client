/** @format */

import { configureStore } from '@reduxjs/toolkit';
import getToken from './middleware/getToken';
import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';
import cookie from './middleware/cookie';
import refresh from './middleware/refreshToken';

const store = configureStore({
  reducer: {
    login: login,
  },

  middleware: [getToken, cookie, refresh],
});

export default store;
