/** @format */

import axios from 'axios';

const addTrackToPlaylist = (store) => (next) => (action) => {
  if (action.type === 'playlist/selectTrack') {
    const playlistState = store.getState().playlistSlice.selectedPlaylist;
    const accessToken = store.getState().login.token.accessToken;
    if (action.payload && playlistState) {
      const url = `${import.meta.env.VITE_SERVER_URI}add?token=${accessToken}`;
      const config = {};

      const data = {
        trackUri: action.payload,
        playlistId: playlistState,
      };

      axios
        .post(url, data, config)
        .then((response) => {
          console.log('Successfully added track to playlist:', response);
        })
        .catch((error) => {
          console.error('Error adding track to playlist:', error);
        });
    }
  }

  return next(action);
};

export default addTrackToPlaylist;
