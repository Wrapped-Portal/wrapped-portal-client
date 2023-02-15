/** @format */

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFieldValue } from '../../store/reducers/soundBoardSlice';
import { getDeg, convertRange, renderTicks } from './helpers';

export default function Knob({ fieldName, bgColor }) {
  const [deg, setDeg] = useState(0);
  const fullAngle = 260;
  const startAngle = (360 - fullAngle) / 2;
  const endAngle = startAngle + fullAngle;
  const size = 100;
  const margin = size * 0.15;
  const currentDeg = deg;
  const numTicks = 25;
  const color = true;
  const knobRef = useRef(null);
  const dispatch = useDispatch();
  const handleKnobChange = (value) => {
    dispatch(setFieldValue({ field: fieldName, value: value }));
  };

  const startDrag = (e) => {
    e.preventDefault();
    const knob = knobRef.current.getBoundingClientRect();
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

  const handleKeyDown = (e) => {
    e.preventDefault();
    let newDeg;
    let newValue;
    switch (e.key) {
      case 'ArrowUp':
        newDeg = currentDeg + 5;
        if (newDeg > endAngle) newDeg = endAngle;
        newValue = Math.floor(
          convertRange(startAngle, endAngle, 1, 100, newDeg),
        );
        setDeg(newDeg);
        handleKnobChange(newValue);
        break;
      case 'ArrowDown':
        newDeg = currentDeg - 5;
        if (newDeg < startAngle) newDeg = startAngle;
        newValue = Math.floor(
          convertRange(startAngle, endAngle, 1, 100, newDeg),
        );
        setDeg(newDeg);
        handleKnobChange(newValue);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="knob"
      style={{ width: size, height: size }}
      role="slider"
      tabIndex="0"
      aria-valuemin="1"
      aria-valuemax="100"
      aria-valuenow={Math.floor(
        convertRange(startAngle, endAngle, 1, 100, currentDeg),
      )}
      onKeyDown={handleKeyDown}
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
            ? `radial-gradient(100% 70%,hsl(${bgColor}, ${currentDeg}%, ${
                currentDeg / 5
              }%),hsl(${Math.random() * 100},20%,${currentDeg / 36}%))`
            : null,
        }}
        ref={knobRef}
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
