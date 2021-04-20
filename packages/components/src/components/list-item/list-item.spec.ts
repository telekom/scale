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
import { ListItem } from './list-item';

describe('ListItem', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [ListItem],
      html: `<scale-list-item>default</scale-list-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
