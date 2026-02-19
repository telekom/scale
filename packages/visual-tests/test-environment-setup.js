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
const path = require('path');
const initExtensions = require('puppeteer-extensions');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

jest.setTimeout(10000);

const testFileName = global.jasmine.testPath;
const testPath = path.dirname(testFileName);

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: '0.00',
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

global.visualCheck = async (options) => {
  await global.page.waitForSelector('#root');
  const previewHtml = await global.page.$('body');
  expect(await previewHtml.screenshot()).toMatchImageSnapshot(options);
};

global.extensions = initExtensions(global.page);

global.runSetup = async (id) => {
  await global.page.goto(
    `http://host.docker.internal:3123/iframe.html?id=${id}&viewMode=story`
  );
  await global.extensions.turnOffAnimations();
  await global.page.evaluate(() => {
    [
      '--telekom-motion-duration-immediate',
      '--telekom-motion-duration-transition',
      '--telekom-motion-duration-animation',
      '--telekom-motion-duration-animation-deliberate',
    ].forEach((transitionSpeed) => {
      document.body.style.setProperty(transitionSpeed, '0s');
    });
    [
      '--telekom-motion-easing-standard',
      '--telekom-motion-easing-enter',
      '--telekom-motion-easing-leave',
    ].forEach((motion) => {
      document.body.style.setProperty(motion, 'unset');
    });
  });
};

global.runColorSetup = async (id, mode) => {
  await global.page.goto(
    `http://host.docker.internal:3123/iframe.html?id=${id}&viewMode=story`
  );
  await global.page.evaluate((colorMode) => {
    localStorage.setItem('persistedColorMode', JSON.stringify(colorMode));
  }, mode);
};
