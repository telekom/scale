export { defaultTheme, theme } from './theme';

export type CssClassMap =
  | string
  | {
      [className: string]: boolean;
    };

export const css = (
  styles: TemplateStringsArray,
  // tslint:disable-next-line: variable-name
  ..._vars: Array<string | number>
): string =>
  styles.reduce(
    (result, style, index) => `${result}${style}${_vars[index] || ''}`,
    ''
  );
