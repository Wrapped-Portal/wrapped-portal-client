/** @format */

import { Tabs } from '@mantine/core';
import React from 'react';

import CustomRec from './CustomRec';
import SearchSongs from './SearchSongs';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';
import Sidebar from './Sidebar';
import SearchResults from './SearchResults';

export default function Dashboard() {
  return (
    <main>
      <div className="dashboard">
        <div className="column">
          <Tabs defaultValue="first" color="lime" variant="pills" radius='md'>
            <Tabs.List
              grow
              position="center"
            >
              <Tabs.Tab value="first" icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="white" d="M14 23h8v2h-8zm-4 0h2v2h-2zm4-5h8v2h-8zm-4 0h2v2h-2zm4-5h8v2h-8zm-4 0h2v2h-2z"/><path fill="white" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"/></svg>}>
                <p className="tab__text"> Your Top Listens</p>
              </Tabs.Tab>
              <Tabs.Tab value="second" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 24"><path fill="white" d="M3 9q-.425 0-.713-.288T2 8q0-.425.288-.713T3 7h3q.425 0 .713.288T7 8q0 .425-.288.713T6 9H3Zm0 5q-.425 0-.713-.288T2 13q0-.425.288-.713T3 12h3q.425 0 .713.288T7 13q0 .425-.288.713T6 14H3Zm16.9 4.3l-3.15-3.15q-.6.425-1.313.638T14 16q-2.075 0-3.538-1.463T9 11q0-2.075 1.463-3.538T14 6q2.075 0 3.538 1.463T19 11q0 .725-.213 1.438t-.637 1.312l3.15 3.15q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275ZM14 14q1.25 0 2.125-.875T17 11q0-1.25-.875-2.125T14 8q-1.25 0-2.125.875T11 11q0 1.25.875 2.125T14 14ZM3 19q-.425 0-.713-.288T2 18q0-.425.288-.713T3 17h8q.425 0 .713.288T12 18q0 .425-.288.713T11 19H3Z"/></svg>}>
                <p className="tab__text"> What do you want to listen to?</p>
              </Tabs.Tab>
              <Tabs.Tab value="third" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M9 18h5.5q.425 0 .788-.213t.512-.587l2.1-4.9q.05-.125.075-.25T18 11.8V11q0-.425-.288-.713T17 10h-4.6l.6-3.4q.05-.25-.025-.475t-.25-.4L12 5l-4.6 5q-.2.2-.3.45T7 11v5q0 .825.588 1.413T9 18Zm3 4q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>}>
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
        <Sidebar />
      </div>
    </main>
  );
}
