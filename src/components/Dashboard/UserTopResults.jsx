/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Image,
  List,
  Paper,
  Text,
  Group,
  Stack,
  Modal,
} from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';
import { playSong } from '../../store/reducers/webPlayerSlice';
import { getArtistTop } from '../../store/reducers/selectedSlice';
import { createCustomPlaylist } from '../../store/reducers/playlistSlice';

export default function UserTopResults() {
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState('tracks');
  const [range, setRange] = useState('short_term');

  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.userSlice);
  const { selectedData } = useSelector((state) => state.selectedSlice);
  const { selectedPlaylist } = useSelector((state) => state.playlistSlice);

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

  return (
    <>
      {selectedData?.tracks && (
        <Modal
          size={700}
        opened={opened}
        onClose={() => setOpened(false)}
        title={`${selectedData.tracks[2].artists[0].name}'s Top Tracks`}
        >
          <List
            type="ordered"
            className="list"
            >
            {selectedData?.tracks.map((item, index) => (
              <List.Item

                mx="sm"
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
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M38.1966 21.2764C30.4604 16.6821 17.6998 16.2597 10.3146 18.5011C9.12845 18.861 7.87433 18.1915 7.51523 17.0056C7.15585 15.8189 7.82446 14.5656 9.01123 14.2051C17.4891 11.6318 31.5819 12.1288 40.4879 17.4155C41.5549 18.0488 41.9045 19.4265 41.2723 20.4914C40.6395 21.5581 39.2607 21.9098 38.1966 21.2764ZM37.9433 28.0812C37.4005 28.9619 36.249 29.2381 35.3694 28.6973C28.92 24.733 19.0848 23.5843 11.4544 25.9005C10.4651 26.1994 9.41991 25.6417 9.11927 24.6539C8.82122 23.6645 9.37921 22.6214 10.3671 22.3204C19.0837 19.6752 29.9199 20.9563 37.3277 25.5088C38.2072 26.0504 38.4841 27.2025 37.9433 28.0812ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1844 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163ZM23.9999 0C10.7454 0 0 10.7451 0 23.9996C0 37.2555 10.7454 48 23.9999 48C37.2549 48 48 37.2555 48 23.9996C48 10.7451 37.2549 0 23.9999 0Z"
                        fill="black"
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
                    src={item.album.images[2].url}
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
                      {item.album.artists[0].name}
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
                >
                  +
                </Button>
              </List.Item>
            ))}
          </List>
        </Modal>
      )}
      <div className="topResults">
        <h3>Your Top Listens</h3>
        <div className="input-container">
          <div className="input-wrapper">
            <h4 className="input">Tracks or Artists</h4>
            <Input
              rightSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                  />
                </svg>
              }
              className="top-input"
              component="select"
              onChange={(event) => setType(event.target.value)}
            >
              <option value="tracks">Tracks</option>
              <option value="artists">Artists</option>
            </Input>
          </div>
          <div className="input-wrapper">
            <h4 className="input">Time Range</h4>
            <Input
              rightSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                  />
                </svg>
              }
              className="top-input"
              component="select"
              onChange={(event) => setRange(event.target.value)}
            >
              <option value="short_term">Past Month</option>
              <option value="medium_term">Past 6 Months</option>
              <option value="long_term">All Time</option>
            </Input>
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
                  item.album ? (
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
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M38.1966 21.2764C30.4604 16.6821 17.6998 16.2597 10.3146 18.5011C9.12845 18.861 7.87433 18.1915 7.51523 17.0056C7.15585 15.8189 7.82446 14.5656 9.01123 14.2051C17.4891 11.6318 31.5819 12.1288 40.4879 17.4155C41.5549 18.0488 41.9045 19.4265 41.2723 20.4914C40.6395 21.5581 39.2607 21.9098 38.1966 21.2764ZM37.9433 28.0812C37.4005 28.9619 36.249 29.2381 35.3694 28.6973C28.92 24.733 19.0848 23.5843 11.4544 25.9005C10.4651 26.1994 9.41991 25.6417 9.11927 24.6539C8.82122 23.6645 9.37921 22.6214 10.3671 22.3204C19.0837 19.6752 29.9199 20.9563 37.3277 25.5088C38.2072 26.0504 38.4841 27.2025 37.9433 28.0812ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1844 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163ZM23.9999 0C10.7454 0 0 10.7451 0 23.9996C0 37.2555 10.7454 48 23.9999 48C37.2549 48 48 37.2555 48 23.9996C48 10.7451 37.2549 0 23.9999 0Z"
                              fill="black"
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
                          src={item.album.images[2].url}
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
                            {item.album.artists[0].name}
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
                      >
                        +
                      </Button>
                    </List.Item>
                  ) : (
                    <List.Item key={`item-${index}`}>
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
            </Paper>
            {data?.items[0].album && (
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
    </>
  );
}
