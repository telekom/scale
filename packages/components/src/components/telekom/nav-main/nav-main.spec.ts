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
import { NavMain } from './nav-main';

describe('NavMain', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavMain],
      html: `<scale-nav-main></scale-nav-main>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle is active props', async () => {
    const specPage = await newSpecPage({
      components: [NavMain],
      html: `
      <scale-nav-main
        active=true
        mega-menu-visible=true
        name='nameDummy'
      ></scale-nav-main>`,
    });
    expect(specPage.root).toMatchSnapshot();
  });
  it('should handle css classes', () => {
    const element = new NavMain();

    // DEPRECATED - megaMenuVisible should replace isMegaMenuVisible
    element.megaMenuVisible = true;
    expect(element.getCssClassMap()).toContain('mega-menu--visible');

    element.isMegaMenuVisible = true;
    expect(element.getCssClassMap()).toContain('mega-menu--visible');

    // DEPRECATED - active should replace isActive
    element.isActive = true;
    expect(element.getCssClassMap()).toContain('selected');

    element.active = true;
    expect(element.getCssClassMap()).toContain('selected');
  });
});
