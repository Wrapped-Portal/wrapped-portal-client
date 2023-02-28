/** @format */

import axios from 'axios';

const getPlaylists = (store) => (next) => async (action) => {
  if (
    action.type === 'playlist/getUserPlaylists' ||
    action.type === 'playlist/createPlaylist'
  ) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}playlist`,
        {
          params: {
            token: store.getState().login.token.accessToken,
          },
        },
      );
      const newAction = {
        type: 'playlist/getUserPlaylists',
        playlists: response.data,
      };
      return next(newAction);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default getPlaylists;
