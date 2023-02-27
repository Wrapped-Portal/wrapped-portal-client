/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import {
  Button,
  Paper,
  Text,
  List,
  Image,
  Group,
  Stack,
} from '@mantine/core';
import { selectTrack } from '../../store/reducers/playlistSlice';

export default function UserPlaylists() {
  const { token } = useSelector((state) => state.login);
  const { playlistItems, selectedPlaylist } = useSelector(state => state.playlistSlice,
  );

  const dispatch = useDispatch();

  const handleRemoveTrackFromPlaylist = async (trackUri, index) => {
    dispatch(selectTrack(trackUri));
    try {
      const response = await axios.delete(`http://localhost:3001/remove?token=${token.accessToken}`, {
        data: {
          playlistId: selectedPlaylist,
          trackUri: trackUri,
          index: index,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="playlist">
        <h3>Current Playlist</h3>
        <Paper
          shadow="lg"
          radius="md"
          withBorder
          className='paper'
        >
          <List type="ordered" className='list' >
            {playlistItems?.items.map((item, index) => (
              <List.Item key={`item-${index}`} className='list_item'>
                <Group>
                  <Image
                    radius="md"
                    src={item.track.album.images[0].url}
                    height={60}
                    width={60}
                    className='image-top'
                  />
                  <Stack className='text-top'>
                    <div className='text-select'>
                      <Text fw={700}>
                        {item?.track.name}
                      </Text>
                      <Text fz="sm" c="dimmed">
                        {item?.track?.artists[0].name}
                      </Text>
                    </div>
                  </Stack>
                </Group>
                <Button
                  key={`button-${index}`}
                  color="red"
                  radius="sm"
                  size="xs"
                  compact
                  onClick={() => handleRemoveTrackFromPlaylist(item?.track.uri, index)}
                  className='playlist_button'
                >
                  -
                </Button>
              </List.Item>
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
}
