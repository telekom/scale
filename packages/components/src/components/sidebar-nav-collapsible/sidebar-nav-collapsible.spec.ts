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
import { SidebarNavCollapsible } from './sidebar-nav-collapsible';

describe('SidebarNavCollapsible', () => {
  let page: SpecPage;

  describe('snapshots', async () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [SidebarNavCollapsible],
        html: `<scale-sidebar-nav-collapsible></scale-sidebar-nav-collapsible>`,
      });
    });
    it('smoke test', async () => {
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('emitter', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [SidebarNavCollapsible],
        html: `<scale-sidebar-nav-collapsible></scale-sidebar-nav-collapsible>`,
      });
    });

    it('should set expanded to false onClick', async () => {
      page.rootInstance.expanded = true;
      const sidebarNavCollapsible = page.root.shadowRoot.querySelector(
        '.sidebar-nav-collapsible__button'
      );
      await page.waitForChanges();
      sidebarNavCollapsible.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.rootInstance.expanded).toBe(false);
    });

    it('exit handleKeydown if event metaKey', async () => {
      const sidebarNavCollapsible = page.root.shadowRoot.querySelector(
        '.sidebar-nav-collapsible__button'
      );
      await page.waitForChanges();
      sidebarNavCollapsible.dispatchEvent(
        new KeyboardEvent('keydown', {
          view: window,
          bubbles: true,
          cancelable: true,
          metaKey: true,
        })
      );
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });

    it('toggle expanded if event.code = "Space"', async () => {
      page.rootInstance.expanded = true;
      const sidebarNavCollapsible = page.root.shadowRoot.querySelector(
        '.sidebar-nav-collapsible__button'
      );
      await page.waitForChanges();
      sidebarNavCollapsible.dispatchEvent(
        new KeyboardEvent('keydown', {
          view: window,
          bubbles: true,
          cancelable: true,
          code: 'Space',
        })
      );
      await page.waitForChanges();
      expect(page.rootInstance.expanded).toBe(false);
    });
  });

  describe('functions', () => {
    it('nestingLevelChanged turns bold to true', async () => {
      const element = new SidebarNavCollapsible();
      element.bold = false;
      element.nestingLevelChanged(1);
      expect(element.bold).toBe(true);
    });
  });

  describe('has css classes -> getCssClassMap()', () => {
    it('has class component', () => {
      const element = new SidebarNavCollapsible();
      expect(element.getCssClassMap()).toContain('sidebar-nav-collapsible');
    });

    it('has class sidebar-nav-collapsible--condensed', () => {
      const element = new SidebarNavCollapsible();
      element.condensed = true;
      expect(element.getCssClassMap()).toContain(
        'sidebar-nav-collapsible--condensed'
      );
    });

    it('has class sidebar-nav-collapsible--active', () => {
      const element = new SidebarNavCollapsible();
      element.active = true;
      expect(element.getCssClassMap()).toContain(
        'sidebar-nav-collapsible--active'
      );
    });
  });

  describe('has css classes -> getBasePartMap()', () => {
    it('has class component', () => {
      const element = new SidebarNavCollapsible();
      expect(element.getBasePartMap()).toContain('sidebar-nav-collapsible');
    });

    it('has class sidebar-nav-collapsible--condensed', () => {
      const element = new SidebarNavCollapsible();
      element.condensed = true;
      expect(element.getBasePartMap()).toContain('condensed');
    });

    it('has class sidebar-nav-collapsible--active', () => {
      const element = new SidebarNavCollapsible();
      element.active = true;
      expect(element.getBasePartMap()).toContain('active');
    });
  });
});
