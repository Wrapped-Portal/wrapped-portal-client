/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import spotify from '../../assets/Spotify-logo.png';
import { loginClick } from '../../store/reducers/loginSlice';
import LoadingBars from '../LoadingBars';

const cookies = new Cookies();

export default function Button() {
  const dispatch = useDispatch();
  const { loginClicked } = useSelector((state) => state.login);

  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = () => {
    setShowLoading(true);
    dispatch(loginClick());
    cookies.set('loginClicked', 'true', { maxAge: 60 });
  };

  useEffect(() => {
    const loginClickedCookie = cookies.get('loginClicked');
    if (loginClickedCookie) {
      setShowLoading(true);
    }
  }, []);

  return (
    <>
      {!showLoading && !loginClicked ? (
        <div
          onClick={handleLogin}
          className="splash__login"
        >
          <img
            className="splash__login--logo"
            alt="spotify logo"
            src={spotify}
          />
          <button>Sign in with Spotify</button>
        </div>
      ) : (
        <LoadingBars />
      )}
    </>
  );
}
