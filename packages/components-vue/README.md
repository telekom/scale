# Scale and Vue

`Vue` works well with custom elements, but has some minor limitations.

To work around this problems we provide custom element wrappers for better developer experience.

Please note that you will need to install both, the `@telekom/scale-components` as well as the `@telekom/scale-components-vue` packages.

Once you have installed both packages and defined the custom elements, `Scale` components behave mostly the way you would expect a `Vue` component to behave!

## src/main.ts

```javascript
import Vue from "vue";
import App from "./App.vue";
import { applyPolyfills, defineCustomElements } from "@telekom/scale-components/loader";
import "@telekom/scale-components/dist/scale-components/scale-components.css";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/scale-\w*/];

applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  render: h => h(App)
}).$mount("#app");

```

##  src/App.vue

```html
<template>
  <div>
    <scale-button>Click!</scale-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { ScaleButton } from "@telekom/scale-components-vue";

export default Vue.extend({
  name: "app",
  components: { ScaleButton },
});
</script>
```

## Events in Vue

In order to prevent collisions with standard events and compatibility with other libraries and frameworks,
some components of `Scale` are using custom event names. You can find documentation for the custom events on the respective component pages in the `docs` section.

Events in Vue are prefixed with: `scale-{event-name}`

---
Find [Telekom Scale on GitHub](https://github.com/telekom/scale).
