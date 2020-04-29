import { Config } from '@stencil/core';
import { reactOutputTarget } from '@nowseemee/stencil-react-output-target';

export const config: Config = {
  namespace: 'scale-components',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@scaleds/components',
      proxiesFile: '../components-react/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: '../build/theme' , dest: '..', warn: true}
      ]
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: '../build/theme' , dest: 'build/theme', warn: true}
      ]
    },
    // {
    //   type: 'docs-custom',
    //   generator: docs => {
    //     fs.writeFileSync('./dist/scale-components.json', JSON.stringify(docs, null, 4))
    //   }
    // }
    {
      type: 'docs-json',
      file: './dist/scale-components.json'
    },
    { type: 'dist-hydrate-script' }
  ]
};
