/** @format */
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const restoreSession = (store) => (next) => (action) => {
  if (action.type === 'login/storeToken') {
    const { accessToken, refreshToken, expiresIn } = action.payload.token;
    console.log(accessToken);
    cookies.set('accessToken', accessToken, { path: '/', maxAge: expiresIn });
    cookies.set('refreshToken', refreshToken, { path: '/', maxAge: expiresIn });
  } else if (action.type === 'login/restoreSession') {
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');
    const expiresIn = cookies.get('expiresIn');

    if (accessToken && refreshToken) {
      console.log('doing it');
      store.dispatch(storeToken({ token: { accessToken, refreshToken } }));
    }
  }

  next(action);
};
export default restoreSession;
