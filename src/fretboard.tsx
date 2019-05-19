import * as React from 'react';

const FRET_TANG_WIDTH = '0.023in';

export function getFretPosition(
  fret: number,
  scaleLength: number,
  tones: number = 12
): number {
  return scaleLength - scaleLength / (2 ** (fret / tones));
}

export default function({
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  width,
  margin,
  unit
}) {
  const height = getFretPosition(frets, Math.max(firstScaleLength, secondScaleLength)) + margin * 2;
  const scaleDifference = firstScaleLength - secondScaleLength;

  return (
    <svg
      width={`${width}${unit}`}
      height={`${height}${unit}`}
    >
      <line
        x1={`${width / 2}${unit}`}
        y1={0}
        x2={`${width / 2}${unit}`}
        y2={`${height}${unit}`}
        stroke="gray"
        strokeWidth="0.5pt"
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
              cx={`${width / 2}${unit}`}
              cy={`${yMidpoint}${unit}`}
              r='8pt'
              fill="white"
              transform="translate(0, -4)"
            />

            <text
              x={`${width / 2}${unit}`}
              y={`${yMidpoint}${unit}`}
              fontFamily="Helvetica Neue, sans-serif"
              fontWeight="bold"
              fontSize="8pt"
              textAnchor="middle"
              fill="black"
              stroke="none"
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
              x1={0}
              y1={`${y1}${unit}`}
              x2={`${width}${unit}`}
              y2={`${y2}${unit}`}
              stroke="black"
              strokeWidth={FRET_TANG_WIDTH}
              strokeDasharray={f === 0 ? FRET_TANG_WIDTH : null}
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
