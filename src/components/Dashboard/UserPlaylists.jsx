/** @format */

import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {  Alert, Button, Paper, Text, List, Image, Group, Modal, Stack } from '@mantine/core';
import { removeTrack, setMorePlaylistItems, setRemoveAlert } from '../../store/reducers/playlistSlice';
import { playSong, playAll } from '../../store/reducers/webPlayerSlice';
import { setAudioFeatures } from '../../store/reducers/audioFeaturesSlice';
import LoadingBars from '../LoadingBars';
import Features from '../Features'


export default function UserPlaylists() {
  const [alertText, setAlertText] = useState({ title: '', body: '', color: ''});
  const [openFeatures, setOpenFeatures] = useState(false);

  const { playlistItems, selectedPlaylist, disabled, playlistObject, removeAlert } = useSelector(
    (state) => state.playlistSlice
  );
  const { audioArtist } = useSelector((state) => state.audioFeaturesSlice);

  const dispatch = useDispatch();

  const handleRemoveTrackFromPlaylist = async (trackUri, index) => {
    dispatch(removeTrack({ trackUri, index, playlistId: selectedPlaylist }));
  };
  
  let moreTracks = true
  
  if (playlistObject?.at(0)?.tracks?.total > playlistItems?.length) {
    moreTracks = false 
  } else {
    moreTracks = true
  }

  useEffect(() => {
    if (removeAlert === 'success') {
      setAlertText({ title: 'Success!', body: 'Track Removed from Playlist!', color: 'teal' });
    } if (removeAlert === 'error') {
      setAlertText({ title: 'Error', body: 'Track Failed to be Removed.', color:'red'  });
    }
  
    const timeoutId = setTimeout(() => {
      dispatch(setRemoveAlert(null));
    }, 6000);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [removeAlert]);

  console.log(playlistItems)

 

  return (
    <>
      <div className="playlist">
      <Alert 
        color={alertText.color} 
        variant="filled"
        className={`top__alert ${removeAlert ? 'visible' : ''}`}
        >
     {alertText.title} {alertText.body}
    </Alert>
        <h3>Current Playlist</h3>
        {!playlistItems && selectedPlaylist && (
          <div className='loading' >
            <LoadingBars />
          </div>
        )}
        {playlistItems && (
          <>
          <Paper
            shadow="lg"
            radius="md"
            withBorder
            className="paper"
          >
            <List
              type="ordered"
              className="list"
            >
              {playlistItems.length ? (
                <Button
                  className="playall_button"
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                  onClick={() => {
                    dispatch(playSong(playlistItems[0].track.uri));
                    dispatch(playAll(playlistItems.href.split('/').at(-2)));
                  }}
                >
                  Play All
                </Button>
              ) : (
                'Add songs to your playlist!'
              )}

              {playlistItems?.map((item, index) => (
                <List.Item
                  key={`item-${index}`}
                  className="list_item"
                >
                  <Group
                    onClick={() => dispatch(playSong(item.track.uri))}
                  // className='list_select_group'
                  >
                    <a
                      href={item.track.external_urls.spotify}
                      className="logo--list"
                    >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                    <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                    <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                  </svg>
                    </a>
                    <img
                      className="play_button-icon-list"
                      src="https://cdn-icons-png.flaticon.com/512/0/375.png"
                      alt="play-button"
                    />
                    <Text
                      fw={600}
                      className="numbers"
                    >
                      {index + 1}
                    </Text>
                    <Image
                      src={item.track.album.images[2].url}
                      height={60}
                      width={60}
                      className="image-top"
                    />
                    <Stack className="text-top">
                      <div className="text-select">
                        <Text fw={700}>{item?.track.name}</Text>
                        <Text
                          fz="sm"
                          c="dimmed"
                        >
                          {item?.track?.artists[0].name}
                        </Text>
                      </div>
                    </Stack>
                  </Group>
                  <Button
                    key={`button-${index}`}
                    color="red"
                    radius="sm"
                    size="xs"
                    compact
                    onClick={() =>
                      handleRemoveTrackFromPlaylist(item?.track.uri, index)
                    }
                    className="playlist_button"
                    disabled={disabled}
                  >
                    -
                  </Button>
                  <Button
                        className="playlist_button_features"
                        key={`button-${index}-features`}
                        color="orange"
                        radius="sm"
                        size="xs"
                        compact
                        onClick={() => {
                          dispatch(setAudioFeatures(item?.track));
                          setOpenFeatures(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512"><path fill="currentColor" d="M128 496H48V304h80Zm224 0h-80V208h80Zm112 0h-80V96h80Zm-224 0h-80V16h80Z" /></svg>
                      </Button>
                </List.Item>
              ))}
            </List>
          </Paper>
        <Button
        disabled={moreTracks}
        className="playall_button"
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        onClick={() => {
          dispatch(setMorePlaylistItems({ moreItems: 50 }));
        }}>
          See More Tracks
        </Button>
        </>
        )}
              <Modal
        size={700}
        opened={openFeatures}
        onClose={() => setOpenFeatures(false)}
        title={`"${audioArtist?.name}" by ${audioArtist?.artists[0].name}`}
      >
        <Features />
      </Modal>
      </div>
    </>
  );
}
