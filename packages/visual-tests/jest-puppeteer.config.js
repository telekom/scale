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

const getConfig = require('jest-puppeteer-docker/lib/config');

const baseConfig = getConfig();
const customConfig = Object.assign({}, baseConfig);

customConfig.connect.defaultViewport = {
  width: 1040,
  height: 768,
};

customConfig.chromiumFlags = ['--ignore-certificate-errors'];
customConfig.browserContext = 'incognito';

// https://github.com/puppeteer/puppeteer/issues/1947
if (process.env.DOCKER_DEFAULT_PLATFORM === 'linux/amd64') {
  // customConfig.chromiumFlags.push([
  //   // '--no-sandbox',
  //   // '--disable-setuid-sandbox',
  //   // '--disable-dev-shm-usage',
  //   // '--single-process'
  // ]);
}

module.exports = customConfig;
