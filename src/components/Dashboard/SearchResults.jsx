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
import { setAudioFeatures } from '../../store/reducers/audioFeaturesSlice';
import {
  getAlbumTracks,
  getArtistTop,
} from '../../store/reducers/selectedSlice';
import Features from '../Features'

export default function SearchResults() {
  const [opened, setOpened] = useState(false);
  const [albumOpened, setAlbumOpened] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [openFeatures, setOpenFeatures] = useState(false);
  const dispatch = useDispatch();
  const { tracks, artists, albums } = useSelector(
    (state) => state.searchSlice.results,
  );
  const { selectedData } = useSelector((state) => state.selectedSlice);
  const { disabled } = useSelector((state) => state.playlistSlice);
  const { audioArtist } = useSelector((state) => state.audioFeaturesSlice);

  const formatDuration = (duration_ms) => {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAlbumModal = (item) => {
    setCurrentAlbum(item);
    dispatch(getAlbumTracks(item.id));
    setAlbumOpened(true);
  };

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
              <List
                type="ordered"
                className="list"
              >
                {selectedData?.tracks.map((item, index) => (
                  <List.Item
                    px="20px"
                    key={crypto.randomUUID()}
                    className="list_item"
                  >
                    <Group onClick={() => dispatch(playSong(item.uri))}>
                      <a
                        href={item.external_urls.spotify}
                        className="logo logo--tracks"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                          <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                          <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                        </svg>
                      </a>
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
                        src={item.album.images[2].url}
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
                      disabled={disabled}
                    >
                      +
                    </Button>
                  </List.Item>
                ))}
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
                  src={currentAlbum.images[1].url}
                  height={200}
                  width={200}
                />
                <Stack>
                  <Text
                    c="dimmed"
                    fz="xs"
                    fw={600}
                  >
                    {currentAlbum.album_type.toUpperCase()}
                  </Text>
                  <Text
                    fz="xl"
                    fw={900}
                  >
                    {currentAlbum.name}
                  </Text>
                  <Group>
                    <Text
                      fw={600}
                      fz="md"
                    >
                      {currentAlbum.artists[0].name}
                    </Text>
                    <Text fz="sm">
                      {currentAlbum.release_date.split('-')[0]}
                    </Text>
                    <Text fz="sm">{currentAlbum.total_tracks} Songs</Text>
                  </Group>
                </Stack>
              </Group>
              <List
                type="ordered"
                className="list"
              >
                {selectedData?.items.map((item, index) => (
                  <List.Item
                    px={'10px'}
                    key={crypto.randomUUID()}
                    className="list_item"
                  >
                    <Group
                      position="apart"
                      onClick={() => dispatch(playSong(item.uri))}
                    >
                      <Group>
                        <a
                          href={item.external_urls.spotify}
                          className="logo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                            <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                            <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                          </svg>
                        </a>
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
                      disabled={disabled}
                    >
                      +
                    </Button>
                  </List.Item>
                ))}
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
              mx="20px"
              type="ordered"
              className="list"
            >
              {tracks?.tracks.items.map((item, index) => (
                <List.Item
                  mx={24}
                  key={`item-${index}`}
                  className="list_item"
                >
                  <a
                    href={item.external_urls.spotify}
                    className="logo logo--rec"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                      <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                      <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                    </svg>
                  </a>
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
                      src={item.album.images[2].url}
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
                    <Text className="duration">
                      {formatDuration(item.duration_ms)}
                    </Text>
                  </Group>
                  <Button
                    className="list_button"
                    key={`button-${index}`}
                    color="lime"
                    radius="sm"
                    size="xs"
                    compact
                    onClick={() => dispatch(selectTrack(item?.uri))}
                    disabled={disabled}
                  >
                    +
                  </Button>
                  <Button
                    className="list_button_features"
                    key={`button-${index}-features`}
                    color="orange"
                    radius="sm"
                    size="xs"
                    compact
                    onClick={() => {
                      dispatch(setAudioFeatures(item));
                      setOpenFeatures(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 512 512"><path fill="currentColor" d="M128 496H48V304h80Zm224 0h-80V208h80Zm112 0h-80V96h80Zm-224 0h-80V16h80Z" /></svg>
                  </Button>
                </List.Item>
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
                withBorder
                onClick={() => {
                  dispatch(getArtistTop(item.id));
                  setOpened(true);
                }}
                className="hover"
              >
                <Image
                  src={item.images[1]?.url || wrapped}
                  alt={item.name}
                />

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
                <a
                  href={item.external_urls.spotify}
                  className="logo logo--card"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                    <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                    <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                  </svg>
                </a>
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

                py={50}
                component="a"
                withBorder
                onClick={() => handleAlbumModal(item)}
                className="hover"
              >
                <Image
                  src={item.images.at(-2)?.url}
                  alt={item.name}
                />
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
                  {item?.artists.map((item) => (
                    <span key={crypto.randomUUID()}>{item.name + ' '}</span>
                  ))}
                </Text>
                <a
                  href={item.external_urls.spotify}
                  className="logo logo--card"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" version="1.1" viewBox="0 0 168 168">
                    <path fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                    <path xmlns="http://www.w3.org/2000/svg" fill="#1ED760" d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
                  </svg>
                </a>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Modal
        size={700}
        opened={openFeatures}
        onClose={() => setOpenFeatures(false)}
        title={`"${audioArtist?.name}" by ${audioArtist?.artists[0].name} Stats`}
      >
        <Features />
      </Modal>
    </>
  );
}
