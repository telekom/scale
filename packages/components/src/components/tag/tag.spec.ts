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
});
