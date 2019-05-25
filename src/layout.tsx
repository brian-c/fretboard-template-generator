import * as React from 'react';
import Fretboard, { getFretPosition } from './fretboard';
import RegistrationMark from './registration-mark';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  columnRect: {
    fill: 'none',
    stroke: 'black',
    strokeWidth: '0.5pt',
  },
});

function getColumnsCount(
  availableHeight: number,
  contentHeight: number,
  overlap: number
): number {
  const columnsForContent = Math.ceil(contentHeight / availableHeight);
  const addedOverlap = overlap * (columnsForContent - 1);
  const leftoverSpace = availableHeight - contentHeight % availableHeight;
  if (addedOverlap > leftoverSpace) {
    return columnsForContent + 1;
  } else {
    return columnsForContent;
  }
}

interface Props {
  id: string;
  width: number;
  height: number;
  frets: number;
  firstScaleLength: number;
  secondScaleLength: number;
  perpendicularAt: number;
  overlap: number;
  unit: string;
}

export default function Layout({
  id,
  width,
  height,
  frets,
  firstScaleLength,
  secondScaleLength,
  perpendicularAt,
  overlap,
  unit,
}: Props) {
  const fretboardHeight: number = getFretPosition(frets, Math.max(firstScaleLength, secondScaleLength)) + overlap * 2;
  const columnsCount: number = getColumnsCount(height, fretboardHeight, overlap);
  const columnWidth: number = width / columnsCount;

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

      {columnsCount < 1 || columnsCount > 10 ? (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
        >
          Invalid input
        </text>
      ) : Array(columnsCount).fill(null).map((_, c) => {
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
                className={css(styles.columnRect)}
                x={0}
                y={0}
                width={`${columnWidth}${unit}`}
                height={`${height}${unit}`}
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
