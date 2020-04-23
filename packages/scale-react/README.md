# Scale-React
React Proxy for Scale Components

# Building steps
- Run `yarn build` inside `packages/scale-react`, this compiles TS inside src/ (which is the output from `@stencil/react-output-target`)

# For local linking and testing
- Run `yarn link` inside `packages/scale-react`
- Run `yarn link "@scaleds/scale-react"` inside `examples/` to use the local `scale-react` package.
- Start the app in `examples/boilerplate-react`
