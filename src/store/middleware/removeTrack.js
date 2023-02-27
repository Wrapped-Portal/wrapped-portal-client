/** @format */

/** @format */

import axios from 'axios';

/** @format */

const removeTrack = (store) => (next) => async (action) => {
  console.log(action.type);
  if (action.type === 'playlist/removeTrack') {
    console.log(action.payload);
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
      return next(action);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default removeTrack;
