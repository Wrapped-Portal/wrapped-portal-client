/** @format */

import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Group,
  Image,
  Input,
  Modal,
  Paper,
  Stack,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';

export default function UserPlaylists() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [list, setList] = useState(null);
  const [listName, setListName] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const { token } = useSelector((state) => state.login);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/playlist`, {
        params: {
          token: token.accessToken,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user`, {
        params: {
          token: token.accessToken,
        },
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
        console.error(error);
      }
    })();
    (async () => {
      try {
        const result = await fetchUser();
        setUser(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const createPlaylist = async () => {
    try {
      const body = {
        name: name,
        description: description,
        public: isPublic,
        user_id: user.id,
      };

      await axios.post('http://localhost:3001/makeplaylist', body, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      // Fetch updated playlist data
      const updatedData = await fetchData();

      // Update data state variable with updated playlist data
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    createPlaylist();
    setOpened(false);
  };

  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const getPlaylistItems = async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:3001/playlistitems`, {
        params: {
          token: token.accessToken,
          playlistId: playlistId,
        },
      });
      setList(response.data);
    } catch (error) {
      throw error;
    }
  };

  // console.log(list?.items);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Your Playlist!"
      >
        <form onSubmit={handleFormSubmit}>
          <Input.Wrapper
            label="Title of Playlist"
            required
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              className="playlist_input"
              placeholder="Best Songs Ever"
              radius="xl"
            ></Input>
          </Input.Wrapper>
          <Input.Wrapper label="Description Of Playlist">
            <Input
              onChange={(e) => setDescription(e.target.value)}
              className="playlist_input"
              placeholder="My favorite songs of all time!"
              radius="xl"
            ></Input>
          </Input.Wrapper>
          <Switch
            className="playlist_input"
            checked={isPublic}
            onChange={handleSwitchChange}
            label="Make Playlist Public"
            color="lime"
          ></Switch>
          <Button
            className="playlist_input"
            radius="xl"
            color="lime"
            type="submit"
          >
            Create Playlist
          </Button>
        </form>
      </Modal>

      <Modal
        opened={openList}
        onClose={() => setOpenList(false)}
        title={`Playlist: ${listName}`}
      >
        <div className="current">
          <Stack spacing="xs">
            {list?.items?.map((item) => (
              <Paper key={item?.track.id}>
                <Group
                  mt="md"
                  mb="xs"
                >
                  <Image
                    className="current_image"
                    radius="md"
                    width={80}
                    src={item?.track.album.images[0]?.url}
                  />
                  <Stack>
                    <Text className="current_text_name">
                      {item?.track.name}
                    </Text>
                    <Text className="current_text_tracks">
                      {item?.track.artists[0].name}
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </Stack>
        </div>
      </Modal>
      <div className="playlist">
        <h3>Your Playlists</h3>
        <Button
          radius="xl"
          className="playlist_button"
          color="lime"
          onClick={() => setOpened(true)}
        >
          Create Playlist
        </Button>

        <Stack spacing="xs">
          {data?.items.map((item) => (
            <Paper
              key={item?.id}
              className="playlist_item"
            >
              <Group
                position="apart"
                mt="md"
                mb="xs"
              >
                <Image
                  className="playlist_image"
                  radius="md"
                  width={80}
                  src={item?.images[0]?.url}
                />
                <Stack>
                  <Text className="playlist_text_name">{item?.name}</Text>
                  <Text className="playlist_text_tracks">
                    Tracks: {item?.tracks.total}
                  </Text>
                </Stack>
                <Button
                  className="playlist_button_see"
                  color="lime"
                  onClick={() => {
                    getPlaylistItems(item?.id, token);
                    setOpenList(true);
                    setListName(item?.name);
                  }}
                >
                  (0)
                </Button>
              </Group>
            </Paper>
          ))}
        </Stack>
      </div>
    </>
  );
}
