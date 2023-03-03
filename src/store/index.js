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
import getPlaylists from './middleware/getPlaylists';
import createPlaylist from './middleware/createPlaylists';
import userSlice from './reducers/userSlice';
import getUser from './middleware/getUser';
import screenHeightSlice from './reducers/screenHeightSlice';
import setPlaylistItems from './middleware/playlistItems';
import removeTrack from './middleware/removeTrack';
import connectBackend from './middleware/connectBackend';
const store = configureStore({
  reducer: {
    login: login,
    webPlayerSlice,
    soundBoardSlice,
    playlistSlice,
    searchSlice,
    userSlice,
    screenHeightSlice,
  },

  middleware: [
    connectBackend,
    getToken,
    refresh,
    recentlyPlayed,
    getUser,
    createPlaylist,
    removeTrack,
    addTrackToPlaylist,
    getPlaylists,
    setPlaylistItems,
    getSearchResults,
  ],
});

export default store;
