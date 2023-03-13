/** @format */

import axios from 'axios';

const getRecent = (store) => (next) => async (action) => {
  if (
    action.type === 'webPlayer/setTrackUri' &&
    store.getState().userSlice.product === 'premium'
  ) {
    try {
      const results = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}recent`,
        { token: store.getState().login.token.accessToken },
      );
      action.payload = { uri: results.data };

      next(action);
    } catch (e) {
      console.error('Error: get recent Middleware:', e.message, action.payload);
      next(action);
    }
  }

  next(action);
};

export default getRecent;
