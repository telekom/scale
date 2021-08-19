/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require('path')
const fs = require('fs')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['scaled'],
    ...moduleOptions,
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'plugin.js',
    options,
  })

  const {
    renderToString,
  } = require('@telekom/scale-components-neutral/hydrate/index.js')

  // @Hook: render:route
  this.nuxt.hook('render:route', async (url, page) => {
    const { html } = await renderToString(page.html, { url })
    page.html = html
  })

  // @Hook: generate:page
  this.nuxt.hook('generate:page', async (page) => {
    const { html } = await renderToString(page.html, {
      url: page.path,
    })

    page.html = html
  })
}
