/** @format */

import axios from 'axios';

const AlbumTracksMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'selected/getAlbumTracks') {

    const accessToken = store.getState().login.token.accessToken;
    if (action.payload) {
      const url = `${import.meta.env.VITE_SERVER_URI}album?token=${accessToken}`;
      const config = {};

      const data = {
        albumId: action.payload,
      };
      try {
      const response = await axios.get(
        url, data, config)
        const results = response.data;
        const newAction = {
          type: 'selected/getAlbumTracks',
          results,
        };
        next(newAction);
      } catch (error) {
        console.error('error fetching album tracks', error);
      }
    }
  }
  next(action);
};

export default AlbumTracksMiddleware;