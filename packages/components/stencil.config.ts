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
    {
      type: 'docs-custom',
      generator: docs => {
        fs.writeFile('./dist/telements-components.json', JSON.stringify(docs, null, 4), error => {
          if (error) {
            // tslint:disable-next-line: no-console
            return console.error(error);
          }
          // tslint:disable-next-line: no-console
          console.log('[00:00.0] ', 'custom json docs export complete!')
        })
      }
    }
  ]
};
