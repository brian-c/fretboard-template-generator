import React from 'react';

export default function({ size, unit }) {
  return (
    <g
      fill="none"
      stroke="black"
      strokeWidth="0.5pt"
      strokeDasharray="0"
    >
      <circle
        cx={`${size / 2}${unit}`}
        cy={`${size / 2}${unit}`}
        r={`${size / 3}${unit}`}
      />

      <line
        x1="0"
        y1="0"
        x2={`${size}${unit}`}
        y2={`${size}${unit}`}
      />

      <line
        x1="0"
        y1={`${size}${unit}`}
        x2={`${size}${unit}`}
        y2="0"
      />
    </g>
  );
}
