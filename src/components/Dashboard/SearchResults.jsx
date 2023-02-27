/** @format */

import React from 'react';
import { Text, List, Button, Paper, Group, Stack } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchResults() {
  const dispatch = useDispatch();
  const { tracks, artists, albums } = useSelector(
    (state) => state.searchSlice.results,
  );

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

  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {tracks && <h3>Tracks</h3>}
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
          {tracks?.tracks.items.map((item, index) => (
            <>
              <List.Item
                key={`item-${index}`}
                className="list_item"
              >
                <Group
                  className='group__songs'
                  position="apart">
                  <Stack>
                    <Text fw={700}>{item.name}</Text>
                    <Text
                      fz="sm"
                      c="dimmed"
                    >
                      {item.artists.map((artist) => artist.name)}
                    </Text>
                  </Stack>
                  <p>{formatDuration(item.duration_ms)}</p>
                </Group>
                <Button
                  className="list_button"
                  key={`button-${index}`}
                  color="lime"
                  radius="sm"
                  size="xs"
                  compact
                >
                  +
                </Button>
              </List.Item>
            </>
          ))}
        </List>
      </Paper>

      {artists && <h3>Artists</h3>}
      <Paper
        shadow="lg"
        radius="md"
        withBorder
        className="paper"
      >
        <ul>
          {artists?.artists.items.map((item) => (
            <li key={crypto.randomUUID()}>{item.name}</li>
          ))}
        </ul>
      </Paper>
      {albums && <h3>Albums</h3>}
      <Paper
        shadow="lg"
        radius="md"
        withBorder
        className="paper"
      >
        <ul>
          {albums?.albums.items.map((item) => (
            <li key={crypto.randomUUID()}>
              {item.name} - {item?.artists.map((item) => item.name + ' ')}
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  );
}
