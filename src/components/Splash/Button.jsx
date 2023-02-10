/** @format */

import React from 'react';
import spotify from '../../assets/Spotify-logo.png';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_CLIENT_URI;
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'code';
const SCOPE = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-top-read',
  'user-read-currently-playing',
].join('%20');

export default function Button() {
  return (
    <a
      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
    >
      <button>
        Sign in with Spotify
        <img
          alt="spotify logo"
          src={spotify}
        />
      </button>
    </a>
  );
}
