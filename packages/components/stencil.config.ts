import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'scale-components',
  outputTargets: [
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
    }
  ]
};
