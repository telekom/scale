import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  plugins: [
    commonjs(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
  ],
  input: ['src/theme/theme.ts'],
  output: [
    {
      file: 'build/theme/theme.js',
      format: 'cjs',
    },
    {
      file: 'build/theme/theme.iife.js',
      format: 'iife',
      name: 'scale',
    },
    {
      file: 'build/theme/theme.esm.js',
      format: 'esm',
    },
  ],
};
