/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Modal,
  Paper,
  Switch,
  Text,
  List,
} from '@mantine/core';
import { selectPlaylist } from '../../store/reducers/playlistSlice';

export default function UserPlaylists() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const { token } = useSelector((state) => state.login);
  const { selectedPlaylist, selectedTrack, playlistItems } = useSelector(state => state.playlistSlice,
  );

  console.log(playlistItems)

  const dispatch = useDispatch();


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
      const updatedData = await fetchData();

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
