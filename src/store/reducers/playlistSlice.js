import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  selectedTrack: null,
  selectedPlaylist: null,
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
  },
});


export const { selectTrack, selectPlaylist } = playlistSlice.actions;



export default playlistSlice.reducer;
