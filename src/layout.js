import React from 'react';
import Fretboard, { getFretPosition } from './fretboard';
import RegistrationMark from './registration-mark';

function getColumnsCount(availableHeight, contentHeight, overlap) {
  const columnsForContent = Math.ceil(contentHeight / availableHeight);
  const addedOverlap = overlap * (columnsForContent - 1);
  const leftoverSpace = availableHeight - contentHeight % availableHeight;
  if (addedOverlap > leftoverSpace) {
    return columnsForContent + 1;
  } else {
    return columnsForContent;
  }
}

export default function({
  id,
  width,
  height,
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  overlap,
  unit
}) {
  const fretboardHeight = getFretPosition(frets, Math.max(firstScaleLength, secondScaleLength)) + overlap * 2;

  const columnsCount = getColumnsCount(height, fretboardHeight, overlap);

  const columnWidth = width / columnsCount;

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={`${width}${unit}`}
      height={`${height}${unit}`}
    >
      <defs>
        <symbol id="layout__fretboard">
          <Fretboard
            width={columnWidth}
            frets={frets}
            firstScaleLength={firstScaleLength}
            secondScaleLength={secondScaleLength}
            perpendicularAt={perpendicularAt}
            margin={overlap}
            unit={unit}
          />
        </symbol>

        <symbol id="layout__registration-mark">
          <RegistrationMark
            size={overlap}
            unit={unit}
          />
        </symbol>
      </defs>

      {Array(columnsCount).fill(null).map((_, c) => {
        const x = columnWidth * c;

        return (
          <React.Fragment key={c}>
            <svg
              x={`${x}${unit}`}
              y={0}
              width={`${columnWidth}${unit}`}
              height={`${height}${unit}`}
            >
              <rect
                x={0}
                y={0}
                width={`${columnWidth}${unit}`}
                height={`${height}${unit}`}
                fill="none"
                stroke="black"
                strokeWidth="0.5pt"
              />

              <use
                xlinkHref="#layout__fretboard"
                x={0}
                y={`${(height - overlap) * -1 * c}${unit}`}
                width={`${columnWidth}${unit}`}
                height={`${fretboardHeight}${unit}`}
              />

              {c !== 0 && (
                <React.Fragment>
                  <use
                    xlinkHref="#layout__registration-mark"
                    x={0}
                    y={0}
                  />

                  <use
                    xlinkHref="#layout__registration-mark"
                    x={`${columnWidth - overlap}${unit}`}
                    y={0}
                  />
                </React.Fragment>
              )}

              {c !== columnsCount - 1 && (
                <React.Fragment>
                  <use
                    xlinkHref="#layout__registration-mark"
                    x={0}
                    y={`${height - overlap}${unit}`}
                  />

                  <use
                    xlinkHref="#layout__registration-mark"
                    x={`${columnWidth - overlap}${unit}`}
                    y={`${height - overlap}${unit}`}
                  />
                </React.Fragment>
              )}
            </svg>
          </React.Fragment>
        );
      })}
    </svg>
  );
}
