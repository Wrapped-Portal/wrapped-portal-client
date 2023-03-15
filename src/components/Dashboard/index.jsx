/** @format */

import { Burger, Group, MediaQuery, Tabs } from '@mantine/core';
import React, { useEffect, useState } from 'react';

import CustomRec from './CustomRec';
import SearchSongs from './SearchSongs';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';
import Sidebar from './Sidebar';
import SearchResults from './SearchResults';
import { setUser } from '../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import Circle from '../icons/Circle';
export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 850) {
        setOpened(true);
      } else {
        setOpened(false);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <MediaQuery
        largerThan={850}
        styles={{ display: 'none' }}
      >
        <Group>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
            ml="xl"
            mt={-69}
          />
          <Circle />
        </Group>
      </MediaQuery>
      <div className="dashboard">
        <div className="column">
          <Tabs
            defaultValue="first"
            color="lime"
            variant="pills"
            radius="md"
          >
            <Tabs.List
              grow
              position="center"
            >
              <Tabs.Tab
                value="first"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tab__text icon icon-tabler icon-tabler-report-analytics"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    ></path>
                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 17v-5"></path>
                    <path d="M12 17v-1"></path>
                    <path d="M15 17v-3"></path>
                  </svg>
                }
              >
                <p className="tab__text"> Your Top Listens</p>
              </Tabs.Tab>
              <Tabs.Tab
                value="second"
                icon={
                  <svg
                    className="tab__text icon icon-tabler icon-tabler-list-search"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    ></path>
                    <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M18.5 18.5l2.5 2.5"></path>
                    <path d="M4 6h16"></path>
                    <path d="M4 12h4"></path>
                    <path d="M4 18h4"></path>
                  </svg>
                }
              >
                <p className="tab__text"> What do you want to listen to?</p>
              </Tabs.Tab>
              <Tabs.Tab
                value="third"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tab__text icon icon-tabler icon-tabler-thumb-up"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      stroke="none"
                      d="M0 0h24v24H0z"
                      fill="none"
                    ></path>
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                  </svg>
                }
              >
                <p className="tab__text">Custom Recommendations</p>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel
              value="first"
              pb="xs"
            >
              <UserTopResults />
            </Tabs.Panel>
            <Tabs.Panel
              value="second"
              pb="xs"
            >
              <SearchSongs />
              <SearchResults />
            </Tabs.Panel>
            <Tabs.Panel
              value="third"
              pb="xs"
            >
              <CustomRec />
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className="playlist_column">
          <UserPlaylists />
        </div>
        {opened && <Sidebar />}
      </div>
    </main>
  );
}
