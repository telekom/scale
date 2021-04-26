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

var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');
var fs = require('fs');

module.exports = function (root, port = 3334) {
  const server = connect()
    .use(serveStatic(root, { index: false }))
    .listen(port, () => {
      console.log(`Serving ${root} on port ${port}`);
    });

  server.rootURL = `http://localhost:${port}/`;
  server.pageURLs = fs
    .readdirSync(root)
    .filter((fn) => /\.html?$/i.test(fn))
    .map((fn) => server.rootURL + fn);
  return server;
};
