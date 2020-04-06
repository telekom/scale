import { Theme } from '../theme/interfaces';

export const getTransition = (
  { transitions }: Theme,
  selectors: string,
  duration: string,
  easing: string
) =>
  `${selectors} ${transitions.duration[duration] / 1000}s ${
    transitions.easing[easing]
  }`;
