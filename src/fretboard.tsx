import * as React from 'react';
import { FRET_TANG_WIDTH } from './constants';

// NOTE: Keep styles inline so saving as SVG works.
const styles = {
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
};

export function getFretPosition(
  fret: number,
  scaleLength: number,
  tones: number = 12
): number {
  // https://en.wikipedia.org/wiki/Equal_temperament
  return scaleLength - scaleLength / (2 ** (fret / tones));
}

interface Props {
  frets: number;
  firstScaleLength: number;
  secondScaleLength: number;
  perpendicularAt: number;
  width: number;
  margin: number;
  unit: string;
}

export default function Fretboard({
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  width,
  margin,
  unit,
}: Props) {
  const height = getFretPosition(frets, Math.max(firstScaleLength, secondScaleLength)) + margin * 2;
  const scaleDifference = firstScaleLength - secondScaleLength;

  return (
    <svg
      width={`${width}${unit}`}
      height={`${height}${unit}`}
    >
      <line
        {...styles.centerLine}
        x1={`${width / 2}${unit}`}
        y1={0}
        x2={`${width / 2}${unit}`}
        y2={`${height}${unit}`}
      />

      {Array(frets + 1).fill(null).map((_, f) => {
        let y1 = margin + getFretPosition(f, firstScaleLength);
        let y2 = margin + getFretPosition(f, secondScaleLength);

        // TODO: Make this a specific fret number.
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
              {...styles.fretLabelBackground}
              cx={`${width / 2}${unit}`}
              cy={`${yMidpoint}${unit}`}
              transform="translate(0, -4)"
              r='8pt'
            />

            <text
              {...styles.fretLabel}
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
              {...styles.fretLine}
              {...(f === 0 ? styles.nut : {})}
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
