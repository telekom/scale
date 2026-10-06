import { createApp } from 'vue'
import { defineCustomElements } from '@telekom/scale-components/loader'
import '@telekom/scale-components/dist/scale-components/scale-components.css'

import App from './App.vue'

defineCustomElements(window)

createApp(App).mount('#app')
