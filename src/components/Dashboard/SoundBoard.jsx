/** @format */

import React from 'react';
import Knob from '../Knob';

export default function SoundBoard() {
  return (
    <div className="sound-board">
      <div className="knob_border">
        <Knob

          description="Danceability: This knob adjusts how suitable the music is for dancing, with higher values making the music more danceable."
          label="Danceability"
          bgColor={50}
          fieldName="dance"
        />
      </div>
      <div  >
        <Knob

          description="Energy: This knob adjusts how energetic the music is, with higher values making the music more energetic and lively."
          label="Energy"
          bgColor={50}
          fieldName="energy"
        />
      </div>
      <div  className="knob_border">
        <Knob

          description="Loudness: This knob adjusts the overall volume of the music, with higher values making the music louder."
          label="Loudness"
          bgColor={50}
          fieldName="loud"
        />
      </div>
      <div  className="knob_border">
        <Knob

          description="Vibe: This knob adjusts the overall mood or atmosphere of the music, with higher values creating a more positive or upbeat vibe."
          label="Vibe"
          bgColor={150}
          fieldName="vibe"
        />
      </div>
      <div  >
        <Knob

          description="Tempo: This knob adjusts the speed or pace of the music, with higher values making the music faster."
          label="Tempo"
          bgColor={150}
          fieldName="tempo"
        />
      </div >
      <div  className="knob_border">
        <Knob

          description="Popularity: This knob adjusts how well-known or popular the music is, with higher values favoring more popular music."
          label="Popularity"
          bgColor={150}
          fieldName="popular"
        />
      </div>
      <div  className="knob_border">
        <Knob

          description="Instrumentalness: This knob adjusts the amount of instrumentation in the music, with higher values favoring instrumental music over vocal music."
          label="Instrumental"
          bgColor={300}
          fieldName="instrumental"
        />
      </div>
      <div >
        <Knob

          description="Liveness: This knob adjusts the degree to which the music was performed live, with higher values favoring music that was recorded live in front of an audience."
          label="Liveness"
          bgColor={300}
          fieldName="live"
        />
      </div>
      <div  className="knob_border">
        <Knob

          description="Acousticness: This knob adjusts the amount of acoustic instruments in the music, with higher values favoring acoustic instruments over electronic ones."
          label="Acousticness"
          bgColor={300}
          fieldName="acoustic"
        />
      </div>
    </div>
  );
}
