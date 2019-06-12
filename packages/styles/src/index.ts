import { button } from './button';
import { alert } from './alert';
import { card } from './card';

const css = (styles: TemplateStringsArray) => styles

const theme = {
	colors: {
		white: '#fff',
		black: '#000',
		blue: '#00f',
		red: '#f00',
	}
}

export {
	css,
	theme,
	alert,
	button,
	card,
}
