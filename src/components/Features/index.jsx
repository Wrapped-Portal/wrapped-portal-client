import React from 'react'
import { useSelector } from 'react-redux';
import { CChart } from '@coreui/react-chartjs';
import { Group } from '@mantine/core';

export default function Features() {
  const { audioFeatures } = useSelector((state) => state.audioFeaturesSlice);

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

  return (
    <>
      <Group>
        <p className='features__text'>{`Duration: ${duration_formatted}`}</p>
        <p className='features__text'>{`Time Signature: ${audioFeatures?.time_signature}/4`}</p>
        <p className='features__text'>{`Key: ${keyName}`}</p>
        <p className='features__text'>{`Bpm: ${Math.round(audioFeatures?.tempo)}`}</p>
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
          labels: ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence', 'Loudness'],
          datasets: [
            {
              label: 'Feature Rating',
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(128, 128, 128, 0.7)',
              ],
              data: [
                audioFeatures?.acousticness * 100,
                audioFeatures?.danceability * 100,
                audioFeatures?.energy * 100,
                audioFeatures?.instrumentalness * 100,
                audioFeatures?.liveness * 100,
                audioFeatures?.speechiness * 100,
                audioFeatures?.valence * 100,
                loudnessScaled.toFixed(2),
              ],
            },
          ],
        }}
      />
    </>
  )
}
