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
import { Header } from './app-header';

const keyboardEvent = (key) =>
  new KeyboardEvent('keydown', {
    view: window,
    bubbles: true,
    cancelable: true,
    key,
  });

describe('app-Header', () => {
  let page: SpecPage;

  describe('snapshots', () => {
    it('smoke test', async () => {
      page = await newSpecPage({
        components: [Header],
        html: `<scale-app-header></scale-app-header>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('hasSlots', async () => {
      page = await newSpecPage({
        components: [Header],
        html: `
         <scale-app-header>
           <div slot="menu-main"></div>
           <div slot="menu-icon"></div>
           <div slot="menu-sector"></div>
           <div slot="menu-addon"></div>
           <div slot="menu-mobile"></div>
           <div slot="logo"></div>
         </scale-app-header>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  it('check props', async () => {
    page = await newSpecPage({
      components: [Header],
      html: `
       <scale-app-header
         logo-href="logoHref"
         logo-title="logoTitle" 
         logo-hide-title="false"
         claim-lang="us"
         portal-name="portalName",
         active-route-id="activeRouteId"
         active-sector-id="activeSectorId"
         mega-menu-visible="true"
         mobile-menu-visible="true"
       ></scale-app-header>`,
    });
    expect(page.rootInstance.logoHref).toBe('logoHref');
    expect(page.rootInstance.logoTitle).toBe('logoTitle');
    expect(page.rootInstance.logoHideTitle).toBe(false);
    expect(page.rootInstance.claimLang).toBe('us');
    expect(page.rootInstance.portalName).toBe('portalName');
    expect(page.rootInstance.activeRouteId).toBe('activeRouteId');
    expect(page.rootInstance.activeSectorId).toBe('activeSectorId');
    expect(page.rootInstance.megaMenuVisible).toBe(true);
    expect(page.rootInstance.mobileMenuVisible).toBe(true);
  });

  describe('functions', () => {
    it('handleActiveSegment()', async () => {
      const testObj = {};
      const element = new Header();
      element.handleActiveSegment(1);
      expect(element.activeSegment).toEqual(testObj);
    });

    it('megaMenuVisibleChange()', async () => {
      const element = new Header();
      element.visibleMegaMenu = '';
      element.megaMenuVisibleChange('visible');
      expect(element.visibleMegaMenu).toEqual('visible');
    });

    it('onScroll()', async () => {
      const element = new Header();
      element.scrolled = true;
      element.onScroll();
      expect(element.scrolled).toEqual(false);
    });

    describe('emitter', () => {
      beforeEach(async () => {
        page = await newSpecPage({
          components: [Header],
          html: `<scale-app-header></scale-app-header>`,
        });
      });

      it('handleMobileMenu(event) toggles mobileMenu', async () => {
        const event = keyboardEvent('Enter');
        page.rootInstance.mobileMenu = false;
        page.rootInstance.handleMobileMenu(event);
        await page.waitForChanges();
        expect(page.rootInstance.mobileMenu).toBe(true);
      });

      it('handleMobileMenu(event) does not toggle mobileMenu', async () => {
        const event = keyboardEvent('Enter');
        page.rootInstance.mobileMenu = true;
        page.rootInstance.handleMobileMenu(event);
        await page.waitForChanges();
        expect(page.rootInstance.mobileMenu).toBe(true);
      });

      it('handleMobileMenu(event) does not toggle mobileMenu', async () => {
        const event = keyboardEvent('Escape');
        page.rootInstance.mobileMenu = false;
        page.rootInstance.handleMobileMenu(event);
        await page.waitForChanges();
        expect(page.rootInstance.mobileMenu).toBe(false);
      });

      it('handleMobileMenu(event) does toggle mobileMenu', async () => {
        const event = keyboardEvent('Escape');
        page.rootInstance.mobileMenu = true;
        page.rootInstance.handleMobileMenu(event);
        await page.waitForChanges();
        expect(page.rootInstance.mobileMenu).toBe(false);
      });

      it('Escape sets visibleMegaMenu to "" ', async () => {
        page.root.visibleMegaMenu = 'test';
        const ul = page.root.querySelector('.main-navigation');
        const event = keyboardEvent('Escape');
        ul.dispatchEvent(event);
        await page.waitForChanges();
        expect(page.rootInstance.visibleMegaMenu).toBe('');
      });

      it('triggers closeMenu Listener', async () => {
        page.root.dispatchEvent(new Event('closeMenu', { bubbles: true }));
        await page.waitForChanges();
        expect(page.rootInstance.mobileMenu).toBe(false);
      });

      /* ToDo
       it('triggers closeMenu Listener', async () => { });
       */

      /* ToDo
       it('raise test coverage', async () => {});
       */
    });
  });
});
