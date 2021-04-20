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
import { SidebarNavItem } from './sidebar-nav-item';

describe('SidebarNavItem', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `<scale-sidebar-nav-item></scale-sidebar-nav-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `
        <scale-sidebar-nav-item>
          <a href="#">Some foo</a>
        </scale-sidebar-nav-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot after using currentChanged()', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `
        <scale-sidebar-nav-item>
          <a href="#">Some foo</a>
        </scale-sidebar-nav-item>`,
    });

    page.rootInstance.currentChanged('anytext');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.rootInstance.currentChanged(null);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot after using createScreenReaderOnlySpan()', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `
        <scale-sidebar-nav-item>
          <a href="#">Some foo</a>
        </scale-sidebar-nav-item>`,
    });
    page.rootInstance.current = 'currentText';
    page.rootInstance.createScreenReaderOnlySpan();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.rootInstance.current = '';
    page.rootInstance.createScreenReaderOnlySpan();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('check default props', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `<scale-sidebar-nav-item></scale-sidebar-nav-item>`,
    });
    expect(page.rootInstance.condensed).toBe(false);
    expect(page.rootInstance.bold).toBe(false);
    expect(page.rootInstance.active).toBe(false);
    expect(page.rootInstance.current).toBeNull();
  });

  it('check props being set', async () => {
    const page = await newSpecPage({
      components: [SidebarNavItem],
      html: `<scale-sidebar-nav-item></scale-sidebar-nav-item>`,
    });
    page.root.condensed = true;
    page.root.bold = true;
    page.root.active = true;
    page.root.current = 'current';
    page.root.nestingLevel = 2;
    page.root.styles = 'background : red';
    await page.waitForChanges();
    expect(page.rootInstance.condensed).toBe(true);
    expect(page.rootInstance.bold).toBe(true);
    expect(page.rootInstance.active).toBe(true);
    expect(page.rootInstance.current).toBe('current');
    expect(page.rootInstance.nestingLevel).toBe(2);
    expect(page.rootInstance.styles).toBe('background : red');
  });

  describe('classes', () => {
    it('should handle getCssClassMap() and getBasePartMap()', () => {
      const element = new SidebarNavItem();
      element.bold = true;
      element.condensed = true;
      element.active = true;
      expect(element.getCssClassMap()).toContain('sidebar-nav-item');
      expect(element.getCssClassMap()).toContain('sidebar-nav-item--bold');
      expect(element.getCssClassMap()).toContain('sidebar-nav-item--condensed');
      expect(element.getCssClassMap()).toContain('sidebar-nav-item--active');

      expect(element.getBasePartMap()).toContain('sidebar-nav-item');
      expect(element.getBasePartMap()).toContain('bold');
      expect(element.getBasePartMap()).toContain('condensed');
      expect(element.getBasePartMap()).toContain('active');
    });
  });

  it('should set bold to true if nestingLevel is set to 1', () => {
    const element = new SidebarNavItem();
    expect(element.bold).toBe(false);
    element.nestingLevelChanged(1);
    expect(element.bold).toBe(true);
  });

  it('should set active to true if Watcher currentChanged() is called with a string', () => {
    const element = new SidebarNavItem();
    expect(element.active).toBe(false);
    element.currentChanged('anyString');
    expect(element.active).toBe(true);
  });

  it('should set active to true if componentDidLoad() is called and current has a value', () => {
    const element = new SidebarNavItem();
    element.current = 'anyString';
    element.componentDidLoad();
    expect(element.active).toBe(true);
  });

  /*  it('should set active to true if componentDidLoad() is called and current has a value', () => {
    const element = new SidebarNavItem();
    element.current = 'anyString'
    expect(element.createScreenReaderOnlySpan()).toContainElement()
  }); */
});
