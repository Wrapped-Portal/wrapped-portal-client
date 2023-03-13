/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrack: null,
  selectedPlaylist: null,
  playlistItems: null,
  allPlaylists: [],
  active: '',
  disabled: false
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    switchPlaylist: (state) => {
      state.playlistItems = null;
    },
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
    createCustomPlaylist: (state, action) => {
      state.selectedPlaylist = action.playlists;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    },
  },
});

export const {
  switchPlaylist,
  removeTrack,
  createPlaylist,
  createCustomPlaylist,
  selectTrack,
  selectPlaylist,
  setPlaylistItems,
  getUserPlaylists,
  setActive,
  setDisabled,
} = playlistSlice.actions;

export default playlistSlice.reducer;
