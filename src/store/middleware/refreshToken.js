/** @format */

import axios from 'axios';
import Cookies from 'universal-cookie';
import { storeToken } from '../reducers/loginSlice';
const cookies = new Cookies();

const refreshTokenMiddleware = (store) => (next) => (action) => {
  // check if the storeToken action is being dispatched
  if (action.type === 'login/storeToken') {
    const { accessToken, refreshToken, expiresIn } = action.payload.token;

    // store the token in cookies
    cookies.set('accessToken', accessToken, { path: '/', maxAge: expiresIn });
    cookies.set('refreshToken', refreshToken, { path: '/', maxAge: expiresIn });
    cookies.set('expiresIn', expiresIn, { path: '/', maxAge: expiresIn });
    // start the interval to refresh the token
    setInterval(async () => {
      try {
        // make a request to the server to refresh the token
        const results = await axios.post(
          `${import.meta.env.VITE_SERVER_URI}refresh`,
          { refreshToken },
        );
        const { accessToken, expiresIn } = results.data;

        // store the new token in the store and cookies
        store.dispatch(
          storeToken({ token: { accessToken, refreshToken, expiresIn } }),
        );
        cookies.set('accessToken', accessToken, {
          path: '/',
          maxAge: expiresIn,
        });
      } catch (e) {
        console.error('Error: Refresh Token Middleware:', e.message);
      }
    }, (expiresIn - 30) * 1000);
  }

  next(action);
};

export default refreshTokenMiddleware;