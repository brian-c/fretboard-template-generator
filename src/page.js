import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const PIXELS_PER = {
  in: 96,
  mm: 96 / 25.4,
}

const styles = StyleSheet.create({
  page: {
    background: 'white',
    border: '1px solid gray',
    boxShadow: '0 0.5em 1em -0.5em #0006',
  },
});

export default function Page({
  width,
  height,
  margin,
  unit,
  ...props
}) {
  const ppu = PIXELS_PER[unit];

  return (
    <svg
      className={css(styles.page)}
      viewBox={`${-1 * margin * ppu} ${-1 * margin * ppu} ${width * ppu} ${height * ppu}`}
      {...props.style}
    >
        {props.children}
    </svg>
  );
}
