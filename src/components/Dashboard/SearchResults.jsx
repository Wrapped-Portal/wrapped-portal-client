/** @format */

import React from 'react';
import { useSelector } from 'react-redux';

export default function SearchResults() {
  const { tracks, artists, albums } = useSelector(
    (state) => state.searchSlice.results,
  );

  return (
    <div>
      {tracks && <h3>Tracks</h3>}
      <ul>
        {tracks?.tracks.items.map((item) => (
          <li key={crypto.randomUUID()}>
            {item.name} -{' '}
            {item?.artists.map((item, index) =>
              index === 0 ? item.name : ', ' + item.name,
            )}
          </li>
        ))}
      </ul>
      {artists && <h3>Artists</h3>}
      <ul>
        {artists?.artists.items.map((item) => (
          <li key={crypto.randomUUID()}>{item.name}</li>
        ))}
      </ul>
      {albums && <h3>Albums</h3>}
      <ul>
        {albums?.albums.items.map((item) => (
          <li key={crypto.randomUUID()}>
            {item.name} - {item?.artists.map((item) => item.name + ' ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
