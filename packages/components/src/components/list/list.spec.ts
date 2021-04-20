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
import { List } from './list';

describe('List', () => {
  let element;
  beforeEach(async () => {
    element = new List();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [List],
      html: `<scale-list>default</scale-list>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.ordered = true;
    expect(element.getCssClassMap()).toContain('list--type-ordered');
  });

  it('should handle listItem', async () => {
    const page = await newSpecPage({
      components: [List],
      html: `
        <scale-list ordered>
          <scale-list-item>
          </scale-list-item>
        </scale-list>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
