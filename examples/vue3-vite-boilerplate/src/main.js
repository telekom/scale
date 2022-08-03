import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {defineCustomElements} from "@telekom/scale-components/loader"
import '@telekom/scale-components/dist/scale-components/scale-components.css';

const app = createApp(App);
app.mount('#app')
defineCustomElements();
