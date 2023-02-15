/** @format */

export function getDeg(clientX, clientY, pts, startAngle, endAngle) {
  const x = clientX - pts.x;
  const y = clientY - pts.y;
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }
  let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
  return finalDeg;
}

export function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}

export function renderTicks(
  fullAngle,
  numTicks,
  size,
  margin,
  startAngle,
  endAngle,
) {
  let ticks = [];
  const incr = fullAngle / numTicks;
  const size2 = size / 2;
  for (let deg = startAngle; deg <= endAngle; deg += incr) {
    const tickMargin = margin + size2;
    const tick = {
      deg: deg,
      tickStyle: {
        height: tickMargin + 10,
        left: tickMargin - 1,
        top: tickMargin + 2,
        transform: `rotate(${deg}deg)`,
        transformOrigin: 'top',
      },
    };
    ticks.push(tick);
  }
  return ticks;
}
