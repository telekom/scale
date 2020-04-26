import { combineObjects } from '../utils/utils';
import { defaultTheme } from './defaultTheme';

const data = typeof window === 'object' ? window : { theme: {} };

export const getTheme = (overrides?: Partial<any>): any => {
  const scale = (data as any).scale;
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
  (data as any).scale = {
    ...(data as any).scale,
  };
  const scale = (data as any).scale;
  scale.theme = getTheme(overrides);
};
