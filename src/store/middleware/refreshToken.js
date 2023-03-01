/** @format */

import axios from 'axios';
import Cookies from 'universal-cookie';
import { storeToken } from '../reducers/loginSlice';
const cookies = new Cookies();

const refreshTokenMiddleware = (store) => (next) => (action) => {
  if (action.type === 'login/storeToken') {
    const { refreshToken } = action.payload.token;

    let refreshTokenInterval;

    const startRefreshTokenInterval = (expirationTimestamp) => {
      const logRemainingTime = () => {
        const remainingTime = expirationTimestamp - Date.now();
        console.log(
          `Remaining time on access token cookie: ${Math.round(
            remainingTime / 1000,
          )} seconds`,
        );
      };

      const remainingTime = expirationTimestamp - Date.now();
      const intervalDuration = remainingTime - 60 * 1000;

      logRemainingTime();
      setInterval(logRemainingTime, 10000);

      refreshTokenInterval = setInterval(async () => {
        try {
          const accessTokenExpiration = cookies.get('accessTokenTimestamp');

          // Check if access token has expired or is about to expire
          if (Date.now() >= accessTokenExpiration - 60 * 1000) {
            // Make a request to refresh the token
            const results = await axios.post(
              `${import.meta.env.VITE_SERVER_URI}refresh`,
              { refreshToken },
            );
            const { accessToken } = results.data;

            // Set the new expiration timestamp for the access token cookie
            const expiresIn = 3600;
            const expirationTimestamp = Date.now() + expiresIn * 1000;
            cookies.set('accessToken', accessToken, {
              path: '/',
              maxAge: expiresIn,
            });
            cookies.set('accessTokenTimestamp', expirationTimestamp, {
              path: '/',
              maxAge: expiresIn,
            });

            // Pass the new token data along to the next middleware
            next({
              type: 'login/storeToken',
              payload: {
                token: {
                  accessToken,
                  refreshToken: results.data.refreshToken,
                  expiresIn,
                },
              },
            });

            cookies.set('refreshToken', results.data.refreshToken, {
              path: '/',
              maxAge: expiresIn,
            });

            // Update the interval with the new expiration timestamp
            startRefreshTokenInterval(expirationTimestamp);
          }
          // Check if refresh token has expired
          else if (Date.now() >= accessTokenExpiration) {
            // Clear the interval and log the user out
            clearInterval(refreshTokenInterval);
            next({ type: 'login/logout' });
          }
        } catch (e) {
          console.error('Error: Refresh Token Middleware:', e.message);
        }
      }, intervalDuration);
    };

    const accessTokenExpiration = cookies.get('accessTokenTimestamp');

    if (accessTokenExpiration) {
      const expirationTimestamp = Math.min(accessTokenExpiration);
      startRefreshTokenInterval(expirationTimestamp);
    }
  }

  next(action);
};

export default refreshTokenMiddleware;
