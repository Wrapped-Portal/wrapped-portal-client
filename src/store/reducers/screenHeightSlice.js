/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenHeight: window.innerHeight - 51,
};

const screenHeight = createSlice({
  name: 'screenHeight',
  initialState,
  reducers: {
    getHeight: (state, action) => {
      state.screenHeight = action.payload;
    },
  },
});

export const { getHeight } = screenHeight.actions;

export default screenHeight.reducer;
