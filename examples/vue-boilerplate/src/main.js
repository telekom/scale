import Vue from 'vue'
import { defineCustomElements } from '@telekom/scale-components-neutral/loader'
import '@telekom/scale-components-neutral/dist/scale-components/scale-components.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/scale-\w*/];

defineCustomElements(window)

new Vue({
  render: h => h(App),
}).$mount('#app')
