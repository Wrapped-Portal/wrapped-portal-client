/** @format */

import axios from 'axios';

const setPlaylistItems = (store) => (next) => async (action) => {
  if (
    action.type === 'playlist/setPlaylistItems' ||
    action.type === 'playlist/selectTrack' ||
    action.type === 'playlist/removeTrack'
  ) {
    if (!store.getState().playlistSlice.selectedPlaylist) {
      console.log('NO PLAYLIST SELECTED');
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}playlistitems`,
        {
          params: {
            token: store.getState().login.token.accessToken,
            playlistId:
              action.type !== 'playlist/setPlaylistItems'
                ? store.getState().playlistSlice.selectedPlaylist
                : action.payload,
          },
        },
      );
      const newAction = {
        type: action.type,
        playlistItems: response.data,
        payload: action.payload,
      };
      return next(newAction);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default setPlaylistItems;
