# Scale Nuxt.js module

A Nuxt.js module to enable custom Scale theme injection.

## Installation

- To install with npm: `npm install @scaleds/nuxt-module`
- To install using Yarn: `yarn add @scaleds/nuxt-module`

## Usage

Edit your `nuxt-config.js` and add a new entry into the plugins modules, similar to the example below:

```js
export default {
  ...{},
  modules: ["@scaleds/nuxt-module"],
  scaled: {
    theme: {
      shape: {
        borderRadius: 0
      }
    }
  },
  ...{}
};
```
