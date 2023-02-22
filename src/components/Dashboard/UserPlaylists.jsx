/** @format */

import { useSelector} from 'react-redux';
import React from 'react';
import {
  Paper,
  Text,
  List,
} from '@mantine/core';
export default function UserPlaylists() {
  const { playlistItems } = useSelector(state => state.playlistSlice,
  );


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
                  <Text fw={700}>
                  {item?.track.name}
                  </Text>
                  <Text fz="sm" c="dimmed">
                  {item?.track?.artists[0].name}
                  </Text>
                </List.Item>
            ))}
          </List>
        </Paper>
      </div>
    </>
  );
}
