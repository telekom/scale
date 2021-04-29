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
import { NavigationSectorMobile } from './app-navigation-sector-mobile';
import { MenuItem } from '../app-interfaces';

const nav = {
  name: 'nav1',
  id: 'menuItem1',
  href: '#',
  children: [
    {
      name: 'menuItem1-1',
      id: 'menuItem1-1',
      href: '#',
      level: 2,
      onClick: (event: KeyboardEvent) => {
        return event.key;
      },
    },
  ],
  level: 1,
};

describe('NavigationSectorMobile', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavigationSectorMobile],
      html: `<app-navigation-sector-mobile></app-navigation-sector-mobile>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle menuItem', async () => {
    const navigation: MenuItem[] = [nav];
    page.root.navigation = navigation;
    page.root.activeSectorId = nav.children[0].id;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should handle menuItem w/o children', async () => {
    const { children, ...navWoChildren } = nav;
    const navigation: MenuItem[] = [navWoChildren];
    page.root.navigation = navigation;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should handle on keydown esc', async () => {
    page.root.navigation = [nav];
    page.root.hide = jest.fn();
    await page.waitForChanges();
    const anchor = page.root.querySelector('a');
    anchor.dispatchEvent(
      new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        cancelable: true,
        key: 'Escape',
      })
    );
    await page.waitForChanges();
    expect(page.root.hide).toHaveBeenCalled();
  });
});
