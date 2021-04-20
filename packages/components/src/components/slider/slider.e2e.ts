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

import { newE2EPage } from '@stencil/core/testing';

describe('scale-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-slider/>');
    const element = await page.find('scale-slider');
    expect(element).toHaveClass('hydrated');
  });
});
