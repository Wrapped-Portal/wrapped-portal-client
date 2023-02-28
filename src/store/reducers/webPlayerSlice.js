/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playing: false,
  trackUri: '',
};

const webPlayerSlice = createSlice({
  name: 'webPlayer',
  initialState,
  reducers: {
    setPlayingStatus: (state, action) => {
      state.playing = action.payload;
    },
    playSong: (state, action) => {
      state.trackUri = action.payload;
      state.playing = true;
    },
    setTrackUri: (state, action) => {
      if (action.payload) {
        state.trackUri = action.payload?.uri;
      }
    },

    playAll: (state, action) => {
      if (action.payload) {
        state.trackUri = action.payload?.uri;
      }
    },
  },
});

export const { setPlayingStatus, setTrackUri, playSong } =
  webPlayerSlice.actions;

export default webPlayerSlice.reducer;
