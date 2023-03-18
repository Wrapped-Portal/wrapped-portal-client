/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  audioFeatures: null,
  audioArtist: null,
};

const audioFeaturesSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    setAudioFeatures: (state, action) => {
      if (action.results) {
        state.audioFeatures = action.results;
        state.audioArtist = action.artist
      }
    },
  },
});

export const { setAudioFeatures } = audioFeaturesSlice.actions;

export default audioFeaturesSlice.reducer;