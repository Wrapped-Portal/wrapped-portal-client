/** @format */

import axios from 'axios';

const ArtistTopMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'selected/getArtistTop') {

    const accessToken = store.getState().login.token.accessToken;
    if (action.payload) {
      const url = `${import.meta.env.VITE_SERVER_URI}artist?token=${accessToken}&artistId=${action.payload}`;
      const config = {};

      try {
        const response = await axios.get(
          url, config)
          const results = response.data;
          const newAction = {
            type: 'selected/getArtistTop',
            results,
          };
          next(newAction);
        } catch (error) {
          console.error('error fetching artist top tracks', error);
        }
      }
    }
    next(action);
  };

export default ArtistTopMiddleware;