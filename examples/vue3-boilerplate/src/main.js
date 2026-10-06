import { createApp } from 'vue'
import { defineCustomElements } from '@telekom/scale-components-neutral/loader'
import '@telekom/scale-components-neutral/dist/scale-components/scale-components.css'

import App from './App.vue'

defineCustomElements(window)

createApp(App).mount('#app')
