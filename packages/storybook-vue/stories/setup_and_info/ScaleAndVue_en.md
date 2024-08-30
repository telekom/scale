# Scale and Vue

Vue fully supports web components.

You can find an example boilerplate app in the "examples" folder in the [GitHub repo](https://github.com/telekom/scale/tree/main/examples).

## Setup

First, install the package:

```bash
npm install @telekom/scale-components@next
```

Then load the component library and the CSS in `main.js`:

```js
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';

// ...

defineCustomElements();
```

In order to instruct Vue to treat Scale components as custom elements, [a bit of configuration is needed](https://v3.vuejs.org/guide/migration/custom-elements-interop.html#autonomous-custom-elements).

For **Vue v2**:

```js
// main.js
Vue.config.ignoredElements = [/scale-\w*/];
```

For **Vue v3**, set `compilerOptions.isCustomElement`:

```js
// in vue.config.js (vue-cli)
chainWebpack: (config) => {
  config.module
    .rule('vue')
    .use('vue-loader')
    .tap((options) => {
      // https://v3.vuejs.org/guide/migration/custom-elements-interop.html#autonomous-custom-elements
      options.compilerOptions = {
        isCustomElement: (tag) => tag.startsWith('scale-'),
      };
      return options;
    });
};

// in webpack config
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader',
    options: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('scale-'),
      },
    },
  },
  // ...
];

// in vite.config.js
defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('scale-'),
        },
      },
    }),
  ],
});

// or in main.js (on-the-fly template compilation)
const app = Vue.createApp({});
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('scale-');
```

If your project is using ESLint with `eslint-plugin-vue`, you should also deactivate the rule `vue/no-deprecated-slot-attribute`.

```js
// In .eslintrc.js or in package.json
rules: {
  "vue/no-deprecated-slot-attribute": "off",
},
```

You should now be able to use Scale components in your templates:

```html
<div>
  <scale-button>Click!</scale-button>
</div>
```

## Events in Vue

In order to prevent collisions with standard events and for better compatibility with other libraries and frameworks, the custom events emitted by some Scale components are prefixed with `scale`. Event names are kebab-cased (e.g. scale-change). Note, that before v3 events were camelCased (e.g. `scaleChange`), these are now deprecated, but still available for maintaining backward compatibility. For newest components only kebab-case events apply. You can find the documentation to custom events on the respective component pages in the "docs" section.

You can bind to `scale`-prefixed events with the regular Vue syntax:

```html
<scale-slider @scale-input="handleInput"></scale-slider>
```

## Form Input Bindings

The `v-model` directive does not work with custom elements. Only native form control elements like `input` and `textarea` do.

You can achieve the same results quite easily:

```html
<scale-text-field
  :value="example"
  @scaleChange="example = $event.target.value"
></scale-text-field>
```

## Proxy Package

The automatically generated proxy packages will be removed in v4:

- `@telekom/scale-components-vue`
- `@telekom/scale-components-vue-neutral`

Please use `@telekom/scale-components` directly, support for custom elements is already great.
