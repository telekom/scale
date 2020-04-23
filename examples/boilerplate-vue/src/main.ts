import Vue from 'vue'
import App from './App.vue'
import { defineCustomElements, applyPolyfills } from '@scaleds/components/loader'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/scale-\w*/]

applyPolyfills().then(() => {
  defineCustomElements(window);
});

import { useTheme } from '@scaleds/components/dist/theme.esm.js';

useTheme({
  shape: {
    borderRadius: 24
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
