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

import { h } from '@stencil/core';
import { Cell } from './cell-interface';

// Expected: comma delimited string (eg 'one, two, three')

export const TagsCell: Cell = {
  defaults: {
    sortBy: 'text',
  },
  render: ({ content }) => {
    const tags = content.split(',').map((s) => s.trim());
    return (
      <ul class={`tbody__tag-list`}>
        {tags.map((tag) => (
          <li>
            <scale-tag size="small" type="strong">
              {tag}
            </scale-tag>
          </li>
        ))}
      </ul>
    );
  },
};
