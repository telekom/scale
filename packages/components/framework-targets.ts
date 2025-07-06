import { reactOutputTarget } from '@stencil/react-output-target';
import {
  vueOutputTarget,
  ComponentModelConfig,
} from '@nowseemee/vue-output-target';
import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: [
      'scale-input',
      'scale-text-field',
      'scale-textarea',
      'scale-dropdown',
      'scale-switch',
    ],
    event: 'scaleChange',
    targetAttr: 'value',
  },
  {
    elements: ['scale-checkbox'],
    event: 'scaleChange',
    targetAttr: 'checked',
  },
  {
    elements: ['scale-radio-button'],
    event: 'scaleChange',
    targetAttr: 'checked',
  },
  {
    elements: ['scale-slider'],
    event: 'scaleInput',
    targetAttr: 'value',
  },
];

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['scale-input'],
    event: 'scaleChange',
    targetAttr: 'value',
    type: 'text',
  },
  // Tests won't pass for these
  // https://github.com/ionic-team/stencil-ds-output-targets/blob/master/packages/example-project/component-library-angular/__tests__/my-checkbox.spec.ts
  /* {
      elementSelectors: ['scale-input[type=checkbox]'],
      event: 'scaleChange',
      targetAttr: 'checked',
      type: 'boolean'
    },
    {
      elementSelectors: ['scale-input[type=radio]'],
      event: 'scaleChange',
      targetAttr: 'checked',
      type: 'radio'
    },
    {
      elementSelectors: ['scale-input[type=select]'],
      event: 'scaleChange',
      targetAttr: 'value',
      type: 'select'
    }, */
  {
    elementSelectors: ['scale-slider'],
    event: 'scaleChange',
    targetAttr: 'value',
    type: 'number',
  },
];

const excludeComponents = [
  'animatable-component',
  'animatable-cube',
  'duet-date-picker',
];

export const frameworkTargets = [
  reactOutputTarget({
    componentCorePackage: '@telekom/scale-components',
    proxiesFile: '../components-react/src/components.ts',
    excludeComponents,
  }),
  vueOutputTarget({
    componentCorePackage: '@telekom/scale-components',
    proxiesFile: '../components-vue/src/proxies.ts',
    componentModels: vueComponentModels,
    excludeComponents,
  }),
  angularOutputTarget({
    componentCorePackage: '@telekom/scale-components',
    directivesProxyFile: '../components-angular/src/directives/proxies.ts',
    directivesArrayFile:
      '../components-angular/src/directives/proxies-list.tsx',
    directivesUtilsFile:
      '../components-angular/src/directives/proxies-utils.ts',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents,
  }),
];
