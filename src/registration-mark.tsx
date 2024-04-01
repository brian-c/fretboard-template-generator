import * as React from 'react';

// Keep styles inline so saving as SVG works.
const styles = {
  registrationMark: {
    fill: 'none',
    stroke: 'black',
    strokeWidth: '0.5pt',
  },
};

interface Props {
  size: number;
  unit: string;
}

export default function RegistrationMark({ size, unit }: Props) {
  return (
    <g {...styles.registrationMark}>
      {Array(5).fill(null).map((n, i, a) => (
        <circle
          key={i}
          cx={`${size / 2}${unit}`}
          cy={`${size / 2}${unit}`}
          r={`${(size - size / a.length * i) / 2.1}${unit}`}
        />
      ))}

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

      <line
        x1={`${size / 2}${unit}`}
        y1={0}
        x2={`${size / 2}${unit}`}
        y2={`${size}${unit}`}
      />

      <line
        x1={0}
        y1={`${size / 2}${unit}`}
        x2={`${size}${unit}`}
        y2={`${size / 2}${unit}`}
      />
    </g>
  );
}
