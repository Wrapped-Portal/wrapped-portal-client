/** @format */

import axios from 'axios';

const createPlaylist = (store) => (next) => async (action) => {
  if (action.type === 'playlist/createPlaylist') {
    try {
      console.log(action.payload);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URI}makeplaylist`,
        action.payload,
        {
          headers: {
            Authorization: `Bearer ${store.getState().login.token.accessToken}`,
          },
        },
      );
      return next(action);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default createPlaylist;
