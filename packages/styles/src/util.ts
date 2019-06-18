export { defaultTheme, theme } from './theme';
import * as tinycolor from 'tinycolor2';

export const css = (
	styles: TemplateStringsArray,
	..._vars: (string | number)[]
): string => styles.reduce((result, style, index) =>
	`${result}${style}${_vars[index] || ''}`, ''
);

export const rgba = (color: any = 'white', alpha: number = 0) =>
	tinycolor(color).setAlpha(alpha).toRgbString();
