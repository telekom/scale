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
        { src: '../../components/www/build', dest: 'components' },
        { src: 'docs/themes', dest: 'themes' },
      ]
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/prerender'
    }
  ],
  globalStyle: 'src/global/style/app.css'
};
