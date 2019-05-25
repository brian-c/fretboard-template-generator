import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  registrationMark: {
    fill: 'none',
    stroke: 'black',
    strokeWidth: '0.5pt',
  },
});

interface Props {
  size: number;
  unit: string;
}

export default function RegistrationMark({ size, unit }: Props) {
  return (
    <g className={css(styles.registrationMark)}>
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
