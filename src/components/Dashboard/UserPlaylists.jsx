/** @format */

import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Button, Paper, Text, List, Image, Group, Stack } from '@mantine/core';
import { removeTrack } from '../../store/reducers/playlistSlice';
import { playSong, playAll } from '../../store/reducers/webPlayerSlice';

export default function UserPlaylists() {
  const { playlistItems, selectedPlaylist } = useSelector(
    (state) => state.playlistSlice,
  );

  const dispatch = useDispatch();

  const handleRemoveTrackFromPlaylist = async (trackUri, index) => {
    dispatch(removeTrack({ trackUri, index, playlistId: selectedPlaylist }));
  };

  return (
    <>
      <div className="playlist">
        <h3>Current Playlist</h3>
        {playlistItems && (
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
              <Button
                onClick={() => {
                  dispatch(playSong(playlistItems.items[0].track.uri));
                  dispatch(playAll(playlistItems.href.split('/').at(-2)));
                }}
              >
                {console.log(playlistItems.href.split('/').at(-2))}
                Play All
              </Button>
              {playlistItems?.items.map((item, index) => (
                <List.Item
                  onClick={() => dispatch(playSong(item.track.uri))}
                  key={`item-${index}`}
                  className="list_item"
                >
                  <Group>
                    <Image
                      radius="md"
                      src={item.track.album.images[0].url}
                      height={60}
                      width={60}
                      className="image-top"
                    />
                    <Stack className="text-top">
                      <div className="text-select">
                        <Text fw={700}>{item?.track.name}</Text>
                        <Text
                          fz="sm"
                          c="dimmed"
                        >
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
                    onClick={() =>
                      handleRemoveTrackFromPlaylist(item?.track.uri, index)
                    }
                    className="playlist_button"
                  >
                    -
                  </Button>
                </List.Item>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </>
  );
}
