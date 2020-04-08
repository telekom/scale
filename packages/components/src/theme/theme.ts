import { combineObjects } from '../utils/utils';
import { defaultTheme } from './defaultTheme';

export const getTheme = (overrides?: Partial<any>): any => {
  const scale = (window as any).scale;
  if (scale) {
    const injectedTheme = scale.theme;
    if (injectedTheme) {
      return combineObjects(defaultTheme, injectedTheme);
    }
  }
  if (overrides) {
    return combineObjects(defaultTheme, overrides);
  }
  return defaultTheme;
};

export const useTheme = (overrides?: any) => {
  (window as any).scale = {
    ...(window as any).scale,
  };
  const scale = (window as any).scale;
  scale.theme = getTheme(overrides);
};
