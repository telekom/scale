import Vue from 'vue'
import App from './App.vue'
import { defineCustomElements, applyPolyfills } from '@scaleds/components/loader'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/t-\w*/]

applyPolyfills().then(() => {
  defineCustomElements(window);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
