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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M38.1966 21.2764C30.4604 16.6821 17.6998 16.2597 10.3146 18.5011C9.12845 18.861 7.87433 18.1915 7.51523 17.0056C7.15585 15.8189 7.82446 14.5656 9.01123 14.2051C17.4891 11.6318 31.5819 12.1288 40.4879 17.4155C41.5549 18.0488 41.9045 19.4265 41.2723 20.4914C40.6395 21.5581 39.2607 21.9098 38.1966 21.2764ZM37.9433 28.0812C37.4005 28.9619 36.249 29.2381 35.3694 28.6973C28.92 24.733 19.0848 23.5843 11.4544 25.9005C10.4651 26.1994 9.41991 25.6417 9.11927 24.6539C8.82122 23.6645 9.37921 22.6214 10.3671 22.3204C19.0837 19.6752 29.9199 20.9563 37.3277 25.5088C38.2072 26.0504 38.4841 27.2025 37.9433 28.0812ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1844 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163ZM23.9999 0C10.7454 0 0 10.7451 0 23.9996C0 37.2555 10.7454 48 23.9999 48C37.2549 48 48 37.2555 48 23.9996C48 10.7451 37.2549 0 23.9999 0Z"
                            fill="black"
                          />
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M38.1966 21.2764C30.4604 16.6821 17.6998 16.2597 10.3146 18.5011C9.12845 18.861 7.87433 18.1915 7.51523 17.0056C7.15585 15.8189 7.82446 14.5656 9.01123 14.2051C17.4891 11.6318 31.5819 12.1288 40.4879 17.4155C41.5549 18.0488 41.9045 19.4265 41.2723 20.4914C40.6395 21.5581 39.2607 21.9098 38.1966 21.2764ZM37.9433 28.0812C37.4005 28.9619 36.249 29.2381 35.3694 28.6973C28.92 24.733 19.0848 23.5843 11.4544 25.9005C10.4651 26.1994 9.41991 25.6417 9.11927 24.6539C8.82122 23.6645 9.37921 22.6214 10.3671 22.3204C19.0837 19.6752 29.9199 20.9563 37.3277 25.5088C38.2072 26.0504 38.4841 27.2025 37.9433 28.0812ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1844 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163ZM23.9999 0C10.7454 0 0 10.7451 0 23.9996C0 37.2555 10.7454 48 23.9999 48C37.2549 48 48 37.2555 48 23.9996C48 10.7451 37.2549 0 23.9999 0Z"
                              fill="black"
                            />
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
                  mx="44px"
                  key={`item-${index}`}
                  className="list_item"
                >
                  <a
                    href={item.external_urls.spotify}
                    className="logo logo--rec"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M38.1966 21.2764C30.4604 16.6821 17.6998 16.2597 10.3146 18.5011C9.12845 18.861 7.87433 18.1915 7.51523 17.0056C7.15585 15.8189 7.82446 14.5656 9.01123 14.2051C17.4891 11.6318 31.5819 12.1288 40.4879 17.4155C41.5549 18.0488 41.9045 19.4265 41.2723 20.4914C40.6395 21.5581 39.2607 21.9098 38.1966 21.2764ZM37.9433 28.0812C37.4005 28.9619 36.249 29.2381 35.3694 28.6973C28.92 24.733 19.0848 23.5843 11.4544 25.9005C10.4651 26.1994 9.41991 25.6417 9.11927 24.6539C8.82122 23.6645 9.37921 22.6214 10.3671 22.3204C19.0837 19.6752 29.9199 20.9563 37.3277 25.5088C38.2072 26.0504 38.4841 27.2025 37.9433 28.0812ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1844 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163ZM23.9999 0C10.7454 0 0 10.7451 0 23.9996C0 37.2555 10.7454 48 23.9999 48C37.2549 48 48 37.2555 48 23.9996C48 10.7451 37.2549 0 23.9999 0Z"
                        fill="black"
                      />
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
                  >
                    +
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
                <Card.Section>
                  <Image
                    src={item.images[1]?.url || wrapped}
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
                withBorder
                onClick={() => handleAlbumModal(item)}
                className="hover"
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
                  {item?.artists.map((item) => (
                    <span key={crypto.randomUUID()}>{item.name + ' '}</span>
                  ))}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
