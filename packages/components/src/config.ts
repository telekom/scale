export const applyTheme = theme =>
  ((window as any).telements = {
    ...(window as any).telements,
    theme,
  });

export const applyConfig = config =>
  ((window as any).telements = {
    ...(window as any).telements,
    config,
  });
