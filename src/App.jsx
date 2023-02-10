/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';
import { storeToken } from './store/reducers/loginSlice';
const code = new URLSearchParams(window.location.search).get('code');
function App() {
  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      console.log(code);
      dispatch(storeToken(code));
    }
    //
  }, []);

  console.log('Current State: ', isLoggedIn);
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
    </>
  );
}

export default App;
