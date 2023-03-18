// toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  danceEnabled: true,
  energyEnabled: true,
  loudnessEnabled: true,
  vibeEnabled: true,
  tempoEnabled: true,
  popularityEnabled: true,
  instrumentalEnabled: true,
  livenessEnabled: true,
  acousticnessEnabled: true,
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
