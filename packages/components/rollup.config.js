import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy'

export default {
	plugins: [
    copy({
      targets: [
        { src: 'src/theme/theme.d.ts', dest: 'build/theme' },
        { src: 'src/theme/theme.d.ts', dest: 'build/theme', rename: 'theme.iife.d.ts' },
        { src: 'src/theme/theme.d.ts', dest: 'build/theme', rename: 'theme.esm.d.ts' },
      ]
    }),
    typescript(),
		commonjs(),
		resolve()
	],
  input: [
		'src/theme/theme.ts',
	],
  output: [
		{
			file: 'build/theme/theme.js',
			format: 'cjs'
		},
		{
			file: 'build/theme/theme.iife.js',
			format: 'iife',
			name: 'scale'
		},
		{
			file: 'build/theme/theme.esm.js',
			format: 'esm'
		}
	]
};
