/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  createStyles,
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
} from '../../store/reducers/playlistSlice';

export default function Sidebar() {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight - 51);
  const [data, setData] = useState(null);
  const [active, setActive] = useState('');
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const { token } = useSelector((state) => state.login);
  const { selectedTrack, selectedPlaylist } = useSelector(
    (state) => state.playlistSlice,
  );

  const fetchPlaylistItems = async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:3001/playlistitems`, {
        params: {
          token: token.accessToken,
          playlistId: playlistId,
        },
      });
      dispatch(selectPlaylist(playlistId));
      dispatch(setPlaylistItems(response.data));
    } catch (error) {
      throw error;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight - 49);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const useStyles = createStyles((theme, _params, _getRef) => {
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      },

      sidebar: {
        position: 'fixed',
        right: theme.spacing.md * 2, // update this value
        top: 0,
        bottom: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        width: 250,
        height: screenHeight,
        zIndex: 1,
      },

      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      },

      link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },

      linkActive: {
        '&, &:hover': {
          backgroundColor: theme.fn.variant({
            variant: 'light',
            color: 'green',
          }).background,
          color: theme.fn.variant({ variant: 'light', color: 'green' }).color,
        },
      },
    };
  });
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

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchData();
        setData(result);
        if (selectedPlaylist) {
          await fetchPlaylistItems(selectedPlaylist);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedTrack, selectedPlaylist]);

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

  const { classes, cx } = useStyles();

  const playlists = data?.items.map((item) => (
    <Paper
      className={cx(classes.link, {
        [classes.linkActive]: item.name === active,
      })}
      key={item?.id}
      onClick={() => {
        setActive(item.name);
        fetchPlaylistItems(item?.id);
      }}
    >
      <Group
        position="left"
        mt="md"
        mb="xs"
      >
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
        <Code sx={{ fontWeight: 700 }}>Your Playlists</Code>
        <Navbar.Section
          grow
          component={ScrollArea}
        >
          <Group
            className={classes.header}
            position="apart"
          ></Group>
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
            onClick={(event) => event.preventDefault()}
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
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
