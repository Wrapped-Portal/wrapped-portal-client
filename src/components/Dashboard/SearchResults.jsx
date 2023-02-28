/** @format */

import React from 'react';
import {
  Text,
  List,
  Button,
  Paper,
  Group,
  Stack,
  Card,
  Image,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrack } from '../../store/reducers/playlistSlice';
import { playSong } from '../../store/reducers/webPlayerSlice';
export default function SearchResults() {
  const dispatch = useDispatch();
  const { tracks, artists, albums } = useSelector(
    (state) => state.searchSlice.results,
  );

  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      {tracks && <h3>Tracks</h3>}
      {tracks && (
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
                  onClick={() => dispatch(playSong(item.uri))}
                  key={`item-${index}`}
                  className="list_item"
                >
                  <Group
                    className="group__songs"
                    position="apart"
                  >
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
                    onClick={() => dispatch(selectTrack(item?.uri))}
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
      )}

      {artists && <h3>Artists</h3>}
      {artists && (
        <Paper
          shadow="lg"
          radius="md"
          withBorder
          className="paper card"
        >
          <ul>
            {artists?.artists.items.map((item) => (
              <Card
                key={crypto.randomUUID()}
                shadow="sm"
                p="xl"
                component="a"
                href={item.external_urls.spotify}
                target="_blank"
              >
                <Card.Section>
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    height={220}
                    width={220}
                  />
                </Card.Section>

                <Text
                  weight={500}
                  size="lg"
                  mt="md"
                >
                  {item.name}
                </Text>

                <Text
                  mt="xs"
                  color="dimmed"
                  size="sm"
                >
                  {console.log(item, 'item')}
                  Followers: {item.followers.total}
                </Text>
              </Card>
            ))}
          </ul>
        </Paper>
      )}
      {albums && <h3>Albums</h3>}
      {albums && (
        <Paper
          shadow="lg"
          radius="md"
          withBorder
          className="paper card"
        >
          <ul>
            {albums?.albums.items.map((item) => (
              <Card
                key={crypto.randomUUID()}
                shadow="sm"
                p="xl"
                component="a"
                href={item.external_urls.spotify}
                target="_blank"
              >
                <Card.Section>
                  {console.log(item)}
                  <Image
                    src={item.images.at(-2).url}
                    alt={item.name}
                  />
                </Card.Section>

                <Text
                  weight={500}
                  size="lg"
                  mt="md"
                >
                  {item.name}
                </Text>

                <Text
                  mt="xs"
                  color="dimmed"
                  size="sm"
                >
                  {item?.artists.map((item) => item.name + ' ')}
                </Text>
              </Card>
            ))}
          </ul>
        </Paper>
      )}
    </div>
  );
}
