/* @vite-ignore */
import  {defineCustomElements, applyPolyfills} from "@telekom/scale-components-neutral/loader"

export default defineNuxtPlugin(nuxtApp => {
    if (process.client) {
        applyPolyfills().then(() => {
          defineCustomElements(window);
        });
      }    
  })