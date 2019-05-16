import * as React from 'react';
import { useState, useEffect } from 'react';
import Controls from './controls';
import Page from './page';
import Layout from './layout';
import useFretboardState from './use-fretboard-state';
import presets, { FretboardState } from './presets';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  app: {
    bottom: 0,
    display: 'flex',
    font: 'normal 1rem sans-serif',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    '@media print': {
      display: 'none',
    }
  },

  input: {
    background: '#eee',
    borderRight: '1px solid #0004',
    padding: '1rem',
    width: '22ch',
  },

  output: {
    background: '#ccc',
    boxShadow: '0 0.5em 1em -0.5em #0006 inset',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
    textAlign: 'center',
  },

  layoutWrapper: {
    overflow: 'auto',
    padding: '4vw 4vw 5vw',
  },

  scaleWrapper: {
    background: '#0003',
    borderRadius: '2rem',
    bottom: '0.5rem',
    padding: '0.3rem 1rem',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
  },

  printVersion: {
    '@media screen': {
      display: 'none',
    }
  }
});

export default function App() {
  const [state, handleChange]: [FretboardState, Function] = useFretboardState(presets.DEFAULT);
  const [scale, setScale]: [number, Function] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  });

  type NumberInput = { valueAsNumber: number };
  type NumberInputEvent = { currentTarget: NumberInput };

  function handleScaleChange(event: NumberInputEvent) {
    setScale(event.currentTarget.valueAsNumber);
  }

  return (
    <React.Fragment>
      <main className={css(styles.app)}>
        <section className={css(styles.input)}>
          <Controls
            frets={state.frets}
            firstScaleLength={state.firstScaleLength}
            multiscale={state.multiscale}
            secondScaleLength={state.secondScaleLength}
            perpendicularAt={state.perpendicularAt}
            pageWidth={state.pageWidth}
            pageHeight={state.pageHeight}
            pageMargin={state.pageMargin}
            layoutSvgId="app__fretboard-layout"
            onChange={handleChange}
          />
        </section>

        <section className={css(styles.output)}>
          <div className={css(styles.layoutWrapper)}>
            <Page
              width={state.pageWidth}
              height={state.pageHeight}
              margin={state.pageMargin}
              unit={state.metric ? 'mm' : 'in'}
              style={{ width: `${scale * 100}%` }}
            >
              <use
                xlinkHref="#app__fretboard-layout"
              />
            </Page>
          </div>

          <div className={css(styles.scaleWrapper)}>
            <input
              type="range"
              min={1/10}
              max={3}
              step={1/50}
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
        </section>
      </main>

      <Layout
        id="app__fretboard-layout"
        className={css(styles.printVersion)}
        width={state.pageWidth - state.pageMargin * 2}
        height={state.pageHeight - state.pageMargin * 2}
        frets={state.frets}
        firstScaleLength={state.firstScaleLength}
        secondScaleLength={state.multiscale ? state.secondScaleLength : state.firstScaleLength}
        perpendicularAt={state.perpendicularAt}
        overlap={state.metric ? 20 : 1/2}
        unit={state.metric ? 'mm' : 'in'}
      />
    </React.Fragment>
  );
}
