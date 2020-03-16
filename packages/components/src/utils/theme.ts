import { combineObjects } from './utils';

interface Theme {
  unit: string;
  breakpoints: {
    [key: string]: string | number;
  };
  colors: {
    [key: string]: string;
  };
}

const base: any = {
  unit: 'px',
  breakpoints: {
    mobile: 320,
    tablet: 767,
    desktop: 1024,
  },
  colors: {
    primary: 'blue',
    secondary: 'lightblue',
    black: '#000',
    white: '#fff',
  },
};

export const defaultTheme = {
  ...base,
};

export const theme = (overrides?: Partial<Theme>) => {
  const scale = (window as any).scale;
  if (scale) {
    const injectedConfig = scale.config;
    const injectedTheme = scale.theme;
    if (injectedTheme) {
      if (injectedConfig && injectedConfig.overrides === false) {
        return injectedTheme;
      }
      return combineObjects(defaultTheme, injectedTheme);
    }
  }
  return combineObjects(defaultTheme, overrides);
};
