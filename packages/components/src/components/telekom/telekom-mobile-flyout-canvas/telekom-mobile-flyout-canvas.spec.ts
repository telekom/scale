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

import { newSpecPage } from '@stencil/core/testing';
import { TelekomMobileFlyoutCanvas } from './telekom-mobile-flyout-canvas';

describe('scale-telekom-mobile-flyout-canvas', () => {
  it('renders the app name as a link when appNameLink is set', async () => {
    const handleClick = jest.fn();
    const page = await newSpecPage({
      components: [TelekomMobileFlyoutCanvas],
      html: `<scale-telekom-mobile-flyout-canvas app-name="Application Name" app-name-link="/foo"></scale-telekom-mobile-flyout-canvas>`,
    });

    page.root.appNameClick = handleClick;
    await page.waitForChanges();

    const link = page.root.shadowRoot.querySelector(
      '[part="heading"] a'
    ) as HTMLAnchorElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/foo');
    expect(link.textContent).toBe('Application Name');

    link.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the app name as plain text when neither appNameLink nor appNameClick is set', async () => {
    const page = await newSpecPage({
      components: [TelekomMobileFlyoutCanvas],
      html: `<scale-telekom-mobile-flyout-canvas app-name="Application Name"></scale-telekom-mobile-flyout-canvas>`,
    });

    const heading = page.root.shadowRoot.querySelector('[part="heading"]');
    const link = heading.querySelector('a');

    expect(link).toBeNull();
    expect(heading.textContent).toBe('Application Name');
  });

  it('renders the app name as an action link when only appNameClick is set', async () => {
    const handleClick = jest.fn();
    const page = await newSpecPage({
      components: [TelekomMobileFlyoutCanvas],
      html: `<scale-telekom-mobile-flyout-canvas app-name="Application Name"></scale-telekom-mobile-flyout-canvas>`,
    });

    page.root.appNameClick = handleClick;
    await page.waitForChanges();

    const link = page.root.shadowRoot.querySelector(
      '[part="heading"] a'
    ) as HTMLAnchorElement;

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('javascript:void(0);');

    link.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
