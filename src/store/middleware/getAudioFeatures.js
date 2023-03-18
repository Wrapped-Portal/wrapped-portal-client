/** @format */

import axios from 'axios';

const ArtistTopMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'features/setAudioFeatures') {

    const accessToken = store.getState().login.token.accessToken;
    if (action.payload) {
      const url = `${import.meta.env.VITE_SERVER_URI}features?token=${accessToken}&id=${action.payload.id}`;
      const config = {};

      try {
        const response = await axios.get(
          url, config)
          const results = response.data;
          const newAction = {
            type: 'features/setAudioFeatures',
            results,
            artist: action.payload,
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