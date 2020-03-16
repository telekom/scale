export { defaultTheme, theme } from './theme';
import _ from 'lodash';

export type CssClassMap =
  | string
  | {
      [className: string]: boolean;
    };

export const combineObjects = (a: object, b: object): object =>
  _.merge({}, a, b);
