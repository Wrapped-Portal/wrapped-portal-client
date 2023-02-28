/** @format */

import axios from 'axios';

const getPlaylists = (store) => (next) => async (action) => {
  if (action.type === 'webPlayer/playAll') {
    try {
      const body = {
        token: store.getState().login.token.accessToken,
        playlist: action.payload,
      };
      await axios.post(`${import.meta.env.VITE_SERVER_URI}queuePlaylist`, body);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default getPlaylists;
