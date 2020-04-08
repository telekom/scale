import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
	plugins: [
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
