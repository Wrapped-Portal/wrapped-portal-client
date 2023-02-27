/** @format */

import axios from 'axios';

const getUser = (store) => (next) => async (action) => {
  if (action.type === 'user/setUser') {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}user`,
        {
          params: {
            token: store.getState().login.token.accessToken,
          },
        },
      );
      const newAction = {
        type: 'user/setUser',
        user: response.data,
      };
      return next(newAction);
    } catch (error) {
      throw error;
    }
  }
  next(action);
};

export default getUser;
