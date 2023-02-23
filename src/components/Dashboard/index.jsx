/** @format */

import { Tabs } from '@mantine/core';
import React from 'react';

import CustomRec from './CustomRec';
import SearchSongs from './SearchSongs';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <main>
      <div className="dashboard">
        <div className="column">
          <Tabs defaultValue="first">
            <Tabs.List
              grow
              position="center"
            >
              <Tabs.Tab value="first">
                <p className="tab__text"> Your Top Listens</p>
              </Tabs.Tab>
              <Tabs.Tab value="second">
                <p className="tab__text"> What do you want to listen to?</p>
              </Tabs.Tab>
              <Tabs.Tab value="third">
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
            </Tabs.Panel>
            <Tabs.Panel
              value="third"
              pb="xs"
            >
              <CustomRec />
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className="column"></div>
        <div className="column"></div>
        <UserPlaylists />
        <Sidebar />
      </div>
      
    </main>
  );
}
