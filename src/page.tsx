import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { PIXELS_PER_INCH, PIXELS_PER_MM } from './constants';

const styles = StyleSheet.create({
  page: {
    background: 'white',
    border: '0',
    borderRadius: '3px',
    boxShadow: '0 1em 2em -1em #0006',
  },
});

interface Props {
  width: number;
  height: number;
  margin: number;
  unit: string;
  style: Object;
  children: React.ReactFragment;
}

export default function Page({ width, height, margin, unit, style, children }: Props) {
  const ppu = { in: PIXELS_PER_INCH, mm: PIXELS_PER_MM }[unit];

  return (
    <svg
      className={css(styles.page)}
      viewBox={`${-1 * margin * ppu} ${-1 * margin * ppu} ${width * ppu} ${height * ppu}`}
      {...style}
    >
      {children}
    </svg>
  );
}
