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

  describe('Accessibility', () => {
    it('should keep read-only tags out of tab order and invalid option context', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag>Tag 1</scale-tag>`,
      });
      const tag = page.root;
      expect(tag.hasAttribute('tabindex')).toBe(false);
      expect(tag.hasAttribute('role')).toBe(false);
      expect(tag.hasAttribute('aria-selected')).toBe(false);
      expect(tag.getAttribute('aria-label')).toBe('Tag 1');
    });

    it('should preserve explicit aria-label on read-only tags', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `<scale-tag aria-label="Custom label">Tag 1</scale-tag>`,
      });
      const tag = page.root;
      expect(tag.getAttribute('aria-label')).toBe('Custom label');
    });

    it('should not put wrapped read-only tags into tab order', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `
          <ul>
            <li><scale-tag>Tag 1</scale-tag></li>
            <li><scale-tag disabled>Tag 2</scale-tag></li>
            <li><scale-tag>Tag 3</scale-tag></li>
          </ul>
        `,
      });

      const tags = page.body.querySelectorAll('scale-tag');
      tags.forEach((tag) => {
        expect(tag.hasAttribute('tabindex')).toBe(false);
        expect(tag.hasAttribute('role')).toBe(false);
        expect(tag.hasAttribute('aria-selected')).toBe(false);
      });
      expect(tags[1].getAttribute('aria-disabled')).toBe('true');
    });

    it('should keep href and dismissable behavior on the internal controls', async () => {
      const page = await newSpecPage({
        components: [Tag],
        html: `
          <scale-tag href="https://example.com">Link tag</scale-tag>
          <scale-tag dismissable dismiss-text="Remove tag">Dismissable tag</scale-tag>
        `,
      });

      const [linkTag, dismissableTag] = Array.from(
        page.body.querySelectorAll('scale-tag')
      );
      const link = linkTag.shadowRoot.querySelector('a');
      const button = dismissableTag.shadowRoot.querySelector('button');

      expect(link.getAttribute('href')).toBe('https://example.com');
      expect(button.getAttribute('aria-label')).toBe('Remove tag');
      expect(linkTag.hasAttribute('tabindex')).toBe(false);
      expect(dismissableTag.hasAttribute('tabindex')).toBe(false);
    });
  });
});
