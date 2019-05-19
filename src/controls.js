import React from 'react';
import SvgSaveButton from './svg-save-button';
import { inputPresets } from './presets';

const MM_PER_INCH = 25.4;

function stringifyNumber(number) {
  return parseFloat(number.toFixed(3)).toString();
}

export default function({
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
}) {
  function setMetric(value) {
    const multiplier = value ? MM_PER_INCH : 1 / MM_PER_INCH;

    onChange({
      firstScaleLength: stringifyNumber(parseFloat(firstScaleLength) * multiplier),
      secondScaleLength: stringifyNumber(parseFloat(secondScaleLength) * multiplier),
      pageWidth: stringifyNumber(parseFloat(pageWidth) * multiplier),
      pageHeight: stringifyNumber(parseFloat(pageHeight) * multiplier),
      pageMargin: stringifyNumber(parseFloat(pageMargin) * multiplier),
      metric: value,
    });
  }

  function onGeneralChange(event) {
    const valueProperty = event.currentTarget.type === 'checkbox' ? 'checked' : 'value';
    onChange({
      [event.currentTarget.name]: event.currentTarget[valueProperty],
    });
  }

  function onMetricChange(event) {
    setMetric(event.currentTarget.checked);
  }

  function onTemplateSelection(event) {
    const value = parseFloat(event.currentTarget.value);
    onChange({
      firstScaleLength: stringifyNumber(metric ? value * MM_PER_INCH : value),
      multiscale: false,
    });
  }

  return (
    <React.Fragment>
      <header style={{ textAlign: 'center' }}>
        <strong>Fretboard template generator</strong>
      </header>

      <hr />

      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ textAlign: 'right' }}>Scale length</td>
            <td>
              <input
                type="number"
                name="firstScaleLength"
                value={firstScaleLength}
                step={metric ? 1 : 1/8}
                onChange={onGeneralChange}
                style={{ width: '6ch' }}
              />

              <select
                aria-label="Presets"
                value=""
                onChange={onTemplateSelection}
                style={{ width: '2.3ch' }}
              >
                <option
                  value=""
                  disabled
                ></option>

                {Array.from(inputPresets.entries()).map(([name, value]) => (
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
            <td style={{ textAlign: 'right' }}>
              <input
                type="checkbox"
                id="multiscale-checkbox"
                name="multiscale"
                checked={multiscale}
                onChange={onGeneralChange}
              />
            </td>
            <td>
              <label htmlFor="multiscale-checkbox">Multiscale</label>
            </td>
          </tr>
        </tbody>

        {multiscale && (
          <tbody>
            <tr>
              <td style={{ textAlign: 'right' }}>Second scale</td>
              <td>
                <input
                  type="number"
                  name="secondScaleLength"
                  value={secondScaleLength}
                  step={metric ? 1 : 1/8}
                  onChange={onGeneralChange}
                  style={{ width: '7ch' }}
                />
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: 'right' }}>&perp; at</td>
              <td>
                <input
                  type="number"
                  name="perpendicularAt"
                  value={perpendicularAt}
                  step={1/10}
                  onChange={onGeneralChange}
                  style={{ width: '7ch' }}
                />
              </td>
            </tr>
          </tbody>
        )}

        <tbody>
          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>Frets</td>
            <td>
              <input
                type="number"
                name="frets"
                value={frets}
                step={1}
                onChange={onGeneralChange}
                style={{ width: '7ch' }} />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>Page width</td>
            <td>
              <input
                type="number"
                name="pageWidth"
                value={pageWidth}
                min={1}
                step={metric ? 1 : 1/8}
                onChange={onGeneralChange}
                style={{ width: '7ch' }}
              />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>&times; height</td>
            <td>
              <input
                type="number"
                name="pageHeight"
                value={pageHeight}
                min={1}
                step={metric ? 1 : 1/8}
                onChange={onGeneralChange}
                style={{ width: '7ch' }}
              />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>+ margin</td>
            <td>
              <input
                type="number"
                name="pageMargin"
                value={pageMargin}
                min={0}
                max={Math.min(parseFloat(pageWidth), parseFloat(pageHeight)) / 3}
                step={metric ? 1 : 1/8}
                onChange={onGeneralChange}
                style={{ width: '7ch' }}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>
              <input
                type="checkbox"
                id="metric-checkbox"
                name="metric"
                checked={metric}
                onChange={onMetricChange}
              />
            </td>
            <td>
              <label htmlFor="metric-checkbox">Metric</label>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <div style={{ textAlign: 'center' }}>
        <SvgSaveButton
          svgId={layoutSvgId}
          filename={`${frets}-frets-on-${firstScaleLength + (multiscale ? `-through-${secondScaleLength}` : '')}${metric ? 'mm' : 'in'}-scale.svg`}
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
      </div>
    </React.Fragment>
  );
}
