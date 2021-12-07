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

describe('scale-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-link>default</scale-link>');
    const element = await page.find('scale-link');
    expect(element).toHaveClass('hydrated');
  });

  it('should set tabindex on its inner element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-link inner-tabindex="5">default</scale-link>'
    );
    const element = await page.find('scale-link >>> a');
    expect(element.getAttribute('tabindex')).toBe('5');
  });
});
