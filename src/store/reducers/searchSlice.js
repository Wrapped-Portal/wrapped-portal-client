/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { getResults } = searchSlice.actions;

export default searchSlice.reducer;
