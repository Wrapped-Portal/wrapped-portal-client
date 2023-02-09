/** @format */

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);

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
