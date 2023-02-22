import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrack: null,
  selectedPlaylist: null,
  playlistItems: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    selectTrack: (state, action) => {
      state.selectedTrack = action.payload;
    },
    selectPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setPlaylistItems: (state, action) => {
      state.playlistItems = action.payload;
    },
  },
});

export const { selectTrack, selectPlaylist, setPlaylistItems } = playlistSlice.actions;

export default playlistSlice.reducer;
