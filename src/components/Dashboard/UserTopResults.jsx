import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button, Input, Image, List, Paper, Text, Group, Stack } from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';


export default function UserTopResults() {

  const [data, setData] = useState(null);
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
      <div className='topResults'>
        <h3>Your Top Listens</h3>
        <div className="input-container">
          <div className="input-wrapper">
            <h4 className='input'>Tracks or Artists</h4>
            <Input className='top-input' radius="xl" component="select" onChange={(event) => setType(event.target.value)}>
              <option value="tracks">Tracks</option>
              <option value="artists">Artists</option>
            </Input>
          </div>
          <div className="input-wrapper">
            <h4 className='input'>Time Range</h4>
            <Input className='top-input' radius="xl" component="select" onChange={(event) => setRange(event.target.value)}>
              <option value="short_term">Past Month</option>
              <option value="medium_term">Past 6 Months</option>
              <option value="long_term">All Time</option>
            </Input>
          </div>
        </div>
        <Paper
          shadow="lg"
          radius="md"
          withBorder
          className='paper'
        >
          <List type="ordered" className='list' >
            {data?.items.map((item, index) => (
              item.album ?
                <List.Item key={`item-${index}`} className='list_item'>
                  <Group>
                    <Image
                      radius="md"
                      src={item.album.images[0].url}
                      height={60}
                      width={60}
                      className='image-top'
                    />
                    <Stack className='text-top'>
                    <Text fw={700}>
                      {item.name}
                    </Text>
                    <Text className='top-artist-text' fz="sm" c="dimmed">
                      {item.album.artists[0].name}
                    </Text>
                    </Stack>
                    </Group>


                    <Button
                      className='list_button'
                      key={`button-${index}`}
                      color="lime"
                      radius="sm"
                      size="xs"
                      compact
                      onClick={() => handleAddTrackToPlaylist(item?.uri)}
                    >
                      +
                    </Button>

                </List.Item>
                :
                <List.Item key={`item-${index}`}>
                  <Text fw={700}>
                    {item.name}
                  </Text>
                </List.Item>
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
};
