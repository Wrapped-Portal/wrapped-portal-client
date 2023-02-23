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
      console.log(action);
      if (action.results) {
        state.results = action.results;
      }
    },
  },
});

export const { getResults } = searchSlice.actions;

export default searchSlice.reducer;
