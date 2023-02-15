/** @format */

import React from 'react';

import CustomRec from './CustomRec';
import SoundBoard from './SoundBoard';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';


export default function Dashboard() {
  return (
    <>
      <main>
        <SoundBoard />
        <div className="dashboard">
          <div className="column">
            <UserTopResults></UserTopResults>
          </div>
          <div className="column">
            <CustomRec></CustomRec>
          </div>
          <div className="column"></div>
        <UserPlaylists></UserPlaylists>
        </div>
      </main>
    </>
  );
}
