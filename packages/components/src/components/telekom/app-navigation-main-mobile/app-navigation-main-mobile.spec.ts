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
import { MenuItem } from '../app-interfaces';
import { MainNavigationMobile } from './app-navigation-main-mobile';

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

describe('AppNavigationMainMobile', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MainNavigationMobile],
      html: `<app-navigation-main-mobile></app-navigation-main-mobile>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle menuitem', async () => {
    const navigation: MenuItem[] = [nav];
    page.root.navigation = navigation;
    page.root.activeRouteId = nav.children[0].id;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should handle keydown on escape', async () => {
    page.root.navigation = [nav];
    page.root.hide = jest.fn();
    await page.waitForChanges();
    const element = page.doc.querySelector('a');
    element.dispatchEvent(
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
  it('should handle without childs', async () => {
    const { children, ...navWoChildren } = nav;
    const navigation: MenuItem[] = [navWoChildren];
    page.root.navigation = navigation;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
