import { CssClassMap } from './utils';
import { StyleSheet } from 'jss';

export default interface Base {
  styles?: StyleSheet;
  stylesheet: StyleSheet;
  componentDidUnload(): void;
  componentWillUpdate(): void;
  getCssClassMap(): CssClassMap;
}
