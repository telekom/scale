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
import { TabNav } from './tab-nav';

describe('TabNav', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [TabNav],
      html: `<scale-tab-nav></scale-tab-nav>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  // This class seems silly but it's needed in order to make sure we query the element
  // since we can never be certain the name of the element will be <scale-tab-nav>.
  it('should have default scale-tab-nav class', async () => {
    expect(page.root.classList.contains('scale-tab-nav')).toBe(true);
  });
});
