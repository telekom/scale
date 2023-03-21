import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssCustomMedia from 'postcss-custom-media';

export const config: Config = {
  namespace: 'scale-components',
  globalStyle: process.env.WHITELABEL
    ? 'src/global/whitelabel.css'
    : 'src/global/scale.css',
  plugins: [
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'telekom/fonts/TeleNeoWeb',
          dest: 'build/fonts/TeleNeoWeb',
          warn: true,
        },
        { src: '../../design-tokens/dist/*', dest: 'build/', warn: true },
        { src: './html/*', dest: './', warn: true },
        ...(!process.env.WHITELABEL
          ? [{ src: './html/telekom/*', dest: './', warn: true }]
          : []),
      ],
    },
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        // do not include fonts files for whitelabel build
        ...(process.env.WHITELABEL
          ? []
          : [
              {
                src: 'telekom/fonts/TeleNeoWeb',
                dest: 'fonts/TeleNeoWeb',
                warn: true,
              },
            ]),
        // index file with icon information, useful for docs
        { src: 'components/icons/scale-icons.json', warn: true },
        // do not publish the telekom/ brand assets folder (in dist/collections/)
        { src: '.npmignore', warn: true },
      ],
    },
  ],
};
