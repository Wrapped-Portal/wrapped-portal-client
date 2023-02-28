/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Input, MultiSelect, Text } from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';
import SoundBoard from './SoundBoard';
import { playSong } from '../../store/reducers/webPlayerSlice';

export default function CustomRec() {
  const { token } = useSelector((state) => state.login);

  const [data, setData] = useState([]);
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

  const handleAddTrackToPlaylist = (selectedTrack) => {
    dispatch(selectTrack(selectedTrack));
    const payload = {
      selectedTrack: selectedTrack,
      accessToken: token.accessToken,
    };
    dispatch({
      type: 'addTrackToPlaylist',
      payload,
    });
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
              radius="xl"
              onChange={(e) => setArtist(e.target.value)}
              className="smaller-input"
            />

            <>
              <h4>Choose up to Five Genres</h4>

              <MultiSelect
                radius="xl"
                data={genreChoices}
                maxSelectedValues={5}
                placeholder="Choose up to Five Genres"
                onChange={(value) => setGenre(value)}
                className="smaller-input"
              />
            </>
            <div className="knob-board">
              <SoundBoard />
            </div>

            <Button
              color="lime"
              className="smaller-slider "
              radius="xl"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div className="grid-container">
        {data && Array.isArray(data.tracks) && data.tracks.length > 0
          ? data.tracks.map((item) => (
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                key={item.id}
              >
                <Card.Section>
                  <Image
                    className="hand__cursor"
                    onClick={() => dispatch(playSong(item.uri))}
                    src={item.album.images[0].url}
                  />
                </Card.Section>
                <Card.Section>
                  <Text
                    weight={600}
                    className="card-text-large"
                  >
                    {item.name}
                  </Text>
                </Card.Section>
                <Card.Section>
                  <Text
                    weight={300}
                    className="card-text-small"
                  >
                    {item.album.artists[0].name}
                  </Text>
                  <Button
                    key={item.id}
                    color="lime"
                    radius="xs"
                    size="xs"
                    compact
                    onClick={() => handleAddTrackToPlaylist(item?.uri)}
                    className="custom_add"
                  >
                    +
                  </Button>
                </Card.Section>
              </Card>
            ))
          : null}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data.length > 0 && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}
