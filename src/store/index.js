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
import setMorePlaylistItems from './middleware/morePlaylistItems';
import removeTrack from './middleware/removeTrack';
import connectBackend from './middleware/connectBackend';
import selectedSlice from './reducers/selectedSlice';
import getAlbumTracks from './middleware/getAlbumItems';
import getArtistTop from './middleware/getArtistTop';
import createCustomPlaylist from './middleware/createCustomPlaylist';
import genreSlice from './reducers/genreSlice';
import toggleSlice from './reducers/toggleSlice';
import audioFeaturesSlice from './reducers/audioFeaturesSlice';
import getAudioFeatures from './middleware/getAudioFeatures';

const store = configureStore({
  reducer: {
    login: login,
    webPlayerSlice,
    soundBoardSlice,
    playlistSlice,
    searchSlice,
    userSlice,
    screenHeightSlice,
    selectedSlice,
    genreSlice,
    toggleSlice,
    audioFeaturesSlice,
  },

  middleware: [
    connectBackend,
    getToken,
    refresh,
    createPlaylist,
    recentlyPlayed,
    getUser,
    removeTrack,
    addTrackToPlaylist,
    getPlaylists,
    getAlbumTracks,
    getArtistTop,
    getSearchResults,
    getAudioFeatures,
    setPlaylistItems,
    setMorePlaylistItems,
    createCustomPlaylist,
  ],
});

export default store;
