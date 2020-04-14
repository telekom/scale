export interface Theme {
  components?: {
    [key: string]: any;
  };
  colors?: {
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
