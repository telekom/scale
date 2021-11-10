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

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { NavIcon } from './nav-icon';
describe('nav-icon', () => {
  let page: SpecPage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavIcon],
      html: `<scale-nav-icon></scale-nav-icon>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should reflect to set attributes/props', async () => {
    const specPage = await newSpecPage({
      components: [NavIcon],
      html: `<scale-nav-icon
                is-active="true"
                active="true"
                href="href"
                click-link="true"
                icon="icon"
                is-mobile-menu-open="true"
                mobile-menu-open="true"
                ref-mobile-menu-toggle="">
              </scale-nav-icon>`,
    });
    // DEPRECATED - active should replace isActive
    expect(specPage.rootInstance.isActive).toBe(true);
    expect(specPage.rootInstance.active).toBe(true);
    expect(specPage.rootInstance.href).toBe('href');
    expect(specPage.rootInstance.clickLink).toBe('true');
    expect(specPage.rootInstance.icon).toBe('icon');
    // DEPRECATED - active should replace isActive
    expect(specPage.rootInstance.isMobileMenuOpen).toBe(true);
    expect(specPage.rootInstance.mobileMenuOpen).toBe(true);
    expect(specPage.rootInstance.refMobileMenuToggle).toBe('');
  });
  it('should trigger onClick()', async () => {
    page.root.clickLink = jest.fn();
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.click();
    await page.waitForChanges();
    expect(page.root.clickLink).toHaveBeenCalled();
  });
  it('should trigger onKeyDown', async () => {
    page.root.clickLink = jest.fn();
    page.root.refMobileMenuToggle = () => {};
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.dispatchEvent(
      new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        cancelable: true,
        key: 'Escape',
      })
    );
    await page.waitForChanges();
    expect(page.root.clickLink).toHaveBeenCalled();
  });
  it('should trigger onClick()', async () => {
    page.root.clickLink = jest.fn();
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.dispatchEvent(
      new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        cancelable: true,
        key: 'Escape',
      })
    );
    await page.waitForChanges();
    expect(page.root.clickLink).not.toHaveBeenCalled();
  });
});
