# Scale and React

React supports web components, but there are a couple of limitations to be aware of, listed below. Fortunately, it's possible to work around them.

You can find an example boilerplate app in the "examples" folder in the [GitHub repo](https://github.com/telekom/scale/tree/main/examples).

## Setup

First, install the package:

```bash
npm install @telekom/scale-components@next
```

Then load the component library and the CSS in `index.js`:

```js
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';

// ...

defineCustomElements();
```

You should now be able to use Scale components without having to import them:

```jsx
import React from 'react';

const App = () => (
  <div>
    <scale-button>Click</scale-button>
  </div>
);

export default App;
```

If you use our automatically generated proxy package `@telekom/scale-components-react` (don't forget to install it first):

```jsx
import React from 'react';
import { ScaleButton } from '@telekom/scale-components-react';

const App = () => (
  <div>
    <ScaleButton>Click</ScaleButton>
  </div>
);

export default App;
```

> In the first snippet, the custom element (aka web component) is used directly (`<scale-button>`); in the second, a React component (`ScaleButton`) is wrapping the actual web component. This wrapper is useful to work around the framework limitations.

## Limitations

### Data Binding

React passes all data to custom elements not as props but as HTML attributes which can only be strings, so objects or arrays will be stringified and you'll end up with `some-attr="[object Object]"`. You can read more about it in this [GitHub issue](https://github.com/facebook/react/issues/11347).

### Custom Events

React has its own [synthetic event system](https://reactjs.org/docs/handling-events.html), which makes it impossible to declaratively bind to custom events. That means `<scale-button onScaleChange={handleChange}>` won't work.

Working around these limitations without help is possible but can be cumbersome and requires some imperative code. So we recommend using a wrapper or interop layer to make things easier.

- [reactify-wc](https://github.com/BBKolton/reactify-wc) — Turn web components into React components
- [@skatejs/val](https://github.com/skatejs/val) — A generic wrapper for better VDOM/DOM integration
- [@telekom/scale-components-react](https://www.npmjs.com/package/@telekom/scale-components-react) — Our own automatically generated proxy package

An example using `reactify-wc` would look like this:

```jsx
import React from 'react';
import reactifyWc from 'reactify-wc';

const ScaleSlider = reactifyWc('scale-slider');

const App = () => {
  const handleInput = (event) => {
    // it works!
  };
  return <ScaleSlider label="Example" onScaleInput={handleInput}></ScaleSlider>;
};

export default App;
```

## Events in React

In order to prevent collisions with standard events and for better compatibility with other libraries and frameworks, the custom events emitted by some Scale components are prefixed with `scale`. Event names are camelCased (e.g. `scaleChange`). You can find the documentation for these custom events on the respective component pages in the "docs" section.

Due to React's [synthetic events](https://reactjs.org/docs/handling-events.html), binding to custom events requires some extra work. You can use an interop layer like the ones listed above, or alternatively use [`ref`](https://reactjs.org/docs/refs-and-the-dom.html) to bind imperatively with `addEventListener`.

## Styles

It's important to remember that most Scale components leverage the Shadow DOM, so it's not possible to apply styles directly from the outside.

Please refer to our [Customization and Themes](./?path=/docs/guidelines-customization-and-themes--page) page for guidance.

`styled-components`-type of techniques will not work. However, it's possible to inline scoped variables overwrites:

```jsx
// ..

const Slider = (
  <ScaleSlider
    label="Example"
    track-small
    style={{
      '--background-track': 'tomato',
      '--color-display-value': 'limegreen',
    }}
  ></ScaleSlider>
);
```

## Proxy Package

The automatically generated proxy packages **might** be deprecated in v4:

- `@telekom/scale-components-react`
- `@telekom/scale-components-react-neutral`

Support for custom elements landed in React in the `@experimental` dist. Please try it out, any feedback is appreciated. See https://github.com/facebook/react/issues/11347#issuecomment-988970952
