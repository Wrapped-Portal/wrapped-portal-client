/** @format */

import React from 'react';
import spotify from '../../assets/Spotify-logo.png';
import { AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } from '../../../config';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_CLIENT_URI;

export default function Button() {
  return (
    <a
      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
    >
      <div className="splash__login">
        <img
          className="splash__login--logo"
          alt="spotify logo"
          src={spotify}
        />
        <button>Sign in with Spotify</button>
      </div>
    </a>
  );
}
