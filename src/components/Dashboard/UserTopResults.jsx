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
} from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';
import { playSong } from '../../store/reducers/webPlayerSlice';
import { getArtistTop } from '../../store/reducers/selectedSlice';

export default function UserTopResults() {
  const [data, setData] = useState(null);
  const [type, setType] = useState('tracks');
  const [range, setRange] = useState('short_term');

  const { token } = useSelector((state) => state.login);
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



  return (
    <>
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
                    key={`item-${index}`}
                    className="list_item"
                  >
                    <Group onClick={() => dispatch(playSong(item.uri))}>
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
                        radius="md"
                        src={item.album.images[0].url}
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
                      onClick={() => dispatch(getArtistTop(item.id))}
                    >
                      <Text
                        fw={600}
                        className="numbers--artists"
                      >
                        {index + 1}
                      </Text>
                      <Image
                        radius="md"
                        src={item.images[0].url}
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
        )}
      </div>
    </>
  );
}
