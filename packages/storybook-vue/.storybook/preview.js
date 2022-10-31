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
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
        'Scale Design System',
        'About Scale',
        'FAQ',
        'New Release',
        ['Release Notes', 'Sketch Library Update'],
        'Setup & Info',
        [
          'Getting Started For Designers',
          'Getting Started For Developers',
          'Scale and Vue',
          'Scale and Angular',
          'Scale and React',
          'Accessibility',
          'Browser Support',
        ],
        'Guidelines',
        [
          'Design Tokens',
          'Light and Dark Mode',
          'Customization and Themes',
          'Grid',
          'Spacings',
          'Typography',
          'Colors',
          'Shadows',
        ],
        'Update History',
        ['Design', 'Development'],
        'Components',
        'Beta Components',
        'Contact',
        'Legal',
        ['Disclaimer', 'Legal Notice', 'Privacy'],
      ],
    },
  },
};
