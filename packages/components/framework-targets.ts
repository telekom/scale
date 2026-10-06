import { reactOutputTarget } from '@stencil/react-output-target';

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
    hydrateModule: '@telekom/scale-components/hydrate',
    clientModule: '@telekom/scale-components',
  }),
];
