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

const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, 'rss_template.xml.hbs'));

const template = hbs.compile(source.toString());

module.exports = {
  build: function (outputFile, options) {
    const output = template({
      title: 'Sketch Library',
      description: 'Sketch Library',
      url: 'http://localhost/sketch_library.sketch',
      version: 1,
      publicationDate: new Date().toUTCString(),
      ...options,
    });

    fs.writeFileSync(outputFile, output);
  },
};
