import {
  ComponentModelConfig,
  vueOutputTarget,
} from '@nowseemee/vue-output-target';
import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

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
  // These do not work with the way the plugin "utils"'s wires events,
  // and probably Vue doing something different for native input[type=checkbox|radio]
  // {
  //   elements: [
  //     'scale-checkbox',
  //     'scale-radio-button'
  //   ],
  //   event: 'scaleChange',
  //   targetAttr: 'value',
  // },
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
    // componentCorePackage: '@telekom/scale-components',
    stencilPackageName: '@telekom/scale-components',
    // proxiesFile: '../components-react/src/components.ts',
    excludeComponents,
    outDir: '../components-react/src',
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
    directivesArrayFile: '../components-angular/src/directives/proxies-list.ts',
    outputType: 'component',
    valueAccessorConfigs: angularValueAccessorBindings,
    excludeComponents,
  }),
];
