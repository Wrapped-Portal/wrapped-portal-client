/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';
import { storeToken } from './store/reducers/loginSlice';
import Footer from './components/Footer/Footer';
import analytics from 'analytics-benson';

const CLIENT_ID = 'd526e49d-cc0f-468f-b04d-f59e21f6365a';
//Site sending the data
const SITE_NAME = 'Tune Port';
const cookies = new Cookies();

function App() {
  const { isLoggedIn, token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    analytics(SITE_NAME, CLIENT_ID);

    const code = new URLSearchParams(window.location.search).get('code'); // grab the code from the url path
    if (code) {
      dispatch(storeToken({ code: code })); // send the code to the middleware to retrieve a bearer token
      window.history.pushState({}, null, '/'); // Clear the address bar of parameters
    } else if (!token) {
      const accessToken = cookies.get('accessToken');
      if (accessToken) {
        const refreshToken = cookies.get('refreshToken');

        dispatch(storeToken({ token: { accessToken, refreshToken } }));
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Splash />}
        />
        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
      {isLoggedIn ? <Footer /> : null}
    </>
  );
}

export default App;
