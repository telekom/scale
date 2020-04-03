export interface Theme {
  components?: {
    [key: string]: any;
  };
  palette?: {
    common: {
      [key: string]: string;
    };
    primary: {
      [key: string]: string;
    };
    secondary: {
      [key: string]: string;
    };
    error: {
      [key: string]: string;
    };
    warning: {
      [key: string]: string;
    };
    info: {
      [key: string]: string;
    };
    success: {
      [key: string]: string;
    };
    grey: {
      [key: string]: string;
    };
    text: {
      [key: string]: string;
    };
    divider: {
      [key: string]: string;
    };
    background: {
      [key: string]: string;
    };
    action: {
      [key: string]: string | number;
    };
    [key: string]: any;
  };
  shadows?: {
    [key: string]: string;
  };
  typography?: {
    htmlFontSize: number | string;
    fontFamily: string;
    fontSize: string | number;
    [key: string]:
      | {
          fontFamily?: string;
          fontWeight: number;
          fontSize: string | number;
          lineHeight: string | number;
          letterSpacing: string | number;
        }
      | any;
  };
  spacing?: {
    [key: string]: any;
  };
  shape?: {
    borderRadius: number;
  };
  transitions?: {
    easing: {
      [key: string]: string;
    };
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
  zIndex?: {
    [key: string]: number;
  };
}
export const defaultTheme: Theme = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    error: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    warning: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    info: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    success: {
      light: '#f00',
      main: '#ff0',
      dark: '#f0f',
      contrastText: '#fff',
    },
    grey: {
      50: '#f00',
      100: '#f00',
      200: '#ff0',
      300: '#ff0',
      400: '#ff0',
      500: '#ff0',
      600: '#ff0',
      700: '#ff0',
      800: '#ff0',
      900: '#ff0',
    },
    text: {
      default: '#000',
      primary: 'rgba(0, 0, 0, .9)',
      secondary: 'rgba(0, 0, 0, .6)',
      disabled: 'rgba(0, 0, 0, .4)',
      hint: 'rgba(0, 0, 0, .4)',
    },
    divider: {
      default: 'rgba(0, 0, 0, .1)',
    },
    background: {
      default: '#fff',
    },
    action: {
      active: 'rgba(0, 0, 0, .6)',
      activeOpacity: 0.6,
      hover: 'rgba(0, 0, 0, .4)',
      hoverOpacity: 0.4,
      selected: 'rgba(0, 0, 0, .8)',
      selectedOpacity: 0.8,
      disabled: 'rgba(0, 0, 0, .3)',
      disabledOpacity: 0.3,
      focus: 'rgba(0, 0, 0, .1)',
      focusOpacity: 0.1,
    },
  },
  shadows: {
    0: 'none',
    1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    2: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    3: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 300,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 400,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 400,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    body: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {},
};
