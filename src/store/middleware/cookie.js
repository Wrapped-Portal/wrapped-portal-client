/** @format */

import { storeToken } from '../reducers/loginSlice';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const restoreSession = (store) => (next) => (action) => {
  if (action.type === 'login/storeToken') {
    const { accessToken } = action.payload;
    cookies.set('accessToken', accessToken, { path: '/' });
  } else if (action.type === 'login/restoreSession') {
    const { accessToken } = action.payload;
    store.dispatch(storeToken({ accessToken }));
  }

  next(action);
};

export default restoreSession;
