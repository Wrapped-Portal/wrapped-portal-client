/** @format */

import { configureStore } from '@reduxjs/toolkit';
import getToken from './middleware/getToken';
import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';

const store = configureStore({
  reducer: {
    login: login,
  },

  middleware: [loggerMiddleware, getToken],
});

export default store;
