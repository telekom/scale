import { defineCustomElements } from '@telekom/scale-components-neutral/loader';

export default defineNuxtPlugin(() => {
  defineCustomElements(window);
});