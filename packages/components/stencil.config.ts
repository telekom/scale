import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssCustomMedia from 'postcss-custom-media';
import { frameworkTargets } from './framework-targets';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  devServer: {
    startupTimeout: 120000,
  },
  tsconfig: process.env.WHITELABEL
    ? 'tsconfig.whitelabel.json'
    : 'tsconfig.json',
  testing: {
    testRegex: '/src/.*\\.(spec|e2e)\\.(ts|tsx)$',
    collectCoverageFrom: [
      '**/src/**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/*.{d,esm,iife,styles}.ts',
    ],
    setupFilesAfterEnv: ['./test-setup.ts'],
  },
  namespace: 'scale-components',
  globalScript: 'src/global/scale.ts',
  globalStyle: process.env.WHITELABEL
    ? 'src/global/whitelabel.css'
    : 'src/global/scale.css',
  plugins: [
    inlineSvg(),
    postcss({
      plugins: [postcssCustomMedia()],
    }),
  ],
  outputTargets: [
    ...frameworkTargets,
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
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
    },
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
      type: 'docs-readme',
    },
    {
      type: 'docs-vscode',
      file: './dist/custom-elements.json',
    },
    {
      type: 'docs-json',
      file: './dist/scale-components.json',
    },
    { type: 'dist-hydrate-script' },
  ],
  extras: {
    cloneNodeFix: true,
    experimentalImportInjection: true,
  },
};
