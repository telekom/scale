import externalDeps from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-query': 'ReactQuery',
};

const plugins = [
    externalDeps(), //prevents packages listed in peerDependencies from being bundled with our component library
    commonJS(), //convert common js modules to es6
    resolve(), // Locate and bundle third-party dependencies in node_modules
    typescript() // transpiles our TypeScript code into JavaScript.
];

export default {
    input: `./src/index.ts`,
    output: [
        {
            name: 'index',
            file: `dist/index.js`,
            format: 'cjs',
            sourcemap: true,
        },
        {
            name: 'index',
            file: `dist/index.es.js`,
            format: 'esm',
            sourcemap: true,
        },
        {
            name: 'index',
            file: `dist/index.umd.js`,
            format: 'umd',
            sourcemap: true,
            globals,
        },
    ],
    plugins
};