import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://github.com',
      prerenderConfig: './prerender.config.js',
      serviceWorker: {
        unregister: true
      },
      copy: [
        { src: '../components', dest: 'components' }
      ]
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender'
    }
  ],
  globalStyle: 'src/global/style/app.css'
};
