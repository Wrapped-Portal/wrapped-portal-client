/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import Knob from '../Knob';

export default function SoundBoard() {
  const { dance, energy, loud, vibe, tempo, popular, instrumental } =
    useSelector((state) => state.soundBoardSlice);
  console.log(dance, energy, loud, vibe, tempo, popular, instrumental);
  return (
    <div className="sound-board">
      <Knob
        bgColor={50}
        fieldName="dance"
      />
      <Knob
        bgColor={150}
        fieldName="energy"
      />
      <Knob
        bgColor={250}
        fieldName="loud"
      />
      <Knob
        bgColor={350}
        fieldName="vibe"
      />
      <Knob
        bgColor={100}
        fieldName="tempo"
      />
      <Knob
        bgColor={200}
        fieldName="popular"
      />
      <Knob
        bgColor={300}
        fieldName="instrumental"
      />
    </div>
  );
}
