export const applyTheme = theme =>
  ((window as any).scale = {
    ...(window as any).scale,
    theme,
  });

export const applyConfig = config =>
  ((window as any).scale = {
    ...(window as any).scale,
    config,
  });
