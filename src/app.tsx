import * as React from 'react';
import { useEffect } from 'react';
import Inputs from './inputs';
import Page from './page';
import Layout from './layout';
import useLocalStorage from './use-local-storage';
import { InputState, defaultState } from './presets';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  app: {
    background: '#eee',
    bottom: 0,
    display: 'flex',
    font: 'normal 1rem sans-serif',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    '@media print': {
      display: 'none',
    },
  },

  inputsContainer: {
    borderRight: '1px solid #0003',
    overflow: 'auto',
    padding: '1rem',
  },

  outputContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1',
    position: 'relative',
    textAlign: 'center',
  },

  pageWrapper: {
    flexGrow: 1,
    overflow: 'auto',
    padding: '4vw 4vw 5vw',
  },

  scaleControlWrapper: {
    background: 'white',
    borderRadius: '2rem',
    bottom: '1rem',
    padding: '0.2rem 1rem',
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
  const [state, setState]: [InputState, Function] = useLocalStorage('fretboard', defaultState);
  const [scale, setScale]: [number, Function] = useLocalStorage('scale', 1);

  useEffect(() => {
    // Scrolling is handled by the output container.
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = '';
  }, []);

  function handleChanges(changes: object): void {
    setState({ ...state, ...changes });
  }

  function handleScaleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setScale(event.currentTarget.valueAsNumber);
  }

  return (
    <React.Fragment>
      <main className={css(styles.app)}>
        <section className={css(styles.inputsContainer)}>
          <Inputs
            frets={state.frets}
            firstScaleLength={state.firstScaleLength}
            multiscale={state.multiscale}
            secondScaleLength={state.secondScaleLength}
            perpendicularAt={state.perpendicularAt}
            pageWidth={state.pageWidth}
            pageHeight={state.pageHeight}
            pageMargin={state.pageMargin}
            metric={state.metric}
            layoutSvgId="app__fretboard-layout"
            onChange={handleChanges}
          />
        </section>

        <section className={css(styles.outputContainer)}>
          <div className={css(styles.pageWrapper)}>
            <Page
              width={parseFloat(state.pageWidth)}
              height={parseFloat(state.pageHeight)}
              margin={parseFloat(state.pageMargin)}
              unit={state.metric ? 'mm' : 'in'}
              style={{ height: `${scale * 99}%` }}
            >
              <use xlinkHref="#app__fretboard-layout" />
            </Page>
          </div>

          <div className={css(styles.scaleControlWrapper)}>
            <input
              type="range"
              min={1/10}
              max={3}
              step={1/50}
              value={scale}
              title="Preview zoom"
              onChange={handleScaleChange}
              list="app__scale-notches"
            />

            <datalist id="app__scale-notches">
              <option value="1"></option>
            </datalist>
          </div>
        </section>
      </main>

      <section className={css(styles.printVersion)}>
        <Layout
          id="app__fretboard-layout"
          width={parseFloat(state.pageWidth) - parseFloat(state.pageMargin) * 2 || 2}
          height={parseFloat(state.pageHeight) - parseFloat(state.pageMargin) * 2 || 2}
          frets={parseFloat(state.frets) || 0}
          firstScaleLength={parseFloat(state.firstScaleLength) || 0}
          secondScaleLength={parseFloat(state.multiscale ? state.secondScaleLength : state.firstScaleLength) || 0}
          perpendicularAt={parseFloat(state.perpendicularAt) || 0}
          overlap={Math.min(state.metric ? 12.7 : 1/2, parseFloat(state.pageHeight) / 3)}
          unit={state.metric ? 'mm' : 'in'}
        />
      </section>
    </React.Fragment>
  );
}
