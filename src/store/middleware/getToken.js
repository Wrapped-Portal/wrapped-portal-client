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

          // Set the expiration timestamp for the cookies
          const expirationTimestamp = Date.now() + expiresIn * 1000;

          const accessTokenExists = cookies.get('accessToken');
          const refreshTokenExists = cookies.get('refreshToken');
          const accessTokenTimestampExists = cookies.get(
            'accessTokenTimestamp',
          );
          const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

          const cookieOptions = isDevMode
            ? { secure: false }
            : { secure: true };

          if (!accessTokenExists) {
            cookies.set('accessToken', accessToken, {
              path: '/',

              ...cookieOptions,
              maxAge: expiresIn,
            });
          }

          if (!refreshTokenExists) {
            cookies.set('refreshToken', refreshToken, {
              path: '/',

              maxAge: expiresIn,
              ...cookieOptions,
            });
          }

          if (!accessTokenTimestampExists) {
            cookies.set('accessTokenTimestamp', expirationTimestamp, {
              path: '/',

              maxAge: expiresIn,
              ...cookieOptions,
            });
          }

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
