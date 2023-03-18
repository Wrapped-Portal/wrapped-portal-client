// toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  danceEnabled: false,
  energyEnabled: false,
  loudnessEnabled: false,
  vibeEnabled: false,
  tempoEnabled: false,
  popularityEnabled: false,
  instrumentalEnabled: false,
  livenessEnabled: false,
  acousticnessEnabled: false,
};

const toggleSlice = createSlice({
  name: 'toggleSlice',
  initialState,
  reducers: {
    toggleState: (state, action) => {
      const { field } = action.payload;
      state[field] = !state[field];
    },
  },
});

export const { toggleState } = toggleSlice.actions;

export default toggleSlice.reducer;
