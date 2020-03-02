import { CssClassMap } from './utils';
import { StyleSheet } from 'jss';

export default interface Base {
  styles?: StyleSheet;
  stylesheet: StyleSheet;
  updateStyles: (newStyle: StyleSheet) => Promise<void>;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  getCssClassMap(): CssClassMap;
}
