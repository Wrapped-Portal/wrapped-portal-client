/** @format */

import axios from 'axios';

const setPlaylistItems = (store) => (next) => async (action) => {
  if (action.type === 'playlist/setPlaylistItems') {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}playlistitems`,
        {
          params: {
            token: store.getState().login.token.accessToken,
          },
        },
      );
      const newAction = {
        type: 'playlist/setPlaylistItems',
        playlistItems: response.data,
      };
      return next(newAction);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default setPlaylistItems;
