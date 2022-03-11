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
import { LogoSvg } from './logo-svg';

describe('component prop snapshots', () => {
  let page: any;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [LogoSvg],
      html: `<scale-logo-svg></scale-logo-svg>`,
    });
  });

  const language:
    | 'de'
    | 'en'
    | 'cz'
    | 'hr'
    | 'hu'
    | 'me'
    | 'mk_lat'
    | 'mk_kyr'
    | 'ro'
    | 'sk'
    | '' = 'en';
  const color: string = 'magenta';

  describe('all props', () => {
    it('are not set', async () => {
      await page.waitForChanges();
      expect(page.rootInstance.language).toBe(language);
      expect(page.rootInstance.color).toBe(color);
      expect(page.root).toMatchSnapshot();
    });
    it('are set', async () => {
      const setLanguage = 'hr';
      const setColor = 'black';
      const setAccessibilityTitle = 'title';

      page.rootInstance.language = setLanguage;
      page.rootInstance.color = setColor;
      page.rootInstance.accessibilityTitle = setAccessibilityTitle;

      await page.waitForChanges();
      expect(page.rootInstance.language).toBe(setLanguage);
      expect(page.rootInstance.accessibilityTitle).toBe(setAccessibilityTitle);
      expect(page.rootInstance.color).toBe(setColor);

      expect(page.root).toMatchSnapshot();
    });
  });
});

describe('testing colors', () => {
  let page: any;
  let component: any;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [LogoSvg],
      html: `<div></div>`,
    });
    component = page.doc.createElement('scale-logo-svg');
    page.root.appendChild(component);
  });
  it('magenta', async () => {
    const setColor = 'magenta';
    component.color = setColor;
    await page.waitForChanges();
    expect(page.rootInstance.color).toBe(setColor);
  });
  it('black', async () => {
    const setColor = 'white';
    component.color = setColor;
    await page.waitForChanges();
    expect(page.rootInstance.color).toBe(setColor);
  });
});

describe('testing all languages', () => {
  let page: any;
  let component: any;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [LogoSvg],
      html: `<div></div>`,
    });
    component = page.doc.createElement('scale-logo-svg');
    page.root.appendChild(component);
  });
  it('de', async () => {
    const setLanguage = 'de';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('en', async () => {
    const setLanguage = 'en';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('cz', async () => {
    const setLanguage = 'cz';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('hr', async () => {
    const setLanguage = 'hr';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('hu', async () => {
    const setLanguage = 'hu';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('me', async () => {
    const setLanguage = 'me';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('mk_lat', async () => {
    const setLanguage = 'mk_lat';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('mk_kyr', async () => {
    const setLanguage = 'mk_kyr';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('ro', async () => {
    const setLanguage = 'ro';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('', async () => {
    const setLanguage = '';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
  it('sk', async () => {
    const setLanguage = 'sk';
    component.language = setLanguage;
    component.accessibilityTitle = 'logo';
    await page.waitForChanges();
    expect(page.rootInstance.language).toBe(setLanguage);
    expect(page.root).toMatchSnapshot();
  });
});
