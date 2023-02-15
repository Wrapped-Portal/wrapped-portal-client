/** @format */

import React from 'react';
import CustomRec from './CustomRec';
import UserPlaylists from './UserPlaylists';
import UserTopResults from './UserTopResults';



export default function Dashboard() {


  return (
    <>
      <main>
    <div className='dashboard'>
      <div className='column'>
      <UserTopResults></UserTopResults>
      </div>
      <div className='column'>
      <CustomRec></CustomRec>
      </div>
      <div className='column'>
        <UserPlaylists></UserPlaylists>
        </div>
      </div>
      </main>
    </>
  );
}
