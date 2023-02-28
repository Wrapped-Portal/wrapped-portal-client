/** @format */

import React from 'react';
import Knob from '../Knob';

export default function SoundBoard() {
  return (
    <div className="sound-board">
      <Knob
        description="Generic text that describes what is happening"
        label="Dancability"
        bgColor={50}
        fieldName="dance"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Energy"
        bgColor={150}
        fieldName="energy"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Loudness"
        bgColor={250}
        fieldName="loud"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Vibe"
        bgColor={350}
        fieldName="vibe"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Tempo"
        bgColor={100}
        fieldName="tempo"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Popularity"
        bgColor={200}
        fieldName="popular"
      />
      <Knob
        description="Generic text that describes what is happening"
        label="Instrumental"
        bgColor={300}
        fieldName="instrumental"
      />
    </div>
  );
}
