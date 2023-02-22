/** @format */

import React from 'react';

import CustomRec from './CustomRec';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <main>
      <div className="dashboard">
        <div className="column">
          <UserTopResults />
        </div>
        <div className="column">
          <CustomRec />
        </div>
        <div className="column"></div>
        <UserPlaylists />
        <div className="column"></div>
        <Sidebar />
      </div>
      
    </main>
  );
}
