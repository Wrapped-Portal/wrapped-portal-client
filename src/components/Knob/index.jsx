/** @format */

import React, { useState } from 'react';
import { getDeg, convertRange, renderTicks } from './helpers';

export default function Knob() {
  const [deg, setDeg] = useState(0);
  const fullAngle = 260;
  const startAngle = (360 - fullAngle) / 2;
  const endAngle = startAngle + fullAngle;
  const size = 100;
  const margin = size * 0.15;
  const currentDeg = deg;
  const numTicks = 25;
  const color = true;

  const handleKnobChange = (value) => {
    console.log(value);
  };

  const startDrag = (e) => {
    e.preventDefault();
    const knob = e.target.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };
    const moveHandler = (e) => {
      let newDeg = getDeg(e.clientX, e.clientY, pts, startAngle, endAngle);
      if (newDeg === startAngle) newDeg--;
      let newValue = Math.floor(
        convertRange(startAngle, endAngle, 1, 100, newDeg),
      );
      setDeg(newDeg);
      handleKnobChange(newValue);
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', (e) => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  return (
    <div
      className="knob"
      style={{ width: size, height: size }}
    >
      <div className="ticks">
        {numTicks
          ? renderTicks(
              fullAngle,
              numTicks,
              size,
              margin,
              startAngle,
              endAngle,
            ).map((tick, i) => (
              <div
                key={i}
                className={'tick' + (tick.deg <= currentDeg ? ' active' : '')}
                style={tick.tickStyle}
              />
            ))
          : null}
      </div>
      <div
        className="knob outer"
        style={{
          width: size,
          height: size,
          margin: margin,
          backgroundImage: color
            ? `radial-gradient(100% 70%,hsl(210, ${currentDeg}%, ${
                currentDeg / 5
              }%),hsl(${Math.random() * 100},20%,${currentDeg / 36}%))`
            : null,
        }}
        onMouseDown={startDrag}
      >
        <div
          className="knob inner"
          style={{
            width: size,
            height: size,
            transform: `rotate(${currentDeg}deg)`,
          }}
        >
          <div className="grip" />
        </div>
      </div>
    </div>
  );
}
