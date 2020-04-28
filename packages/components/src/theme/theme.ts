import { combineObjects } from '../utils/utils';
import { defaultTheme } from './defaultTheme';

const store =
  typeof window !== 'undefined' && typeof window.Audio !== 'undefined'
    ? window
    : { scale: { theme: 'ʕ•ᴥ•ʔ theme store magic placeholder ʕ•ᴥ•ʔ' } };

export const getTheme = (overrides?: Partial<any>): any => {
  const scale = (store as any).scale;
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
  (store as any).scale = {
    ...(store as any).scale,
  };
  const scale = (store as any).scale;
  scale.theme = getTheme(overrides);
};
