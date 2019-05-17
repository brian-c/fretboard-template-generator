import React from 'react';
import SvgSaveButton from './svg-save-button';

export default function({
  firstScaleLength,
  multiscale,
  secondScaleLength,
  perpendicularAt,
  metric,
  frets,
  pageWidth,
  pageHeight,
  pageMargin,
  layoutSvgId,
  onChange
}) {
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
                onChange={onChange}
                style={{ width: '7ch' }}
              />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: 'right' }}>
              <input
                type="checkbox"
                id="multiscale-checkbox"
                name="multiscale"
                checked={multiscale}
                onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange} style={{ width: '7ch' }}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                max={Math.min(pageWidth, pageHeight) / 3}
                step={metric ? 1 : 1/8}
                onChange={onChange}
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
                onChange={onChange}
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
