import * as React from 'react';
import SvgSaveButton from './svg-save-button';
import { scaleLengthPresets } from './presets';
import { StyleSheet, css } from 'aphrodite';
import { MM_PER_INCH } from './constants';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },

  leadingCell: {
    fontWeight: 'normal',
    textAlign: 'end',
  },

  trailingCell: {
    textAlign: 'start',
  },

  textInput: {
    width: '7ch',
  },

  textInputWithMenu: {
    width: '6ch',
  },

  presetsMenu: {
    width: '2.3ch',
  },
});

function stringifyNumber(number: number): string {
  return parseFloat(number.toFixed(3)).toString();
}

interface Props {
  firstScaleLength: string;
  multiscale: boolean;
  secondScaleLength: string;
  perpendicularAt: string;
  frets: string;
  pageWidth: string;
  pageHeight: string;
  pageMargin: string;
  metric: boolean;
  layoutSvgId: string;
  onChange: Function;
}

export default function Inputs({
  firstScaleLength,
  multiscale,
  secondScaleLength,
  perpendicularAt,
  frets,
  pageWidth,
  pageHeight,
  pageMargin,
  metric,
  layoutSvgId,
  onChange,
}: Props) {
  function setMetric(value: boolean): void {
    const multiplier: number = value ? MM_PER_INCH : 1 / MM_PER_INCH;

    onChange({
      firstScaleLength: stringifyNumber(parseFloat(firstScaleLength) * multiplier),
      secondScaleLength: stringifyNumber(parseFloat(secondScaleLength) * multiplier),
      pageWidth: stringifyNumber(parseFloat(pageWidth) * multiplier),
      pageHeight: stringifyNumber(parseFloat(pageHeight) * multiplier),
      pageMargin: stringifyNumber(parseFloat(pageMargin) * multiplier),
      metric: value,
    });
  }

  function handleMiscChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const valueProperty: string = event.currentTarget.type === 'checkbox' ? 'checked' : 'value';
    onChange({
      [event.currentTarget.name]: event.currentTarget[valueProperty],
    });
  }

  function handleMetricChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setMetric(event.currentTarget.checked);
  }

  function handleTemplateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: number = parseFloat(event.currentTarget.value);
    onChange({
      firstScaleLength: stringifyNumber(metric ? value * MM_PER_INCH : value),
      multiscale: false,
    });
  }

  return (
    <div className={css(styles.container)}>
      <header>
        <strong>Fretboard template generator</strong>
      </header>

      <hr />

      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th className={css(styles.leadingCell)}>Scale length</th>
            <td className={css(styles.trailingCell)}>
              <input
                type="number"
                className={css(styles.textInput, styles.textInputWithMenu)}
                name="firstScaleLength"
                value={firstScaleLength}
                step={metric ? 1 : 1/8}
                onChange={handleMiscChange}
              />

              <select
                className={css(styles.presetsMenu)}
                aria-label="Presets"
                value=""
                onChange={handleTemplateSelection}
              >
                <option
                  value=""
                  disabled
                >Presets</option>

                {Array.from(scaleLengthPresets.entries()).map(([name, value]) => (
                  <option
                    key={name}
                    value={value}
                  >
                    {name}
                  </option>
              ))}
              </select>
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>
              <input
                type="checkbox"
                id="multiscale-checkbox"
                name="multiscale"
                checked={multiscale}
                onChange={handleMiscChange}
              />
            </th>
            <td className={css(styles.trailingCell)}>
              <label htmlFor="multiscale-checkbox">Multiscale</label>
            </td>
          </tr>

          {multiscale && (
            <React.Fragment>
              <tr>
                <th className={css(styles.leadingCell)}>Second scale</th>
                <td className={css(styles.trailingCell)}>
                  <input
                    type="number"
                    className={css(styles.textInput)}
                    name="secondScaleLength"
                    value={secondScaleLength}
                    step={metric ? 1 : 1/8}
                    onChange={handleMiscChange}
                  />
                </td>
              </tr>

              <tr>
                <th className={css(styles.leadingCell)}>&perp; at</th>
                <td className={css(styles.trailingCell)}>
                  <input
                    type="number"
                    className={css(styles.textInput)}
                    name="perpendicularAt"
                    value={perpendicularAt}
                    step={1/10}
                    onChange={handleMiscChange}
                  />
                </td>
              </tr>
            </React.Fragment>
          )}

          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>Frets</th>
            <td className={css(styles.trailingCell)}>
              <input
                type="number"
                className={css(styles.textInput)}
                name="frets"
                value={frets}
                step={1}
                onChange={handleMiscChange}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>Page width</th>
            <td className={css(styles.trailingCell)}>
              <input
                type="number"
                className={css(styles.textInput)}
                name="pageWidth"
                value={pageWidth}
                min={1}
                step={metric ? 1 : 1/8}
                onChange={handleMiscChange}
              />
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>&times; height</th>
            <td className={css(styles.trailingCell)}>
              <input
                type="number"
                className={css(styles.textInput)}
                name="pageHeight"
                value={pageHeight}
                min={1}
                step={metric ? 1 : 1/8}
                onChange={handleMiscChange}
              />
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>+ margin</th>
            <td className={css(styles.trailingCell)}>
              <input
                type="number"
                className={css(styles.textInput)}
                name="pageMargin"
                value={pageMargin}
                min={0}
                max={Math.min(parseFloat(pageWidth), parseFloat(pageHeight)) / 3}
                step={metric ? 1 : 1/8}
                onChange={handleMiscChange}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <th className={css(styles.leadingCell)}>
              <input
                type="checkbox"
                id="metric-checkbox"
                name="metric"
                checked={metric}
                onChange={handleMetricChange}
              />
            </th>
            <td className={css(styles.trailingCell)}>
              <label htmlFor="metric-checkbox">Metric</label>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <section>
        <SvgSaveButton
          svgId={layoutSvgId}
          filename={[
            `${frets}-frets-on-`,
            firstScaleLength,
            multiscale ? `-through-${secondScaleLength}` : '',
            metric ? 'mm' : 'in',
            `-scale.svg`
          ].join('')}
        >
          Save
        </SvgSaveButton>
        {' '}
        <button
          type="button"
          onClick={print}
        >
          Print
        </button>
      </section>
    </div>
  );
}
