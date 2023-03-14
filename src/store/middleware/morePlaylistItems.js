/** @format */

import axios from 'axios';

let counter = 1;
let offsetNum = 50
let previousPlaylistId;
let previousTrack;

const setMorePlaylistItems = (store) => (next) => async (action) => {
  const currentPlaylistId = store.getState().playlistSlice.selectedPlaylist;
  const selectedTrack = store.getState().playlistSlice.selectedTrack

  if (previousPlaylistId !== currentPlaylistId) {
    counter = 1;
    previousPlaylistId = currentPlaylistId;
  }

  if (previousTrack !== selectedTrack) {
    previousTrack = selectedTrack
    counter = 1;
  }

  if (
    action.type === 'playlist/setMorePlaylistItems' ||
    action.type === 'playlist/selectTrack' ||
    action.type === 'playlist/removeTrack'
  ) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}moreplaylist`,
        {
          params: {
            token: store.getState().login.token.accessToken,
            playlistId: currentPlaylistId,
            offset: offsetNum * counter,
          },
        },
      );

      counter += 1;

      const newAction = {
        type: action.type,
        moreItems: response.data.items,
        payload: action.payload,
      };

      return next(newAction);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default setMorePlaylistItems;
