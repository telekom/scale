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
import { Link } from './link';

describe('Link', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link>default</scale-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain target="_blank" when openNewTab is set true', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link href="http://example.com" open-new-tab=true>Label</scale-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have link href value when href value is set', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link href="http://example.com">Label</scale-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle disabled link', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link href="http://example.com" disabled=true>Label</scale-link>`,
    });
    expect(page.rootInstance.disabled).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should handle setted styles', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link href="http://example.com" styles="color:red">Label</scale-link>`,
    });
    expect(page.rootInstance.styles).toBe('color:red');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<scale-link href="http://example.com" disabled icon-position="before">Label</scale-link>`,
    });

    expect(page.root.classList.contains('disabled')).toBe(true);
    expect(page.root.classList.contains('reverse')).toBe(true);
  });
});
