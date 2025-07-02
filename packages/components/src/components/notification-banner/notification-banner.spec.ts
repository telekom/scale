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
import { NotificationBanner } from './notification-banner';

describe('NotificationBanner', () => {
  let element;

  beforeEach(async () => {
    element = new NotificationBanner();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [NotificationBanner],
      html: `<scale-notification-banner opened="true"></scale-notification-banner>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'warning';
    expect(element.getCssClassMap()).toContain('variant-warning');
  });

  it('should test the close() fucntion', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    expect(element.opened).toBe(false);
  });

  it('handle variant prop', async () => {
    const page = await newSpecPage({
      components: [NotificationBanner],
      html: `<scale-notification-banner opened="true">Label</scale-notification-banner>`,
    });
    page.root.variant = 'error';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'warning';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'informational';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'success';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should emit onClick and set opened to false', async () => {
    const page = await newSpecPage({
      components: [NotificationBanner],
      html: `<scale-notification-banner opened="true" dismissible="true">Label</scale-notification-banner>`,
    });
    const closeButton = page.root.shadowRoot.querySelector(
      '.notification-banner__button-close'
    );
    await page.waitForChanges();
    closeButton.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.rootInstance.opened).toBe(false);
  });
});
