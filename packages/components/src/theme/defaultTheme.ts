import { Color, ColorVariants, ColorVariant, Theme } from './interfaces';

const neutral: Color = {
  100: '#fff',
  200: '#f9f9fa',
  300: '#efeff0',
  400: '#d0d1d3',
  500: '#a2a3a8',
  600: '#66676e',
  700: '#4d4e50',
  800: '#1a1a1a',
};

const brand: Color = {
  100: '#eff1fa',
  200: '#768fff',
  300: '#768fff',
  400: '#768fff',
  500: '#2962ff',
  600: '#0039cb',
  700: '#0039cb',
  800: '#0039cb',
};
const red: Color = {
  100: '#f8e9ed',
  200: '#ff5983',
  300: '#ff5983',
  400: '#ff5983',
  500: '#f50057',
  600: '#bb002f',
  700: '#bb002f',
  800: '#bb002f',
};
const yellow: Color = {
  100: '#f8f7e2',
  200: '#fff64f',
  300: '#fff64f',
  400: '#fff64f',
  500: '#ffc400',
  600: '#c79400',
  700: '#c79400',
  800: '#c79400',
};
const blue: Color = {
  100: '#e7f3f6',
  200: '#69e2ff',
  300: '#69e2ff',
  400: '#69e2ff',
  500: '#00b0ff',
  600: '#0081cb',
  700: '#0081cb',
  800: '#0081cb',
};
const green: Color = {
  100: '#dff5e8',
  200: '#66ffa6',
  300: '#66ffa6',
  400: '#66ffa6',
  500: '#00e676',
  600: '#00b248',
  700: '#00b248',
  800: '#00b248',
};

export const colors = {
  neutral,
  brand,
  blue,
  green,
  red,
  yellow,
};

const defaultVariant: ColorVariant = {
  normal: {
    fill: colors.neutral[100],
    contrast: colors.neutral[800],
  },
  dark: {
    fill: colors.neutral[500],
    contrast: colors.neutral[100],
  },
};

const error: ColorVariant = {
  normal: {
    fill: colors.red[500],
    contrast: colors.red[100],
  },
  dark: {
    fill: colors.red[600],
    contrast: colors.red[100],
  },
};

const brandVariant: ColorVariant = {
  normal: {
    fill: colors.brand[500],
    contrast: colors.brand[100],
  },
  dark: {
    fill: colors.brand[600],
    contrast: colors.brand[100],
  },
};

const warning: ColorVariant = {
  normal: {
    fill: colors.yellow[500],
    contrast: colors.yellow[100],
  },
  dark: {
    fill: colors.yellow[600],
    contrast: colors.yellow[100],
  },
};

const success: ColorVariant = {
  normal: {
    fill: colors.green[500],
    contrast: colors.green[100],
  },
  dark: {
    fill: colors.green[600],
    contrast: colors.green[100],
  },
};

const info: ColorVariant = {
  normal: {
    fill: colors.blue[500],
    contrast: colors.blue[100],
  },
  dark: {
    fill: colors.blue[600],
    contrast: colors.blue[100],
  },
};

export const variants: ColorVariants = {
  default: defaultVariant,
  brand: brandVariant,
  error,
  warning,
  success,
  info,
};

export const defaultTheme: Theme = {
  palette: {
    colors,
    variants,
  },
  colors: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      lighter: '#768fff',
      default: '#2962ff',
      darker: '#0039cb',
    },
    error: {
      lighter: '#ff5983',
      default: '#f50057',
      darker: '#bb002f',
    },
    warning: {
      lighter: '#fff64f',
      default: '#ffc400',
      darker: '#c79400',
    },
    info: {
      lighter: '#69e2ff',
      default: '#00b0ff',
      darker: '#0081cb',
    },
    success: {
      lighter: '#66ffa6',
      default: '#00e676',
      darker: '#00b248',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      default: '#000',
      primary: 'rgba(0, 0, 0, .9)',
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
    variants: {
      h1: {
        fontWeight: 500,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.2,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.2,
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
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'none',
      },
      caption: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
      },
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
  icons: {
    close:
      'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    separator:
      'M8.306 22.679a1.137 1.137 0 01-.061-1.481l.06-.07 7.741-8.126-7.74-8.13a1.137 1.137 0 01-.061-1.481l.06-.07c.387-.406 1-.427 1.411-.064l.066.064L19 13.001 9.782 22.68a1.01 1.01 0 01-1.476 0z',
  },
};
