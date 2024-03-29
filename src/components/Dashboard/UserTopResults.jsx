/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Image,
  List,
  Paper,
  Text,
  Group,
  Stack,
  Modal,
  NativeSelect,
} from '@mantine/core';
import { playSong } from '../../store/reducers/webPlayerSlice';
import { getArtistTop } from '../../store/reducers/selectedSlice';
import { setAudioFeatures } from '../../store/reducers/audioFeaturesSlice';
import { createCustomPlaylist, selectTrack, setAlert } from '../../store/reducers/playlistSlice';
import Features from '../Features'

export default function UserTopResults() {
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [type, setType] = useState('tracks');
  const [range, setRange] = useState('short_term');
  const [alertText, setAlertText] = useState({ title: '', body: '', color: '' });

  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.userSlice);
  const { audioArtist } = useSelector((state) => state.audioFeaturesSlice);
  const { disabled, alert } = useSelector((state) => state.playlistSlice);
  const { selectedData } = useSelector((state) => state.selectedSlice);

  const dispatch = useDispatch();


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}top`,
        {
          params: {
            token: token.accessToken,
            type,
            range,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        throw error;
      }
    })();
  }, [type, range]);

  const handleCreateTopPlaylist = async () => {
    let time = '';
    if (range === 'short_term') {
      time = 'last month';
    }
    if (range === 'medium_term') {
      time = 'last 6 months';
    }
    if (range === 'long_term') {
      time = 'All Time';
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const date = `${mm}/${dd}/${yyyy}`;

    const body = {
      name: `Top Tracks ${date} (${time}) `,
      description: `Your favorite tracks ${time} as of ${date}. Created on Tune Port`,
      public: true,
      user_id: user.id,
    };
    const uris = data?.items.map((item) => item.uri).join(',');

    let payload = {
      body: body,
      uris: uris,
    };

    dispatch(createCustomPlaylist(payload));
  };


  useEffect(() => {
    if (alert?.data) {
      setAlertText({ title: 'Success!', body: 'Track Added to Playlist!', color: 'lime' });
    } if (alert === 'error') {
      setAlertText({ title: 'Error', body: 'Track Failed to be Added.', color: 'red' });
    }

    const timeoutId = setTimeout(() => {
      dispatch(setAlert(null));
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [alert]);

  return (
    <>
      {selectedData?.tracks && (
        <Modal
          size={700}
          opened={opened}
          onClose={() => setOpened(false)}
          title={`${selectedData?.tracks[2].artists[0].name}'s Top Tracks`}
        >
          <List
            type="ordered"
            className="list"
          >
            {selectedData?.tracks.map((item, index) => (
              <List.Item
                mx={25}
                key={`item-${index}`}
                className="list_item"
              >
                <Group
                  px="18px"
                  onClick={() => dispatch(playSong(item.uri))}
                >
                  <a
                    href={item.external_urls.spotify}
                    className="logo logo--top-tracks"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      width="20px"
                      version="1.1"
                      viewBox="0 0 168 168"
                    >
                      <path
                        fill="#1ED760"
                        d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                      />
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#1ED760"
                        d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                      />
                    </svg>
                  </a>
                  <img
                    className="play_button-icon"
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
                    src={item?.album.images[2].url}
                    height={60}
                    width={60}
                    className="image-top"
                  />
                  <Stack className="text-top">
                    <Text fw={700}>{item.name}</Text>
                    <Text
                      className="top-artist-text"
                      fz="sm"
                      c="dimmed"
                    >
                      {item?.album.artists[0].name}
                    </Text>
                  </Stack>
                </Group>
                <Button
                  className="list_button"
                  key={`button-${index}`}
                  color="lime"
                  radius="sm"
                  size="xs"
                  compact
                  onClick={() => dispatch(selectTrack(item?.uri))}
                  disabled={disabled}
                >
                  +
                </Button>
                <Button
                  className="list_button_features"
                  key={`button-${index}-features`}
                  color="orange"
                  radius="sm"
                  size="xs"
                  compact
                  onClick={() => {
                    dispatch(setAudioFeatures(item));
                    setOpenFeatures(true);
                  }}
                >
                  ?
                </Button>
              </List.Item>
            ))}
          </List>
        </Modal>
      )}
      <div className="topResults">
        <Alert
          color={alertText.color}
          variant="filled"
          className={`top__alert ${alert ? 'visible' : ''}`}
        >
          {alertText.title} {alertText.body}
        </Alert>
        <h3>Your Top Listens</h3>
        <div className="input-container">
          <div className="input-wrapper">
            <h4 className="input">Select Tracks or Artists</h4>
            <NativeSelect
              data={['Tracks', 'Artists']}
              onChange={(event) => setType(event.target.value.toLowerCase())}
              className="top-input"
            />
          </div>
          <div className="input-wrapper">
            <h4 className="input">Select a Time Range</h4>
            <NativeSelect
              data={[{ value: 'short_term', label: 'Past Month' }, { value: 'medium_term', label: 'Past 6 Months' }, { value: 'long_term', label: 'All Time' },]}
              onChange={(event) => setRange(event.target.value)}
              className="top-input"
            />
          </div>
        </div>
        {data && (
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
                {data?.items.map((item, index) =>
                  item?.album ? (
                    <List.Item
                      mx="42px"
                      key={`item-${index}`}
                      className="list_item"
                    >
                      <Group onClick={() => dispatch(playSong(item.uri))}>
                        <a
                          href={item.external_urls.spotify}
                          className="logo logo--top-tracks"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            width="20px"
                            version="1.1"
                            viewBox="0 0 168 168"
                          >
                            <path
                              fill="#1ED760"
                              d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                            />
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#1ED760"
                              d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                            />
                          </svg>
                        </a>
                        <img
                          className="play_button-icon"
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
                          src={item?.album.images[2].url}
                          height={60}
                          width={60}
                          className="image-top"
                        />
                        <Stack className="text-top">
                          <Text fw={700}>{item.name}</Text>
                          <Text
                            className="top-artist-text"
                            fz="sm"
                            c="dimmed"
                          >
                            {item?.album.artists[0].name}
                          </Text>
                        </Stack>
                      </Group>
                      <Button
                        className="list_button"
                        key={`button-${index}`}
                        color="lime"
                        radius="sm"
                        size="xs"
                        compact
                        onClick={() => dispatch(selectTrack(item?.uri))}
                        disabled={disabled}
                      >
                        +
                      </Button>
                      <Button
                        className="list_button_features"
                        key={`button-${index}-features`}
                        color="orange"
                        radius="sm"
                        size="xs"
                        compact
                        onClick={() => {
                          dispatch(setAudioFeatures(item));
                          setOpenFeatures(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512"><path fill="currentColor" d="M128 496H48V304h80Zm224 0h-80V208h80Zm112 0h-80V96h80Zm-224 0h-80V16h80Z" /></svg>
                      </Button>
                    </List.Item>
                  ) : (
                    <List.Item
                      mx="43px"
                      key={`item-${index}`}
                    >
                      <Group
                        onClick={() => {
                          dispatch(getArtistTop(item.id));
                          setOpened(true);
                        }}
                        className="hover"
                      >
                        <Text
                          fw={600}
                          className="numbers--artists"
                        >
                          {index + 1}
                        </Text>
                        <a
                          href={item.external_urls.spotify}
                          className="logo logo--top-tracks"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            width="20px"
                            version="1.1"
                            viewBox="0 0 168 168"
                          >
                            <path
                              fill="#1ED760"
                              d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                            />
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#1ED760"
                              d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                            />
                          </svg>
                        </a>
                        <Image
                          src={item.images[2].url}
                          height={60}
                          width={60}
                          className="image-top"
                        />
                        <Text fw={700}>{item.name}</Text>
                      </Group>
                    </List.Item>
                  ),
                )}
              </List>
              {user.product === 'free' && (
                <>
                  <Group>
                    <Text>
                      Sign up for Spotify premium to view your top listens!
                    </Text>
                    <a href={user.external_urls.spotify}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        width="20px"
                        version="1.1"
                        viewBox="0 0 168 168"
                      >
                        <path
                          fill="#1ED760"
                          d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                        />
                        <path
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#1ED760"
                          d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                        />
                      </svg>
                    </a>
                  </Group>
                </>
              )}
            </Paper>
            {data?.items[0]?.album && (
              <Button
                className="top_playlist_button"
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                onClick={() => handleCreateTopPlaylist()}
              >
                Create Playlist For Top Tracks
              </Button>
            )}
          </>
        )}
      </div>
      <Modal
        size={700}
        opened={openFeatures}
        onClose={() => setOpenFeatures(false)}
        title={`"${audioArtist?.name}" by ${audioArtist?.artists[0].name}`}
      >
        <Features />
      </Modal>
    </>
  );
}
