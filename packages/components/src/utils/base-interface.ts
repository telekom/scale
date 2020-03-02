import { CssClassMap } from './utils';
import { StyleSheet } from 'jss';

export default interface Base {
  styles?: StyleSheet;
  stylesheet: StyleSheet;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  getCssClassMap(): CssClassMap;
}
