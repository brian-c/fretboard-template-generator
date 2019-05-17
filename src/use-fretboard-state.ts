import useLocalStorage from './use-local-storage';
import { FretboardState } from './presets';

const MM_IN_INCH: number = 25.4;

// These will need to be converted between metric and imperial.
const MEASURED_STATE_PROPERTIES: string[] = [
  'firstScaleLength',
  'secondScaleLength',
  'pageWidth',
  'pageHeight',
  'pageMargin'
];

const transformations: { [key: string]: Function } = {
  metric(state: FretboardState): void {
    MEASURED_STATE_PROPERTIES.forEach((property: string) => {
      state[property] = state.metric ? (
        state[property] * MM_IN_INCH
      ) : (
        state[property] / MM_IN_INCH
      ).toFixed(3);
    });
  }
};

const INPUT_VALUE_KEYS: { [key: string]: string } = {
  number: 'value',
  checkbox: 'checked',
};

function useFretboardState(initialState: any): [any, Function] {
  const [state, setState]: [any, Function] = useLocalStorage('fretboard', initialState);

  function handleChange(event: Event) {
    const currentTarget = (event.currentTarget as HTMLInputElement);
    const property: string = currentTarget.name;
    const valueKey: string = INPUT_VALUE_KEYS[currentTarget.type] || 'value';

    const newState: Object = {
      ...state,
      [property]: currentTarget[valueKey],
    };

    if (transformations[property]) {
      transformations[property](newState);
    }

    setState(newState);
  }

  return [
    state,
    handleChange,
  ];
}

export default useFretboardState;
