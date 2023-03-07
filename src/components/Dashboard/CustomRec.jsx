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
      description: `Your Custom Reccommendations made on ${date}. Artist chosen to base the recommendations on: "${artist}". Created on Tune Port`,
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
                ? data.tracks.map((item, index) => (
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
                      <Text className='duration'>{formatDuration(item.duration_ms)}</Text>
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
