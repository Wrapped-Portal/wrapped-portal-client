/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  List,
  Image,
  Input,
  MultiSelect,
  Text,
  Group,
  Stack,
} from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';
import SoundBoard from './SoundBoard';
import { playSong } from '../../store/reducers/webPlayerSlice';
import { createCustomPlaylist } from '../../store/reducers/playlistSlice';

export default function CustomRec() {
  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.userSlice);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState('');
  const [genreChoices, setGenreChoices] = useState([]);

  const {
    dance,
    energy,
    loud,
    vibe,
    tempo,
    popular,
    instrumental,
    live,
    acoustic,
  } = useSelector((state) => state.soundBoardSlice);

  const fetchData = async () => {
    const stringifiedGenre = genre.join();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}recommendation`,
        {
          params: {
            token: token.accessToken,
            artist,
            stringifiedGenre,
            dance,
            energy,
            loud,
            vibe,
            tempo,
            popular,
            instrumental,
            acoustic,
            live,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const dispatch = useDispatch();
  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await fetchData();
      setData((prevData) => {
        if (prevData && prevData.tracks) {
          return { ...prevData, tracks: [] };
        } else {
          return prevData;
        }
      });
      setData(result);
      setError(null);
      setLoading(false);
    } catch (error) {
      if (artist === '') {
        setError({ message: 'Artist is required!' });
      } else {
        setError(error);
      }
      setLoading(false);
    }
  };

  const handleCreateCustomPlaylist = async () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const date = `${mm}/${dd}/${yyyy}`;

    const body = {
      name: `Custom Recommendations ${date} `,
      description: `Your Custom Recommendations made on ${date}. Artist chosen to base the recommendations on: "${artist}". Created on Tune Port`,
      public: true,
      user_id: user.id,
    };
    const uris = data?.tracks.map((item) => item.uri).join(',');

    let payload = {
      body: body,
      uris: uris,
    };

    dispatch(createCustomPlaylist(payload));
  };

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('genres.json');
        const genres = await response.json();

        setGenreChoices(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setGenreChoices([]);
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className="rec">
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="options_rec">
          <h3>Create Your Own Custom Recommendations</h3>
          <div className="group_select">
            <h4>Enter an Artist to Base your Recommendations On</h4>
            <Input
              placeholder="Prince"
              onChange={(e) => setArtist(e.target.value)}
              className="smaller-input"
            />

            <>
              <h4>Choose up to Four Genres</h4>

              <MultiSelect
                data={genreChoices}
                maxSelectedValues={4}
                placeholder="Choose up to Four Genres"
                onChange={(value) => setGenre(value)}
                className="smaller-input"
              />
            </>
            <h4>Select Your Parameters</h4>
            <div className="knob-board">
              <SoundBoard />
            </div>

            <Button
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              className="rec_button"
              type="submit"
              variant="gradient"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
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
              {data && Array.isArray(data.tracks) && data.tracks.length > 0
                ? data?.tracks.map((item, index) => (
                    <List.Item
                      mx="44px"
                      key={`item-${index}`}
                      className="list_item"
                    >
                      <a
                        href={item.external_urls.spotify}
                        className="logo logo--rec"
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
                        <Text className="duration">
                          {formatDuration(item.duration_ms)}
                        </Text>
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
                  ))
                : null}
            </List>
          </Paper>
          <Button
            className="top_playlist_button"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            onClick={() => handleCreateCustomPlaylist()}
          >
            Create Playlist For Custom Reccomendations
          </Button>
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
