import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
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
            module: true,
            extensions
        }),
        babel({
            exclude: "node_modules/**",
            extensions
        })
    ]
};

export default Object.assign({}, config)
