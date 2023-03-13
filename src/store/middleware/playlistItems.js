/** @format */

import axios from 'axios';
import { setDisabled } from '../reducers/playlistSlice';

const setPlaylistItems = (store) => (next) => async (action) => {
  if (
    action.type === 'playlist/setPlaylistItems' ||
    action.type === 'playlist/selectTrack' ||
    action.type === 'playlist/removeTrack'
  ) {
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
      let playlists = store.getState().playlistSlice.allPlaylists
      const activePlaylistObject = playlists.items?.filter((playlist) => playlist.id === store.getState().playlistSlice.selectedPlaylist);
      let user = store.getState().userSlice.user
      if (activePlaylistObject.at(0).owner.display_name !== user.display_name) {
        store.dispatch(setDisabled(true));
      } else {
        store.dispatch(setDisabled(false));
      }
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
