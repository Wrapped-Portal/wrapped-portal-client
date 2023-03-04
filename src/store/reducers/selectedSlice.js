/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedData: null
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    getAlbumTracks: (state, action) => {
      if (action.results) {
        state.selectedData = action.results;
      }
    },
    getArtistTop: (state, action) => {
      if (action.results) {
        state.selectedData = action.results;
      }
    },
  },
});

export const { getAlbumTracks, getArtistTop} =
  selectedSlice.actions;

export default selectedSlice.reducer;