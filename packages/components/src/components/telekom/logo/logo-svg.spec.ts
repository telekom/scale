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

  const color: string = 'magenta';

  describe('all props', () => {
    it('are not set', async () => {
      await page.waitForChanges();
      expect(page.rootInstance.color).toBe(color);
      expect(page.root).toMatchSnapshot();
    });
    it('are set', async () => {
      const setColor = 'black';
      const setLogoTitle = 'title';

      page.rootInstance.color = setColor;
      page.rootInstance.logoTitle = setLogoTitle;

      await page.waitForChanges();
      expect(page.rootInstance.logoTitle).toBe(setLogoTitle);
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
