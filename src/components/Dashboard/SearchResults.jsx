/** @format */

import React, { useState } from 'react';
import wrapped from '../../assets/wrapped.svg';
import {
  Text,
  List,
  Button,
  Paper,
  Group,
  Stack,
  Card,
  Image,
  Modal,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrack } from '../../store/reducers/playlistSlice';
import { playSong } from '../../store/reducers/webPlayerSlice';
import {
  getAlbumTracks,
  getArtistTop,
} from '../../store/reducers/selectedSlice';
export default function SearchResults() {
  const [opened, setOpened] = useState(false);
  const [albumOpened, setAlbumOpened] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState('');
  const dispatch = useDispatch();
  const { tracks, artists, albums } = useSelector(
    (state) => state.searchSlice.results,
  );
  const { selectedData } = useSelector((state) => state.selectedSlice);

  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const handleAlbumModal = (item) => {
    setCurrentAlbum(item)
    dispatch(getAlbumTracks(item.id));
    setAlbumOpened(true);
  }


  return (
    <>
      {selectedData && (
        <>
          {selectedData.tracks && (
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title={`${selectedData.tracks[3].artists[0].name}'s Top Tracks`}
            >
              <List type="ordered" className="list">
                {selectedData?.tracks.map((item, index) =>
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
                )}
              </List>
            </Modal>
          )}
          {selectedData?.items && (
            <Modal
              opened={albumOpened}
              onClose={() => setAlbumOpened(false)}
              size="50%"
              withCloseButton={false}
            >
              <Group>
                <Image
                  radius="md"
                  src={currentAlbum.images[0].url}
                  height={200}
                  width={200}
                />
                <Stack>
                  <Text c="dimmed" fz="xs" fw={600}>{currentAlbum.album_type.toUpperCase()}</Text>
                  <Text fz="xl" fw={900} >{currentAlbum.name}</Text>
                  <Group>
                    <Text fw={600} fz="md">{currentAlbum.artists[0].name}</Text>
                    <Text fz="sm">{currentAlbum.release_date.split('-')[0]}</Text>
                    <Text fz="sm">{currentAlbum.total_tracks} Songs</Text>
                  </Group>
                </Stack>
              </Group>
              <List type="ordered" className="list">
                {selectedData?.items.map((item, index) =>
                  <List.Item
                    key={`item-${index}`}
                    className="list_item"
                  >
                    <Group position="apart" onClick={() => dispatch(playSong(item.uri))}>
                      <Group >

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
                        <Stack className="text-top">
                          <Text fw={700}>{item.name}</Text>
                        </Stack>
                      </Group>
                      <p>{formatDuration(item.duration_ms)}</p>
                    </Group>
                    <Button
                      className="list_button_modal"
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
                )}
              </List>
            </Modal>
          )}
        </>
      )}
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
                    key={`item-${index}`}
                    className="list_item"
                  >
                    <Group
                      onClick={() => dispatch(playSong(item.uri))}
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
          <div className="grid-container">
            {artists?.artists.items.map((item) => (
              <Card
                key={crypto.randomUUID()}
                shadow="sm"
                p="lg"
                component="a"
                radius="md"
                withBorder
                onClick={() => {
                  dispatch(getArtistTop(item.id));
                  setOpened(true);
                }}
              >
                <Card.Section>
                  <Image
                    src={item.images[0]?.url || wrapped}
                    alt={item.name}
                    height={250}
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
                  Followers: {item.followers.total}
                </Text>
              </Card>
            ))}
          </div>
        )}
        {albums && <h3>Albums</h3>}
        {albums && (
          <div className="grid-container">
            {albums?.albums.items.map((item) => (
              <Card
                key={crypto.randomUUID()}
                shadow="sm"
                p="lg"
                component="a"
                radius="md"
                withBorder
                onClick={() => handleAlbumModal(item)}
              >
                <Card.Section>
                  <Image
                    src={item.images.at(-2)?.url}
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
          </div>
        )}
      </div>
    </>
  );
}
