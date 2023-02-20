/** @format */

import axios from 'axios';
import Cookies from 'universal-cookie';
import { storeToken } from '../reducers/loginSlice';
const cookies = new Cookies();

const refreshTokenMiddleware = (store) => (next) => (action) => {
  // check if the storeToken action is being dispatched
  if (action.type === 'login/storeToken') {
    // start the interval to refresh the token
    setInterval(async () => {
      try {
        const { refreshToken } = action.payload.token;
        // make a request to the server to refresh the token
        const results = await axios.post(
          `${import.meta.env.VITE_SERVER_URI}refresh`,
          { refreshToken },
        );
        const { accessToken, expiresIn } = results.data;

        // store the new token in the store and cookies
        store.dispatch(
          storeToken({
            token: {
              accessToken,
              refreshToken: results.data.refreshToken,
              expiresIn,
            },
          }),
        );
        cookies.set('accessToken', accessToken, {
          path: '/',
          maxAge: expiresIn,
        });

        cookies.set('refreshToken', refreshToken, {
          path: '/',
          maxAge: expiresIn,
        });
      } catch (e) {
        console.error('Error: Refresh Token Middleware:', e.message);
      }
    }, (3600 - 30) * 1000);
  }

  next(action);
};

export default refreshTokenMiddleware;
