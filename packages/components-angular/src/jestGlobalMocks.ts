Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

window.matchMedia =
  window.matchMedia ||
  (function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  } as any);

(window as any).CSSStyleSheet = class {
  constructor() {
    throw Error();
  }
} as any;