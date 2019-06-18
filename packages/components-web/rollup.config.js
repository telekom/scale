import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import path from "path";

const pkg = require(path.join(process.cwd(), "package.json"));
const extensions = [".ts", ".js"]

const config = {
    input: "./src/index.ts",
    output: {
        file: `dist/components-web.js`,
        format: "iife",
        name: "index",
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            mainFields: ['module', 'main'],
            extensions
        }),
        babel({
            exclude: "node_modules/**",
            extensions
        }),
        commonjs()
    ]
};

export default Object.assign({}, config)
