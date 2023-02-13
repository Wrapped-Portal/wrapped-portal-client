/** @format */

import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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

          const { accessToken, refreshToken, expiresIn } = results.data;
          cookies.set('accessToken', accessToken, { path: '/' });
          cookies.set('refreshToken', refreshToken, { path: '/' });
          cookies.set('expiresIn', expiresIn, { path: '/' });

          next(action);
        } catch (e) {
          console.error(
            'Error: GetToken Middleware:',
            e.message,
            action.payload,
          );
          next(action);
        }
      }
    }
  }

  next(action);
};

export default getToken;