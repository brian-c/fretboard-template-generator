import useLocalStorage from './use-local-storage';

const MM_IN_INCH = 25.4;

// These will need to be converted between metric and imperial.
const MEASURED_STATE_PROPERTIES = [
  'firstScaleLength',
  'otherScaleLength',
  'pageWidth',
  'pageHeight',
  'pageMargin'
];

const transformations = {
  metric(state) {
    MEASURED_STATE_PROPERTIES.forEach((property) => {
      state[property] = state.metric ? (
        state[property] * MM_IN_INCH
      ) : (
        state[property] / MM_IN_INCH
      );
      state[property] = parseFloat(state[property].toFixed(3));
    });
  }
};

const INPUT_VALUE_KEYS = {
  number: 'valueAsNumber',
  checkbox: 'checked',
};

function useFretboardState(initialState) {
  const [state, setState] = useLocalStorage('fretboard', initialState);

  function handleChange(event) {
    const property = event.currentTarget.name;
    const valueKey = INPUT_VALUE_KEYS[event.currentTarget.type] || 'value';

    const newState = {
      ...state,
      [property]: event.currentTarget[valueKey],
    };

    if (event.currentTarget.type === 'number' && !newState[property]) {
      newState[property] = 0;
    }

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
