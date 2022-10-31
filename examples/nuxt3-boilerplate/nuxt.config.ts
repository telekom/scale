import { defineNuxtConfig } from 'nuxt'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['@telekom/scale-components']
  },  
  vue: {
    compilerOptions: {
      isCustomElement: tag =>  tag.startsWith('scale-')
    }
  }
})
