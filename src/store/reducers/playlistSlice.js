/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrack: null,
  selectedPlaylist: null,
  playlistItems: null,
  allPlaylists: [],
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    selectTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    removeTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    selectPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setPlaylistItems: (state, action) => {
      state.playlistItems = action.playlistItems;
    },
    getUserPlaylists: (state, action) => {
      state.allPlaylists = action.playlists;
    },
    createPlaylist: (state, action) => {
      state.allPlaylists = action.playlists;
    },
  },
});

export const {
  removeTrack,
  createPlaylist,
  selectTrack,
  selectPlaylist,
  setPlaylistItems,
  getUserPlaylists,
} = playlistSlice.actions;

export default playlistSlice.reducer;
