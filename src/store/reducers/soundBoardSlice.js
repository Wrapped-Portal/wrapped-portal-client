/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dance: '',
  energy: '',
  loud: '',
  vibe: '',
  tempo: '',
  popular: '',
  instrumental: '',
  acoustic: '',
  live: '',
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setFieldValue: (state, action) => {
      const { field, value } = action.payload;
      switch (field) {
        case 'dance':
          state.dance = value;
          break;
        case 'energy':
          state.energy = value;
          break;
        case 'loud':
          state.loud = value;
          break;
        case 'vibe':
          state.vibe = value;
          break;
        case 'tempo':
          state.tempo = value;
          break;
        case 'popular':
          state.popular = value;
          break;
        case 'instrumental':
          state.instrumental = value;
          break;
        case 'acoustic':
          state.acoustic = value;
          break;
        case 'live':
          state.live = value;
          break;
        default:
          break;
      }
    },
  },
});

export const { setFieldValue } = mySlice.actions;

export default mySlice.reducer;
