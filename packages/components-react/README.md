# Scale and React

Unfortunately `React` brings it's own synthetic event system and handles all props as HTML attributes, more info: <a href="https://custom-elements-everywhere.com/">Custom Elements Everywhere</a>.

To work around this problems we provide custom element wrappers for better developer experience.

Please note that you will need to install both, the `@telekom/scale-components` as well as the `@telekom/scale-components-react` packages.

Once you have installed both packages and defined the custom elements, `Scale` components behave mostly the way you would expect a `React` component to behave!

## src/index.html
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@telekom/scale-components/loader';
import App from './App';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import './index.css';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

ReactDOM.render(<App />, document.getElementById('root'));
```

## src/App.jsx
```jsx
import React from 'react';
import { ScaleButton } from '@telekom/scale-components-react';
import './App.css';

const App: React.FC = () => (
  <div>
    <ScaleButton>Label</ScaleButton>
  </div>
);

export default App;

```

## Events in React

In order to prevent collisions with standard events and compatibility with other libraries and frameworks,
some components of `Scale` are using custom event names. You can find documentation for the custom events on the respective component pages in the `docs` section.

Events in React are prefixed with: `Scale{EventName}`

---
Find [Telekom Scale on GitHub](https://github.com/telekom/scale).
