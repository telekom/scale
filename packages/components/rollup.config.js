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
		'src/utils/theme.ts',
	],
  output: [
		{
			file: 'build/utils/theme.js',
			format: 'cjs'
		},
		{
			file: 'build/utils/theme.iife.js',
			format: 'iife',
			name: 'scale'
		},
		{
			file: 'build/utils/theme.esm.js',
			format: 'esm'
		}
	]
};
