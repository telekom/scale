import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {defineCustomElements} from "@telekom/scale-components-neutral/loader"
import '@telekom/scale-components-neutral/dist/scale-components/scale-components.css';

const app = createApp(App);
app.mount('#app')
defineCustomElements();
