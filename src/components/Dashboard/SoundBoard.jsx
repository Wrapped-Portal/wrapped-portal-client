/** @format */

import React from 'react';
import Knob from '../Knob';

export default function SoundBoard() {
  return (
    <div className="sound-board">
      <Knob
        description="Generic text that describes what is happening"
        label="Danceability"
        bgColor={50}
        fieldName="dance"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Energy"
        bgColor={50}
        fieldName="energy"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Loudness"
        bgColor={50}
        fieldName="loud"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Vibe"
        bgColor={150}
        fieldName="vibe"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Tempo"
        bgColor={150}
        fieldName="tempo"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Popularity"
        bgColor={150}
        fieldName="popular"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Instrumental"
        bgColor={300}
        fieldName="instrumental"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Liveness"
        bgColor={300}
        fieldName="live"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Acousticness"
        bgColor={300}
        fieldName="acoustic"
      />
    </div>
  );
}
