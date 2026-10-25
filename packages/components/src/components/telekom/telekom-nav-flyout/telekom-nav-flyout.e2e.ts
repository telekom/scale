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

describe('scale-telekom-nav-flyout', () => {
  it('opens on the first Enter and follows the anchor on the second', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <a href="#target">Topic One</a>
      <scale-telekom-nav-flyout hover>
        <div>Submenu</div>
      </scale-telekom-nav-flyout>
      <div id="target">Target</div>
    `);

    const trigger = await page.find('a');
    const flyout = await page.find('scale-telekom-nav-flyout');
    await trigger.focus();
    await trigger.press('Enter');
    await page.waitForChanges();

    expect(flyout.getAttribute('expanded')).not.toBeNull();
    expect(page.url()).not.toContain('#target');

    await trigger.press('Enter');
    expect(page.url()).toContain('#target');
  });
});
