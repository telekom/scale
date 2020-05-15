import { ANIMATIONS } from '@proyecto26/animatable-component';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@scaleds/nuxt-module'],
  /*
   ** scaled configuration
   */
  scaled: {
    theme: {
      shape: {
        borderRadius: 0,
      },
      components: {
        Modal: {
          transitions: {
            modalContent: {
              IN: {
                duration: 200,
                transition: ANIMATIONS.FLIP_IN_HOR_TOP,
              },
              OUT: {
                transition: ANIMATIONS.FLIP_OUT_X,
                duration: 200,
              },
            },
            backDrop: {
              IN: {
                duration: 200,
                transition: ANIMATIONS.FADE_IN,
              },
              OUT: {
                transition: ANIMATIONS.FADE_OUT,
                duration: 200,
              },
            },
          },
        },
      },
    },

  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
