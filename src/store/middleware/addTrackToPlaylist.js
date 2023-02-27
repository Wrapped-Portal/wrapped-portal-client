/** @format */

import axios from 'axios';

const addTrackToPlaylist = (store) => (next) => (action) => {

  if (action.type === 'addTrackToPlaylist') {
    const { selectedTrack, accessToken } = action.payload;
    const playlistState = store.getState().playlistSlice.selectedPlaylist;

    if (selectedTrack && playlistState) {
      const url = `${import.meta.env.VITE_SERVER_URI}add?token=${accessToken}`;
      const config = {};

      const data = {
        trackUri: selectedTrack,
        playlistId: playlistState,
      };

      axios
        .post(url, data, config)
        .then((response) => {
          console.log('Successfully added track to playlist:', response);
          // Dispatch an action to update the state in Redux as needed
        })
        .catch((error) => {
          console.error('Error adding track to playlist:', error);
          // Dispatch an action to handle the error as needed
        });
    }
  }

  return next(action);
};

export default addTrackToPlaylist;
