/** @format */
import Cookies from 'universal-cookie';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Button,
  Navbar,
  Group,
  Paper,
  Code,
  Stack,
  ScrollArea,
  Modal,
  Switch,
  Input,
} from '@mantine/core';

import {
  setPlaylistItems,
  selectPlaylist,
  getUserPlaylists,
  createPlaylist,
} from '../../store/reducers/playlistSlice';
import { setUser } from '../../store/reducers/userSlice';
import { useStyles } from './sidebarStyles';
import { getHeight } from '../../store/reducers/screenHeightSlice';
import { logout } from '../../store/reducers/loginSlice';
export default function Sidebar() {
  const [active, setActive] = useState('');
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const cookies = new Cookies();
  const { user } = useSelector((state) => state.userSlice);
  const { selectedTrack, selectedPlaylist, allPlaylists } = useSelector(
    (state) => state.playlistSlice,
  );
  const fetchPlaylistItems = (playlistId, playlistName = '') => {
    if (playlistName !== active) {
      dispatch(selectPlaylist(playlistId));
      dispatch(setPlaylistItems(playlistId));
    }
  };
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    dispatch(logout());
  };

  useEffect(() => {
    function handleResize() {
      dispatch(getHeight(window.innerHeight - 49));
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(getUserPlaylists());
    if (selectedPlaylist) {
      fetchPlaylistItems(selectedPlaylist);
    }
  }, [selectedTrack, selectedPlaylist]);

  useEffect(() => {
    dispatch(setUser());
    dispatch(getUserPlaylists());
  }, []);

  const newPlaylist = async () => {
    const body = {
      name: name,
      description: description,
      public: isPublic,
      user_id: user.id,
    };
    dispatch(createPlaylist(body));
    dispatch(getUserPlaylists());
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    newPlaylist();
    setOpened(false);
  };

  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const { classes, cx } = useStyles();

  console.log(allPlaylists);

  const playlists = allPlaylists?.items?.map((item) => (
    <Paper
      className={cx(classes.link, {
        [classes.linkActive]: item.name === active,
      })}
      key={item?.id}
      onClick={async () => {
        setActive(item.name);
        fetchPlaylistItems(item?.id, item.name);
      }}
    >
      <Group
        position="left"
        mt="md"
        mb="xs"
      >
        <Image
         radius="md"
         width={50}
        height={50}
        src={item.images[0].url}
        />
        <Stack>
          <p className="playlist_text_name">{item?.name}</p>
          <p className="playlist_text_tracks">Tracks: {item?.tracks.total}</p>
        </Stack>
      </Group>
    </Paper>
  ));

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
      <Navbar
        className={classes.sidebar}
        p="md"
      >
        <Group>
          <p className="sidebar-title">Wrapped Portal</p>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.421 11.375c-.294 1.028.012 2.064.784 2.653c1.061.81 2.565.3 2.874-.995c.08-.337.103-.722.027-1.056c-.23-1.001-.52-1.988-.792-2.996c-1.33.154-2.543 1.172-2.893 2.394zm5.548-.287c.273 1.012.285 2.017-.127 3c-1.128 2.69-4.721 3.14-6.573.826c-1.302-1.627-1.28-3.961.06-5.734c.78-1.032 1.804-1.707 3.048-2.054l.379-.104c-.084-.415-.188-.816-.243-1.224c-.176-1.317.512-2.503 1.744-3.04c1.226-.535 2.708-.216 3.53.76c.406.479.395 1.08-.025 1.464c-.412.377-.996.346-1.435-.09c-.247-.246-.51-.44-.877-.436c-.525.006-.987.418-.945.937c.037.468.173.93.3 1.386c.022.078.216.135.338.153c1.334.197 2.504.731 3.472 1.676c2.558 2.493 2.861 6.531.672 9.44c-1.529 2.032-3.61 3.168-6.127 3.409c-4.621.44-8.664-2.53-9.7-7.058c-.945-4.144 1.38-8.568 5.335-10.149c.586-.234 1.143-.031 1.371.498c.232.537-.019 1.086-.61 1.35c-2.368 1.06-3.817 2.855-4.215 5.424c-.533 3.433 1.656 6.776 5 7.72c2.723.77 5.658-.166 7.308-2.33c1.586-2.08 1.4-5.099-.427-6.873a3.979 3.979 0 0 0-1.823-1.013c.198.716.389 1.388.57 2.062z"
            />
          </svg>
        </Group>
        <Navbar.Section
          grow
          component={ScrollArea}
          className={classes.header}
        >
          <Group position="apart"></Group>
          <Code sx={{ fontWeight: 700 }}>Your Playlists</Code>
          {playlists}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={() => setOpened(true)}
          >
            <span>Create New Playlist</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="sidebar-bottom"
            >
              <path
                fill="currentColor"
                d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5h2z"
              />
              <path
                fill="currentColor"
                d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"
              />
            </svg>
          </a>
          <a
            href="#"
            className={classes.link}
            onClick={handleLogout}
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="sidebar-bottom"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
              />
            </svg>
          </a>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
