import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

const FRET_TANG_WIDTH = '0.023in';

const styles = StyleSheet.create({
  centerLine: {
    stroke: 'gray',
    strokeWidth: '0.5pt',
  },

  fretLabelBackground: {
    fill: 'white',
  },

  fretLabel: {
    fill: 'black',
    fontFamily: 'Helvetica Neue, sans-serif',
    fontWeight: 'bold',
    fontSize: '8pt',
    stroke: 'none',
    textAnchor: 'middle',
  },

  fretLine: {
    stroke: 'black',
    strokeWidth: FRET_TANG_WIDTH,
  },

  nut: {
    strokeDasharray: FRET_TANG_WIDTH,
  },
});

export function getFretPosition(
  fret: number,
  scaleLength: number,
  tones: number = 12
): number {
  return scaleLength - scaleLength / (2 ** (fret / tones));
}

export default function Fretboard({
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  width,
  margin,
  unit,
} : {
  frets: number;
  firstScaleLength: number;
  secondScaleLength: number;
  perpendicularAt: number;
  width: number;
  margin: number;
  unit: string;
} & SVGElement): React.ReactElement {
  const height = getFretPosition(frets, Math.max(firstScaleLength, secondScaleLength)) + margin * 2;
  const scaleDifference = firstScaleLength - secondScaleLength;

  return (
    <svg
      width={`${width}${unit}`}
      height={`${height}${unit}`}
    >
      <line
        className={css(styles.centerLine)}
        x1={`${width / 2}${unit}`}
        y1={0}
        x2={`${width / 2}${unit}`}
        y2={`${height}${unit}`}
      />

      {Array(frets + 1).fill(null).map((_, f) => {
        let y1 = margin + getFretPosition(f, firstScaleLength);
        let y2 = margin + getFretPosition(f, secondScaleLength);

        const makePerpendicular = Math.abs(scaleDifference) * perpendicularAt;
        if (scaleDifference < 0) {
          y1 += makePerpendicular;
        } else {
          y2 += makePerpendicular;
        }

        const yMidpoint = (y1 + y2) / 2;

        return (
          <React.Fragment key={f}>
            <circle
              className={css(styles.fretLabelBackground)}
              cx={`${width / 2}${unit}`}
              cy={`${yMidpoint}${unit}`}
              transform="translate(0, -4)"
              r='8pt'
            />

            <text
              className={css(styles.fretLabel)}
              x={`${width / 2}${unit}`}
              y={`${yMidpoint}${unit}`}
              transform="translate(0, -3)"
            >
              {f === 0 ? (
                firstScaleLength === secondScaleLength ? (
                  `${firstScaleLength}${unit}`
                ) : (
                  `${firstScaleLength}-${secondScaleLength}${unit}`
                )
              ) : (
                `${f}`
              )}
            </text>

            <line
              className={css(styles.fretLine, f === 0 && styles.nut)}
              x1={0}
              y1={`${y1}${unit}`}
              x2={`${width}${unit}`}
              y2={`${y2}${unit}`}
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
