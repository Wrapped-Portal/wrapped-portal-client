import React from 'react'
import { useSelector } from 'react-redux';
import { CChart } from '@coreui/react-chartjs';
import { Group } from '@mantine/core';

export default function Features() {
  const { audioFeatures, audioArtist } = useSelector((state) => state.audioFeaturesSlice);

  function msToMinSec(duration_ms) {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }

  const duration_ms = audioFeatures?.duration_ms;
  const duration_formatted = msToMinSec(duration_ms);

  const musicalKeys = [
    "No key",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B",
  ];

  const keyIndex = audioFeatures?.key;
  let keyName;
  if (keyIndex === -1) {
    keyName = musicalKeys[0];
  } else {
    keyName = musicalKeys[keyIndex + 1] + (audioFeatures?.mode === 1 ? " Major" : " Minor");
  }

  const loudness = audioFeatures?.loudness;
  const loudnessScaled = (loudness + 60) / 60 * 100;

  const dateString = audioArtist?.album?.release_date;
const parts = dateString?.split('-');
const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

  return (
    <>
      <Group>
        <p className='features__text'>{`Released: ${formattedDate}`} </p>
        <p className='features__text'>{`Duration: ${duration_formatted}`}</p>
        <p className='features__text'>{`Time Signature: ${audioFeatures?.time_signature}/4`}</p>
        <p className='features__text'>{`Key: ${keyName}`}</p>
        <p className='features__text'>{`BPM: ${Math.round(audioFeatures?.tempo)}`}</p>
      </Group>
      <CChart
        type="bar"
        options={{
          scales: {
            y: {
              max: 100,
              min: 0,
              ticks: {
                stepSize: 10,
              },
            },
          },
        }}
        data={{
          labels: [
            'Acousticness',
            'Danceability',
            'Energy',
            'Liveness',
            'Speechiness',
            'Vibe',
            'Loudness',
            'Popularity',
            'Instrumentalness',
          ],
          datasets: [
            {
              label: 'Feature Rating',
              backgroundColor: [
                'rgba(0, 128, 255, 0.7)',   // Blue
                'rgba(0, 204, 102, 0.7)',   // Green
                'rgba(255, 51, 51, 0.7)',   // Red
                'rgba(51, 204, 204, 0.7)',  // Cyan
                'rgba(255, 204, 0, 0.7)',   // Yellow
                'rgba(254, 0, 204, 0.7)',   // Magenta
                'rgba(255, 128, 0, 0.7)',   // Orange
                'rgba(0, 176, 150, 0.7)',    // Teal
                'rgba(153, 51, 255, 0.7)',  // Purple
              ],
              data: [
                audioFeatures?.acousticness * 100,
                audioFeatures?.danceability * 100,
                audioFeatures?.energy * 100,
                audioFeatures?.liveness * 100,
                audioFeatures?.speechiness * 100,
                audioFeatures?.valence * 100,
                loudnessScaled.toFixed(2),
                audioArtist?.popularity,
                audioFeatures?.instrumentalness * 100,
              ],
            },
          ],
        }}
      />
    </>
  )
}
