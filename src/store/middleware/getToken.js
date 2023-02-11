/** @format */

import axios from 'axios';

const getToken = (store) => (next) => async (action) => {
  if (action.type === 'login/storeToken') {
    if (action.payload.code) {
      if (!store.getState().login.isLoggedIn) {
        try {
          const results = await axios.post(
            `${import.meta.env.VITE_SERVER_URI}login`,
            { code: action.payload.code },
          );
          action.payload = { token: results.data };

          next(action);
        } catch (e) {
          console.error(
            'Error: GetToken Middleware:',
            e.message,
            action.payload,
          );
          next(action);
        }s
      }
    }
  }

  next(action);
};

export default getToken;
