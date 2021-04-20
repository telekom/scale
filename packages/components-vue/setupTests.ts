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

let error = console.error;
console.error = function (message: any) {
  error.apply(console, arguments); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};