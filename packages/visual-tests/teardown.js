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

const fs = require('fs');
const fse = require('fs-extra');

const { teardown: teardownPuppeteer } = require('jest-puppeteer-docker');

module.exports = async function globalTeardown(jestConfig) {
  global.__SERVER__.close();
  await teardownPuppeteer(jestConfig);

  fs.copyFileSync(
    `${__dirname}/inject-fail-images.js`,
    `${__dirname}/report/inject-fail-images.js`
  );

  try {
    fse.copySync(
      `${__dirname}/src/__image_snapshots__/__diff_output__`,
      `${__dirname}/report/__diff_output__`,
      {
        overwrite: true,
      }
    );
  } catch {}
};
