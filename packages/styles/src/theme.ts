interface Theme {
	unit: string;
	breakpoints: {
		[key: string]: (string|number)
	};
	colors: {
		[key: string]: string
	}
}

export const defaultTheme: Theme = {
	unit: 'px',
	breakpoints: {
		mobile: 320,
		tablet: 767,
		desktop: 1024,
	},
	colors: {
		black: '#000',
		white: '#fff',
	}
};

export const theme = (overrides?: Partial<Theme>) => {
	return {
		...defaultTheme,
		...overrides
	}
};
