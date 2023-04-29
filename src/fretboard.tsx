import * as React from 'react';
import { FRET_TANG_WIDTH } from './constants';
import formatInches from './format-inches';

// NOTE: Keep styles inline so saving as SVG works.
const styles = {
  centerLine: {
    stroke: 'gray',
    strokeWidth: '0.5pt',
  },

  fretLabelBackground: {
    fill: 'white',
    r: '8pt',
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
  unit: string;
}

export default function Fretboard({
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  width,
  unit,
}: Props) {
  const height = getFretPosition(frets + 0.5, Math.max(firstScaleLength, secondScaleLength));
  const scaleDifference = firstScaleLength - secondScaleLength;

  const formattedFirstLength = unit === 'in' ? formatInches(firstScaleLength) : firstScaleLength;
  const formattedSecondLength = unit === 'in' ? formatInches(secondScaleLength) : secondScaleLength;
  const scaleDescription = firstScaleLength === secondScaleLength
    ? `${formattedFirstLength} ${unit}`
    : `${formattedFirstLength}–${formattedSecondLength} ${unit}`;

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

      <circle
        {...styles.fretLabelBackground}
        cx={`${width / 2}${unit}`}
        cy={`${getFretPosition(0.5, (firstScaleLength + secondScaleLength) / 2)}${unit}`}
        transform="translate(0, -4)"
      />

      <text
        {...styles.fretLabel}
        x={`${width / 2}${unit}`}
        y={`${getFretPosition(0.5, (firstScaleLength + secondScaleLength) / 2)}${unit}`}
        transform="translate(0, -3)"
      >
        {scaleDescription}
      </text>


      {Array(frets + 1).fill(null).map((_, f) => {
        if (f === 0) return null;

        let y1 = getFretPosition(f, firstScaleLength);
        let y2 = getFretPosition(f, secondScaleLength);

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
            />

            <line
              {...styles.fretLine}
              x1={0}
              y1={`${y1}${unit}`}
              x2={`${width}${unit}`}
              y2={`${y2}${unit}`}
            />

            <circle
              {...styles.fretLabelBackground}
              cx={`${width / 2}${unit}`}
              cy={`${(y1 + y2) / 2}${unit}`}
              r={`${parseFloat(FRET_TANG_WIDTH) / 2}${FRET_TANG_WIDTH.match(/[A-z]+/)[0]}`}
            />


            <text
              {...styles.fretLabel}
              x={`${width / 2}${unit}`}
              y={`${yMidpoint}${unit}`}
              transform="translate(0, -3)"
            >
              {f !== 0 && (
                `${f}`
              )}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}
