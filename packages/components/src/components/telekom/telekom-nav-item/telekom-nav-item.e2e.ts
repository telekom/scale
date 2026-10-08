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

describe('scale-telekom-nav-item', () => {
  it('loads without a link or button child inside a menu', async () => {
    const page = await newE2EPage();
    const pageErrors: string[] = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.setContent(
      '<div role="menu"><scale-telekom-nav-item>Section</scale-telekom-nav-item></div>'
    );

    const element = await page.find('scale-telekom-nav-item');
    await page.waitForChanges();

    expect(element).toHaveClass('hydrated');
    expect(pageErrors).toEqual([]);
  });
});
