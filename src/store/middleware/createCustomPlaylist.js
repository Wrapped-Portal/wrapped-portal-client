/** @format */

import axios from 'axios';

import { setPlaylistItems, setActive } from '../reducers/playlistSlice';

const createCustomPlaylist = (store) => (next) => async (action) => {
  if (action.type === 'playlist/createCustomPlaylist') {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}makeplaylist`,
        action.payload.body,
        {
          headers: {
            Authorization: `Bearer ${store.getState().login.token.accessToken}`,
          },
        },
      );

      action.playlists = response.data.id;

      store.dispatch(setActive(response.data.name));

      const accessToken = store.getState().login.token.accessToken;
      if (action.payload.uris) {
        const url = `${import.meta.env.VITE_SERVER_URI}add?token=${accessToken}`;
        const config = {};
        const data = {
          trackUri: action.payload.uris,
          playlistId: response.data.id,
        };

        try {
          const addTrackResponse = await axios.post(url, data, config);
          console.log('Successfully added track to playlist:', addTrackResponse);
          try {
            store.dispatch(setPlaylistItems(response.data.id));
          } catch (error) {
            console.error('Error fetching playlist items:', error);
          }
        } catch (error) {
          console.error('Error adding track to playlist:', error);
        }
      }

      return next(action);
    } catch (error) {
      throw error;
    }
  }

  next(action);
};

export default createCustomPlaylist;
