/** @format */

import { configureStore } from '@reduxjs/toolkit';

import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';

const store = configureStore({
  reducer: {
    login: login,
  },

  middleware: [loggerMiddleware],
});

export default store;
