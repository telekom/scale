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

import { clamp } from './utils';

describe('functions', () => {
  it('clamp() returns max if value > max', () => {
    expect(clamp(11, 5, 10)).toBe(10);
  });
  it('clamp() returns min if value < min', () => {
    expect(clamp(4, 5, 10)).toBe(5);
  });
});
