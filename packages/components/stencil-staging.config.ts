import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssCustomMedia from 'postcss-custom-media';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'scale-components',
  globalScript: 'src/global/scale.ts',
  globalStyle: 'src/global/scale.css',
  plugins: [
    inlineSvg(),
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'telekom/fonts/TeleNeoWeb',
          dest: 'fonts/TeleNeoWeb',
          warn: true,
        },
        // index file with icon information, useful for docs
        { src: 'components/icons/scale-icons.json', warn: true },
        // do not publish the telekom/ brand assets folder (in dist/collections/)
        { src: '.npmignore', warn: true },
      ],
    },
  ],
};
