/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button, Paper, List, Image, Input, MultiSelect, Text, Group, Stack } from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';
import SoundBoard from './SoundBoard';
import { playSong } from '../../store/reducers/webPlayerSlice';

export default function CustomRec() {
  const { token } = useSelector((state) => state.login);

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

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('genres.json');
        const genres = await response.json();

        setGenreChoices(genres); // set the state variable
      } catch (error) {
        console.error('Error fetching genres:', error);
        setGenreChoices([]); // set an empty array as the default
      }
    }

    fetchGenres(); // call the async function inside useEffect
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
              <h4>Choose up to Five Genres</h4>

              <MultiSelect
                data={genreChoices}
                maxSelectedValues={5}
                placeholder="Choose up to Five Genres"
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
              ))
              : null}
          </List>
        </Paper>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
