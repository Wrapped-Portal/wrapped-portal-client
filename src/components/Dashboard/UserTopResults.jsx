import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button, Input, List, Paper, Text } from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';


export default function UserTopResults() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('tracks');
  const [range, setRange] = useState('short_term');

  const { token } = useSelector((state) => state.login);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/top`, {
        params: {
          token: token.accessToken,
          type,
          range,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [type, range]);


  return (
    <>
      <div className='topResults'>
        <h3>Your Top Listens</h3>
        <h4 className='input' >Tracks or Artists</h4>
        <Input className='input' radius="xl" component="select" onChange={(event) => setType(event.target.value)}>
          <option value="tracks">Tracks</option>
          <option value="artists">Artists</option>
        </Input>
        <h4 className='input' >Time Range</h4>
        <Input className='input' radius="xl" component="select" onChange={(event) => setRange(event.target.value)}>
          <option value="short_term">Past Month</option>
          <option value="medium_term">Past 6 Months</option>
          <option value="long_term">All Time</option>
        </Input>
        <Paper
          shadow="lg"
          radius="md"
          withBorder
          className='paper'
        >
          <List type="ordered" className='list' >
            {data?.items.map((item, index) => (
              item.album ?
                <List.Item key={`item-${index}`}>
                  {item.name} - {item.album.artists[0].name}
                  <Button
                    key={`button-${index}`}
                    color="lime"
                    radius="xs"
                    size="xs"
                    compact
                    onClick={() => handleAddTrackToPlaylist(item?.uri)}
                  >
                    +
                  </Button>
                </List.Item>
                :
                <List.Item key={`item-${index}`}>
                  {item.name}
                  <Button
                    key={`button-${index}`}
                    color="lime"
                    radius="xs"
                    size="xs"
                    compact
                    onClick={() => handleAddTrackToPlaylist(item?.uri)}
                  >
                    +
                  </Button>
                </List.Item>
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
};
