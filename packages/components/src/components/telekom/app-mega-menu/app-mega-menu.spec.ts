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
import { MenuItem } from '../app-interfaces';
import { MegaMenu } from './app-mega-menu';

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

describe('MegaMenu', () => {
  let page: SpecPage;

  describe('snapshots', async () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [MegaMenu],
        html: `<app-mega-menu></app-mega-menu>`,
      });
    });
    it('smoke test', async () => {
      expect(page.root).toMatchSnapshot();
    });

    it('hasSlots', async () => {
      page = await newSpecPage({
        components: [MegaMenu],
        html: `
				  <app-mega-menu>
					  <div slot="custom-body"></div>
				  </app-mega-menu>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('MenuItem with children', async () => {
      const navigation: MenuItem[] = [nav];
      page.root.navigation = navigation;
      page.root.activeRouteId = nav.children[0].id;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });

    it('MenuItem w/o children', async () => {
      const { children, ...navWoChildren } = nav;
      const navigation: MenuItem[] = [navWoChildren];
      page.root.navigation = navigation;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('mocking', async () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [MegaMenu],
        html: `<app-mega-menu></app-mega-menu>`,
      });
    });
    it('should trigger hide() on keydown', async () => {
      page.root.navigation = [nav];
      page.root.hide = jest.fn();
      await page.waitForChanges();
      const anchor = page.root.querySelector('.mega-menu__row-item');
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

    it('should trigger hide() on click', async () => {
      page.root.navigation = [nav];
      page.root.hide = jest.fn();
      nav.children[0].onClick = jest.fn();
      await page.waitForChanges();
      const anchor = page.root.querySelector('.mega-menu__row-item');
      anchor.dispatchEvent(new Event('click'));

      await page.waitForChanges();
      expect(page.root.hide).toHaveBeenCalled();
      expect(nav.children[0].onClick).toHaveBeenCalled();
    });
  });
});
