/** @format */

import axios from 'axios';
import { AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } from '../../../config';
import { logout } from '../reducers/loginSlice';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_CLIENT_URI;
const connectBackend = (store) => (next) => async (action) => {
  if (action.type === 'login/loginClick') {
    try {
      await axios.get(`${import.meta.env.VITE_SERVER_URI}connect`);
      // Redirect user to Spotify login page
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    } catch (error) {
      store.dispatch(logout());
      throw error;
    }
  }
  next(action);
};

export default connectBackend;
