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
import { TabHeader } from './tab-header';

describe('TabHeader', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [TabHeader],
      html: `<scale-tab-header></scale-tab-header>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should handle selected', async () => {
    const specPage = await newSpecPage({
      components: [TabHeader],
      html: `<scale-tab-header selected=true></scale-tab-header>`,
    });
    specPage.root.shadowRoot.querySelector('slot').remove();
    specPage.rootInstance.selected = false;
    await specPage.waitForChanges();
    expect(specPage.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    const element = new TabHeader();

    element.selected = true;
    expect(element.getCssClassMap()).toContain('selected');

    element.hasFocus = true;
    expect(element.getCssClassMap()).toContain('has-focus');

    element.size = 'large';
    expect(element.getCssClassMap()).toContain('large');
  });

  it('should handle blur event', async () => {
    const element = page.root.shadowRoot.host;
    await element.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(page.rootInstance.hasFocus).toBeFalsy();
  });

  it('should handle focus event', async () => {
    const element = page.root.shadowRoot.host;
    await element.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(page.rootInstance.hasFocus).toBeTruthy();
  });
});
