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
// import { remove } from 'lodash';
import { NotificationToast } from './notification-toast';

describe('NotificationToast ', () => {
  let element;

  beforeEach(async () => {
    element = new NotificationToast();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [NotificationToast],
      html: `<scale-notification-toast opened="true"></scale-notification-toast>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'warning';
    expect(element.getCssClassMap()).toContain('variant-warning');
  });

  it('handle variant prop', async () => {
    const page = await newSpecPage({
      components: [NotificationToast],
      html: `<scale-notification-toast opened="true">Label</scale-notification-toast>`,
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
});
