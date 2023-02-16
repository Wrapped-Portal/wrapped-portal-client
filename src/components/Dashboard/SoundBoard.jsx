/** @format */

import React from 'react';
import Knob from '../Knob';

export default function SoundBoard() {
  return (
    <div className="sound-board">
      <Knob
        label="Dancability"
        bgColor={50}
        fieldName="dance"
      />
      <Knob
        label="Energy"
        bgColor={150}
        fieldName="energy"
      />
      <Knob
        label="Loudness"
        bgColor={250}
        fieldName="loud"
      />
      <Knob
        label="Vibe"
        bgColor={350}
        fieldName="vibe"
      />
      <Knob
        label="Tempo"
        bgColor={100}
        fieldName="tempo"
      />
      <Knob
        label="Popularity"
        bgColor={200}
        fieldName="popular"
      />
      <Knob
        label="Instrumental"
        bgColor={300}
        fieldName="instrumental"
      />
    </div>
  );
}
