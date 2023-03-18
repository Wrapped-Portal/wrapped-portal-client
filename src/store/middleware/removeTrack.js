/** @format */

import axios from 'axios';
import { setRemoveAlert } from '../reducers/playlistSlice';

const removeTrack = (store) => (next) => async (action) => {

  if (action.type === 'playlist/removeTrack') {
    
    try {
      const data = {
        playlistId: action.payload.playlistId,
        trackUri: action.payload.trackUri,
        index: action.payload.index,
      };
      const accessToken = store.getState().login.token.accessToken;
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}remove?token=${accessToken}`,
        { data },
      );
      store.dispatch(setRemoveAlert('success'));
      return next(action);
    } catch (error) {
      store.dispatch(setRemoveAlert('error'));
      throw error;
    }
  }
  next(action);
};

export default removeTrack;
