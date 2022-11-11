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

export const HTMLNoDropdownCell: Cell = {
  defaults: {},
  getLongestContent({ rows, columnIndex }) {
    return rows[0][columnIndex];
  },
  render: ({ content }) => {
    return <div
    ref={(el) => {
      if (el) {
        el.appendChild(content);
      }
    }}
  ></div>
  },
};
