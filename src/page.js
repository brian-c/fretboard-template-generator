import React from 'react';

const PIXELS_PER = {
  in: 96,
  mm: 96 / 25.4,
}

export default function({ width, height, margin, unit, style, children}) {
  const ppu = PIXELS_PER[unit];

  return (
    <svg
      viewBox={`${-1 * margin * ppu} ${-1 * margin * ppu} ${width * ppu} ${height * ppu}`}
      style={{
        ...style,
        background: 'white',
        border: '1px solid gray',
        boxShadow: '0 0.5em 1em -0.5em #0006',
      }}
    >
        {children}
    </svg>
  );
}
