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

  describe('Keyboard Navigation', () => {
    it('should have role and aria attributes for accessibility', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag>Tag 1</scale-tag>
          <scale-tag>Tag 2</scale-tag>
          <scale-tag>Tag 3</scale-tag>
        </div>
      `);

      const firstTag = await page.find('scale-tag');
      const role = await firstTag.getAttribute('role');
      const ariaSelected = await firstTag.getAttribute('aria-selected');

      expect(role).toBe('option');
      expect(ariaSelected).toBe('false');
    });

    it('should have tabindex set for roving tabindex pattern', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag>Tag 1</scale-tag>
          <scale-tag>Tag 2</scale-tag>
          <scale-tag>Tag 3</scale-tag>
        </div>
      `);

      const tags = await page.findAll('scale-tag');
      expect(tags.length).toBe(3);

      // First tag should be focusable
      const firstTabindex = await tags[0].getAttribute('tabindex');
      expect(firstTabindex).toBe('0');

      // Other tags should not be focusable
      const secondTabindex = await tags[1].getAttribute('tabindex');
      const thirdTabindex = await tags[2].getAttribute('tabindex');
      expect(secondTabindex).toBe('-1');
      expect(thirdTabindex).toBe('-1');
    });

    it('should navigate to next tag on ArrowRight key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
          <scale-tag id="tag3">Tag 3</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const secondTag = await page.find('#tag2');

      // Focus on first tag and press ArrowRight
      await firstTag.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();

      // Check tabindex values after navigation
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const secondTabindex = await secondTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('-1');
      expect(secondTabindex).toBe('0');
    });

    it('should navigate to previous tag on ArrowLeft key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
          <scale-tag id="tag3">Tag 3</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const secondTag = await page.find('#tag2');
      const thirdTag = await page.find('#tag3');

      // Focus on second tag and press ArrowLeft
      await secondTag.focus();
      await page.keyboard.press('ArrowLeft');
      await page.waitForChanges();

      // Check tabindex values - should go back to first tag
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const secondTabindex = await secondTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('0');
      expect(secondTabindex).toBe('-1');
    });

    it('should navigate to next tag on ArrowDown key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const secondTag = await page.find('#tag2');

      // Focus on first tag and press ArrowDown
      await firstTag.focus();
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Check tabindex values
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const secondTabindex = await secondTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('-1');
      expect(secondTabindex).toBe('0');
    });

    it('should navigate to previous tag on ArrowUp key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const secondTag = await page.find('#tag2');

      // Focus on second tag and press ArrowUp
      await secondTag.focus();
      await page.keyboard.press('ArrowUp');
      await page.waitForChanges();

      // Check tabindex values
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const secondTabindex = await secondTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('0');
      expect(secondTabindex).toBe('-1');
    });

    it('should wrap around from last to first tag on ArrowRight', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
          <scale-tag id="tag3">Tag 3</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const thirdTag = await page.find('#tag3');

      // Focus on last tag and press ArrowRight
      await thirdTag.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();

      // Check tabindex values - should wrap to first
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const thirdTabindex = await thirdTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('0');
      expect(thirdTabindex).toBe('-1');
    });

    it('should wrap around from first to last tag on ArrowLeft', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <scale-tag id="tag1">Tag 1</scale-tag>
          <scale-tag id="tag2">Tag 2</scale-tag>
          <scale-tag id="tag3">Tag 3</scale-tag>
        </div>
      `);

      const firstTag = await page.find('#tag1');
      const thirdTag = await page.find('#tag3');

      // Focus on first tag and press ArrowLeft
      await firstTag.focus();
      await page.keyboard.press('ArrowLeft');
      await page.waitForChanges();

      // Check tabindex values - should wrap to last
      const firstTabindex = await firstTag.getAttribute('tabindex');
      const thirdTabindex = await thirdTag.getAttribute('tabindex');

      expect(firstTabindex).toBe('-1');
      expect(thirdTabindex).toBe('0');
    });
  });
});
