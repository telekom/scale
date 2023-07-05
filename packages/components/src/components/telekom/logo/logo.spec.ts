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
import { Logo } from './logo';

describe('component prop snapshots', () => {
  let page: any;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Logo],
      html: `<scale-logo></scale-logo>`,
    });
  });

  const variant: 'magenta' | 'white' = 'magenta';
  const transparent: boolean = false;
  const size: number = 38;

  describe('all props', () => {
    it('are not set', async () => {
      await page.waitForChanges();
      expect(page.rootInstance.variant).toBe(variant);
      expect(page.rootInstance.transparent).toBe(transparent);
      expect(page.rootInstance.size).toBe(size);

      expect(page.root).toMatchSnapshot();
    });
    it('are set', async () => {
      const setVariant = 'white';
      const setTransparent = true;
      const setSize = 100;
      const setHref = 'https://www.telekom.de/start';

      page.rootInstance.variant = setVariant;
      page.rootInstance.transparent = setTransparent;
      page.rootInstance.size = setSize;
      page.rootInstance.href = setHref;

      await page.waitForChanges();
      expect(page.rootInstance.variant).toBe(setVariant);
      expect(page.rootInstance.transparent).toBe(setTransparent);
      expect(page.rootInstance.size).toBe(setSize);
      expect(page.rootInstance.href).toBe(setHref);

      expect(page.root).toMatchSnapshot();
    });

    it('should handle no link', async () => {
      page.rootInstance.href = '';
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
