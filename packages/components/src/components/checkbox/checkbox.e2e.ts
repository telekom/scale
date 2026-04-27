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

  it('uses the dark-mode danger helper text color', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<div data-mode="dark"><scale-checkbox label="Label" helper-text="This is the error message" invalid></scale-checkbox></div>'
    );

    const color = await page.$eval(
      'scale-checkbox [part="helper-text"]',
      (element: HTMLElement) => getComputedStyle(element).color
    );

    expect(color).toBe('rgb(251, 106, 85)');
  });
});
