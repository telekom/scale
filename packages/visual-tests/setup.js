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

const express = require('express');
const { setup: setupPuppeteer } = require('jest-puppeteer-docker');
const path = require('path');

module.exports = async jestConfig => {
  const app = express();
  const directory = 'storybook-static';
  app.use(express.static(path.join(__dirname, directory)));

  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

  global.__SERVER__ = app.listen(3123);

  await setupPuppeteer(jestConfig);
};
