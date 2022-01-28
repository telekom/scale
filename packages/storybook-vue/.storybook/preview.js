import Vue from 'vue';

import {
  defineCustomElements,
  applyPolyfills,
} from '@telekom/scale-components/loader';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/scale-\w*/];

applyPolyfills().then(() => {
  defineCustomElements(window);
});

export const parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'list',
          enabled: false,
        },
        {
          id: 'listitem',
          enabled: false,
        },
        {
          id: 'color-contrast',
          enabled: false,
        },
      ],
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
  },
};

// Dark mode (punk) switch

document.body.dataset.mode = 'light'

setTimeout(() => {
  console.log('To enable dark mode press Ctrl+Shift+M while having focus on the canvas')
}, 3000)

function switchMode(bool) {
  document.body.dataset.mode = bool ? 'dark' : 'light'
  console.log(`${document.body.dataset.mode.toUpperCase()} mode enabled`)
}

document.addEventListener('keydown', (event) => {
  if (event.key.toUpperCase() === 'M' && event.ctrlKey && event.shiftKey) {
    switchMode(document.body.dataset.mode === 'light')
  }
})
