import { JssStyle } from 'jss';

const sliderKnob: JssStyle = {
  '-webkit-appearance': 'none',
  border: '2px solid #409eff',
  height: '20px',
  width: '20px',
  borderRadius: '50%',
  background: '#fff',
};

export const styles: JssStyle = {
  slider: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
  },
  slider__text: {
    margin: 'var(--slider-text-margin, 0 0 0 1rem)',
    minWidth: 30,
    textAlign: 'right',
  },
  slider__input: {
    outline: 'none',
    '-webkit-appearance': 'none',
    cursor: 'pointer',
    background: '#e4e7ed',
    height: '4px',
    width: '100%',
    borderRadius: '2px',
    '&::-webkit-slider-thumb': sliderKnob,

    // TODO: currently throws warning in chrome, enable browser check to support firefox and edge
    // '&::-moz-range-thumb': sliderKnob,
    // '&::-ms-thumb': sliderKnob,
  },
  // TODO: currently throws warning in chrome, enable browser check to support firefox
  // "input[type='range']": {
  //   '&::-moz-focus-outer': {
  //     border: '0',
  //   },
  // },
};
