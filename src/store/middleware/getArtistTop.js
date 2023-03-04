/** @format */

import axios from 'axios';

const ArtistTopMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'selected/getArtistTop') {

    const playlistState = store.getState().playlistSlice.selectedPlaylist;
    const accessToken = store.getState().login.token.accessToken;
    if (action.payload && playlistState) {
      const url = `${import.meta.env.VITE_SERVER_URI}artist?token=${accessToken}`;
      const config = {};

      const data = {
        artistId: action.payload,
      };
      try {
        const response = await axios.get(
          url, data, config)
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