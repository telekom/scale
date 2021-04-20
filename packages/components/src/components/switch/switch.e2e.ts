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

describe('scale-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-switch></scale-switch>');
    const element = await page.find('scale-switch');
    expect(element).toHaveClass('hydrated');
  });

  // it('should not toggle to active when switch is disabled ', async () => {
  //   const page = await newE2EPage({
  //     html: `<t-switch disabled="true" active="false"></t-switch>`,
  //   });
  //   const ele = await page.find('t-switch >>> .switch');
  //   await ele.click();
  //   expect(ele).not.toContain('.switch--active');
  // });
});
