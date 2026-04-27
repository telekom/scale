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
import { Notification } from './notification';

describe('Notification ', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Notification],
      html: `<scale-notification-toast opened></scale-notification-toast>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match snapshot, type=banner', async () => {
    const page = await newSpecPage({
      components: [Notification],
      html: `<scale-notification-toast opened type="banner"></scale-notification-toast>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match snapshot, type=toast', async () => {
    const page = await newSpecPage({
      components: [Notification],
      html: `<scale-notification-toast opened type="toast"></scale-notification-toast>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('wires innerAriaLive to the inner live region when opened later', async () => {
    const page = await newSpecPage({
      components: [Notification],
      html: `<scale-notification heading="Live region" inner-aria-live="polite"></scale-notification>`,
    });

    page.root.opened = true;
    await page.waitForChanges();

    const liveRegion = page.root.shadowRoot.querySelector('[part~="base"]');

    expect(liveRegion.getAttribute('role')).toBe('status');
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');
  });

  it('keeps innerRole=status aligned with a polite live region', async () => {
    const page = await newSpecPage({
      components: [Notification],
      html: `<scale-notification heading="Live region" inner-role="status" opened></scale-notification>`,
    });

    const liveRegion = page.root.shadowRoot.querySelector('[part~="base"]');

    expect(liveRegion.getAttribute('role')).toBe('status');
    expect(liveRegion.getAttribute('aria-live')).toBe('polite');
  });
});
