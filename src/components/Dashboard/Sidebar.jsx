/** @format */

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { createStyles, Navbar, Group, Paper, Code, Stack, ScrollArea } from '@mantine/core';
import { setPlaylistItems, selectPlaylist } from '../../store/reducers/playlistSlice';

const useStyles = createStyles((theme, _params) => {

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  };
});

export default function Sidebar() {

  const [data, setData] = useState(null);
  const [active, setActive] = useState('');
  const { token } = useSelector((state) => state.login);
  const { selectedTrack, selectedPlaylist } = useSelector(state => state.playlistSlice,
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
  

  const { classes, cx } = useStyles();

  const playlists = data?.items.map((item) => (
    <Paper
      className={cx(classes.link, { [classes.linkActive]: item.name === active })}
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
          <p className="playlist_text_tracks">
            Tracks: {item?.tracks.total}
          </p>
        </Stack>
      </Group>
    </Paper>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section grow component={ScrollArea}>
        <Group className={classes.header} position="apart">
          <Code sx={{ fontWeight: 700 }}>Your Playlists</Code>
        </Group>
        {playlists}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
