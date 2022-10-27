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
import { TabPanel } from './tab-panel';

describe('TabPanel', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [TabPanel],
      html: `<scale-tab-panel></scale-tab-panel>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle styles', async () => {
    page.rootInstance.styles = 'background-color:red';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
