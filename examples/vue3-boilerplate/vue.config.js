module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // https://v3.vuejs.org/guide/migration/custom-elements-interop.html#autonomous-custom-elements
          options.compilerOptions = {
            isCustomElement: (tag) => tag.startsWith('scale-')
          }
          return options
        })
  }
}
