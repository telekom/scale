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

import { newE2EPage } from '@stencil/core/testing';

describe('scale-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-tag>Click me!</scale-tag>');
    const element = await page.find('scale-tag');
    expect(element).toHaveClass('hydrated');
  });

  describe('Accessibility', () => {
    it('should keep read-only tags out of the tab order', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <button id="before">Before</button>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
          <button id="after">After</button>
        </div>
      `);

      await page.focus('#before');
      await page.keyboard.press('Tab');
      await page.waitForChanges();

      const activeElementId = await page.evaluate(
        () => document.activeElement.id
      );
      expect(activeElementId).toBe('after');
    });

    it('should not emit option semantics without a listbox owner', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const secondTag = await page.find('#tag2');

      expect(await firstTag.getAttribute('role')).toBeNull();
      expect(await firstTag.getAttribute('aria-selected')).toBeNull();
      expect(await secondTag.getAttribute('role')).toBeNull();
      expect(await secondTag.getAttribute('aria-selected')).toBeNull();
    });

    it('should expose wrapped read-only tags without making them tabbable', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <ul>
          <li><scale-tag id="tag1">Tag 1</scale-tag></li>
          <li><scale-tag id="tag2" disabled>Tag 2</scale-tag></li>
          <li><scale-tag id="tag3">Tag 3</scale-tag></li>
        </ul>
      `);

      const tags = await page.findAll('scale-tag');
      expect(tags.length).toBe(3);

      expect(await tags[0].getAttribute('tabindex')).toBeNull();
      expect(await tags[1].getAttribute('tabindex')).toBeNull();
      expect(await tags[2].getAttribute('tabindex')).toBeNull();
      expect(await tags[0].getAttribute('aria-label')).toBe('Tag 1');
      expect(await tags[1].getAttribute('aria-disabled')).toBe('true');
      expect(await tags[1].getAttribute('aria-label')).toBe('Tag 2');
      expect(await tags[2].getAttribute('aria-label')).toBe('Tag 3');
    });

    it('should keep href and dismissable tags interactive without host tab stops', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <button id="before">Before</button>
          <scale-tag id="link-tag" href="#target">Link tag</scale-tag>
          <scale-tag id="dismissable-tag" dismissable dismiss-text="Remove tag">
            Dismissable tag
          </scale-tag>
          <button id="after">After</button>
        </div>
      `);

      const linkTag = await page.find('#link-tag');
      const dismissableTag = await page.find('#dismissable-tag');
      const link = await page.find('#link-tag >>> a');
      const button = await page.find('#dismissable-tag >>> button');

      expect(await linkTag.getAttribute('tabindex')).toBeNull();
      expect(await dismissableTag.getAttribute('tabindex')).toBeNull();
      expect(await link.getAttribute('href')).toBe('#target');
      expect(await button.getAttribute('aria-label')).toBe('Remove tag');

      await page.focus('#before');
      await page.keyboard.press('Tab');
      const activeElementTagName = await page.evaluate(() =>
        document.activeElement.shadowRoot.activeElement.tagName.toLowerCase()
      );

      expect(activeElementTagName).toBe('a');
    });
  });
});
