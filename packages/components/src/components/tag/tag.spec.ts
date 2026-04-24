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
import { Tag } from './tag';

describe('Tag', () => {
  let element;
  beforeEach(async () => {
    element = new Tag();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<scale-tag>Label</scale-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have a link', async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<scale-tag href="#">Label</scale-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.size = 'small';
    expect(element.getCssClassMap()).toContain('tag--size-small');

    element.type = 'strong';
    expect(element.getCssClassMap()).toContain('tag--type-strong');

    element.href = 'http://example.com';
    expect(element.getCssClassMap()).toContain('tag--link');
  });

  describe('Keyboard Navigation (Roving Tabindex)', () => {
    it('should have role="option" and aria-selected attributes', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag 1</scale-tag>`,
      });
      const tag = page.root;
      expect(tag.getAttribute('role')).toBe('option');
      expect(tag.getAttribute('aria-selected')).toBe('false');
    });

    it('should have tabindex initially set to 0', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag 1</scale-tag>`,
      });
      const tag = page.root;
      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should handle ArrowRight keyboard event on a single tag', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      expect(tag).not.toBeNull();

      // Simulate ArrowRight key press on tag
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
      });
      tag.dispatchEvent(event);
      await page.waitForChanges();

      // Verify that tag still has tabindex 0
      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should handle ArrowLeft keyboard event on a single tag', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      expect(tag).not.toBeNull();

      // Simulate ArrowLeft key press
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
      });
      tag.dispatchEvent(event);
      await page.waitForChanges();

      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should handle ArrowDown keyboard event on a single tag', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      expect(tag).not.toBeNull();

      // Simulate ArrowDown key press
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
      });
      tag.dispatchEvent(event);
      await page.waitForChanges();

      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should handle ArrowUp keyboard event on a single tag', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      expect(tag).not.toBeNull();

      // Simulate ArrowUp key press
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
      });
      tag.dispatchEvent(event);
      await page.waitForChanges();

      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should handle focus event on a single tag', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      expect(tag).not.toBeNull();

      // Simulate focus event
      const focusEvent = new FocusEvent('focus', { bubbles: true });
      tag.dispatchEvent(focusEvent);
      await page.waitForChanges();

      expect(tag.getAttribute('tabindex')).toBe('0');
    });

    it('should not prevent default for non-arrow keys', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag</scale-tag>`,
      });

      const tag = page.root;
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      tag.dispatchEvent(event);
      await page.waitForChanges();

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });
});
