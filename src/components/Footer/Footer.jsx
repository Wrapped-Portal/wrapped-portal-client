/** @format */

import { Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import {
  setPlayingStatus,
  setTrackUri,
} from '../../store/reducers/webPlayerSlice';

const Footer = () => {
  const dispatch = useDispatch();
  const { playing, trackUri } = useSelector((state) => state.webPlayerSlice);
  const { accessToken } = useSelector((state) => state.login.token);
  useEffect(() => {
    dispatch(setTrackUri());
  }, []);
  useEffect(() => {
    dispatch(setPlayingStatus(playing));
  }, [dispatch, playing, setPlayingStatus]);

  return (
    <footer>
      <section>
        <Text
          className="footer__text"
          color={'gray'}
        >
          Copyright  &copy; 2023
        </Text>
      </section>
      <div className="footer">
        <SpotifyWebPlayer
          className="footer__player"
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            dispatch(setPlayingStatus(state.isPlaying));
          }}
          play={playing}
          uris={trackUri ? trackUri : []}
        />
      </div>
    </footer>
  );
};

export default Footer;
