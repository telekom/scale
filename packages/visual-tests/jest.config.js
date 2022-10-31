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

module.exports = {
  preset: 'jest-puppeteer-docker',
  setupFilesAfterEnv: ['./test-environment-setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testMatch: ['**/?(*.)+(visual.spec).[tj]s?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './report/summary.html',
        pageTitle: 'Component test results',
        includeFailureMsg: true,
        customScriptPath: './inject-fail-images.js',
      },
    ],
    './outdated-snapshot-reporter.js',
  ],
};
