/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/reducers/loginSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  const handleClick = () => {
    dispatch(login());
  };
  console.log('Current State: ', isLoggedIn);
  return <h1 onClick={handleClick}>Proof of Life</h1>;
}

export default App;
