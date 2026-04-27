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

describe('scale-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-checkbox/>');
    const element = await page.find('scale-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should submit the native default checkbox value after user interaction', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form>
        <scale-checkbox
          name="scale-checkbox"
          label="Scale checkbox"
        ></scale-checkbox>
      </form>
    `);

    const checkbox = await page.find('scale-checkbox >>> input');
    await checkbox.click();
    await page.waitForChanges();

    const formEntries = await page.evaluate(() =>
      Array.from(new FormData(document.querySelector('form')).entries())
    );

    expect(formEntries).toEqual([['scale-checkbox', 'on']]);
  });

  it('should preserve an explicitly provided checkbox value in forms', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form>
        <scale-checkbox
          checked
          name="scale-checkbox"
          value="newsletter"
          label="Scale checkbox"
        ></scale-checkbox>
      </form>
    `);

    const formEntries = await page.evaluate(() =>
      Array.from(new FormData(document.querySelector('form')).entries())
    );

    expect(formEntries).toEqual([['scale-checkbox', 'newsletter']]);
  });
});
