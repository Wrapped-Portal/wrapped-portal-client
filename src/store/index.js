/** @format */

import { configureStore } from '@reduxjs/toolkit';
import getToken from './middleware/getToken';
// import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';
import refresh from './middleware/refreshToken';
import webPlayerSlice from './reducers/webPlayerSlice';
import soundBoardSlice from './reducers/soundBoardSlice';
import recentlyPlayed from './middleware/recentlyPlayed';

const store = configureStore({
  reducer: {
    login: login,
    webPlayerSlice,
    soundBoardSlice,
  },

  middleware: [getToken, refresh, recentlyPlayed],
});

export default store;
