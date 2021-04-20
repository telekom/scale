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

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

jest.setTimeout(10000);

expect.extend({
  toMatchImageSnapshot: configureToMatchImageSnapshot({
    failureThreshold: '0.00',
    failureThresholdType: 'percent',
  }),
});
