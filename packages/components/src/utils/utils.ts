export { defaultTheme, theme } from './theme';

export type CssClassMap = string | {
  [className: string]: boolean
};

export const css = (
	styles: TemplateStringsArray,
	..._vars: (string | number)[]
): string => styles.reduce((result, style, index) =>
	`${result}${style}${_vars[index] || ''}`, ''
);
