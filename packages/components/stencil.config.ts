import { Config } from '@stencil/core';
import * as fs from 'fs';

export const config: Config = {
  namespace: 'telements-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    // {
    //   type: 'docs-custom',
    //   generator: docs => {
    //     fs.writeFileSync('./dist/telements-components.json', JSON.stringify(docs, null, 4))
    //   }
    // }
    {
      type: 'docs-json',
      file: './dist/telements-components.json'
    }
  ]
};
