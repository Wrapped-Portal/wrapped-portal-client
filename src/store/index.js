/** @format */

import { configureStore } from '@reduxjs/toolkit';
import getToken from './middleware/getToken';
// import loggerMiddleware from './middleware/logger';
import login from './reducers/loginSlice';
import refresh from './middleware/refreshToken';
import webPlayerSlice from './reducers/webPlayerSlice';
import soundBoardSlice from './reducers/soundBoardSlice';
import recentlyPlayed from './middleware/recentlyPlayed';
import playlistSlice from './reducers/playlistSlice';
import addTrackToPlaylist from './middleware/addTrackToPlaylist';
import searchSlice from './reducers/searchSlice';
import getSearchResults from './middleware/getSearchResults';
const store = configureStore({
  reducer: {
    login: login,
    webPlayerSlice,
    soundBoardSlice,
    playlistSlice,
    searchSlice,
  },

  middleware: [
    getToken,
    refresh,
    recentlyPlayed,
    addTrackToPlaylist,
    getSearchResults,
  ],
});

export default store;
