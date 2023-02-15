/** @format */

import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Image,
  Input,
  MultiSelect,
  Slider,
  Text,
} from '@mantine/core';

export default function CustomRec() {
  const { token } = useSelector((state) => state.login);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [dance, setDance] = useState('');
  const [energy, setEnergy] = useState('');
  const [loud, setLoud] = useState('');
  const [vibe, setVibe] = useState('');
  const [tempo, setTempo] = useState('');
  const [popular, setPopular] = useState('');
  const [instrumental, setInstrumental] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [genreChoices, setGenreChoices] = useState([]);
  const fetchData = async () => {
    const stringifiedGenre = genre.join('');
    console.log(stringifiedGenre);
    try {
      const response = await axios.get(`http://localhost:3001/recommendation`, {
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
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const variables = [
    'Genre',
    'Danceability',
    'Energy',
    'Loudness',
    'Vibe',
    'Tempo',
    'Popularity',
    'Instrumentalness',
  ];

  const handleOptionSelection = (selectedOption) => {
    // Need to handle state value when selected option is selected or deselected //////
    setSelectedOption(selectedOption);
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
        <div className="left-column">
          <h3>Create Your Own Custom Recommendations</h3>
          <h4>Enter an Artist to Base your Recommendations On</h4>
          <Input
            placeholder="Prince"
            radius="xl"
            onChange={(e) => setArtist(e.target.value)}
            className="smaller-input"
          />
          <h4>Pick What You Would Like to Sort Your Recommendations By</h4>
          <MultiSelect
            radius="xl"
            data={variables}
            placeholder="Choose"
            onChange={handleOptionSelection}
            className="smaller-input"
          />
          {selectedOption.includes('Genre') && (
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
          )}
        </div>
        <div className="right-column">
          {selectedOption.includes('Danceability') && (
            <Slider
              label={null}
              color="pink"
              radius="xs"
              marks={[
                { value: 0, label: 'No Danceability' },
                { value: 50, label: 'Average Danceability' },
                { value: 100, label: 'Extreme Danceability' },
              ]}
              onChange={(value) => setDance(value / 100)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Energy') && (
            <Slider
              label={null}
              color="lime"
              radius="xs"
              marks={[
                { value: 0, label: 'Low Energy' },
                { value: 50, label: 'Average Energy' },
                { value: 100, label: 'Very Energetic' },
              ]}
              onChange={(value) => setEnergy(value / 100)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Loudness') && (
            <Slider
              label={null}
              color="violet"
              radius="xs"
              marks={[
                { value: 0, label: 'Very Quiet' },
                { value: 50, label: 'Average' },
                { value: 100, label: 'Very Loud' },
              ]}
              onChange={(value) => setLoud(value / 100)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Vibe') && (
            <Slider
              label={null}
              color="orange"
              radius="xs"
              marks={[
                { value: 0, label: 'Sad/Angry' },
                { value: 50, label: 'Indifferent' },
                { value: 100, label: 'Happy/Euphoric' },
              ]}
              onChange={(value) => setVibe(value / 100)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Tempo') && (
            <Slider
              label={null}
              color="red"
              radius="xs"
              marks={[
                { value: 0, label: '60 BPM' },
                { value: 50, label: '130 BPM' },
                { value: 100, label: '200 BPM' },
              ]}
              onChange={(value) => setTempo(1.4 * value + 60)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Popularity') && (
            <Slider
              label={null}
              radius="xs"
              color="yellow"
              marks={[
                { value: 0, label: 'Obscure' },
                { value: 50, label: 'Notable' },
                { value: 100, label: 'Well Known' },
              ]}
              onChange={(value) => setPopular(value)}
              className="smaller-slider"
            />
          )}
          {selectedOption.includes('Instrumentalness') && (
            <Slider
              label={null}
              color="teal"
              radius="xs"
              marks={[
                { value: 0, label: 'Mostly Vocals' },
                { value: 50, label: 'Half Vocals' },
                { value: 100, label: 'No Vocals' },
              ]}
              onChange={(value) => setInstrumental(value / 100)}
              className="smaller-slider"
            />
          )}
          <Button
            color="gray"
            className="smaller-slider"
            radius="xl"
            type="submit"
          >
            Submit
          </Button>
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
                  <Image src={item.album.images[0].url} />
                </Card.Section>
                <Card.Section>
                  <Text
                    weight={600}
                    className="card-text-large"
                  >
                    {item.album.artists[0].name}
                  </Text>
                </Card.Section>
                <Card.Section>
                  <Text
                    weight={300}
                    className="card-text-small"
                  >
                    {item.name}
                  </Text>
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
