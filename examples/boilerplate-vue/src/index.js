import Vue from "vue";
import App from "./App.vue";
import {
  defineCustomElements,
  applyPolyfills
} from "@telekom/scale-components-neutral/loader";
import "@telekom/scale-components-neutral/dist/scale-components/scale-components.css";

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/scale-\w*/];

new Vue({
  render: h => h(App)
}).$mount("#app");
