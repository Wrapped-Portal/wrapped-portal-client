import axios from 'axios';
import { setPlaylistItems, setActive } from '../reducers/playlistSlice';

const createCustomPlaylist = (store) => (next) => async (action) => {
  if (action.type !== 'playlist/createCustomPlaylist') {
    return next(action);
  }

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

    const playlistId = response.data.id;
    action.playlists = playlistId;

    store.dispatch(setActive(response.data.name));

    if (action.payload.uris) {
      const accessToken = store.getState().login.token.accessToken;
      const url = `${import.meta.env.VITE_SERVER_URI}add?token=${accessToken}`;
      const config = {};
      const data = {
        trackUri: action.payload.uris,
        playlistId,
      };

      try {
        const addTrackResponse = await axios.post(url, data, config);
        console.log('Successfully added track to playlist:', addTrackResponse);
        store.dispatch(setPlaylistItems(playlistId));
      } catch (error) {
        console.error('Error adding track to playlist:', error);
      }
    }

    return next(action);
  } catch (error) {
    throw error;
  }
};

export default createCustomPlaylist;
