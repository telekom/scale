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

// Expected content: HTMLElement

export const HTMLCell: Cell = {
  defaults: {},
  getLongestContent({ rows, columnIndex }) {
    // Skip check as content width is always the same
    return rows[0][columnIndex];
  },
  render: ({ content, component }) => {
    return (
      <scale-button
        variant="secondary"
        size="small"
        icon-only
        inner-aria-label={`Activate to ${
          content.isExpanded ? 'collapse' : 'expand'
        } content`}
        onClick={() => {
          content.isExpanded = !content.isExpanded;
          component.forceRender++;
        }}
      >
        {content.isExpanded ? (
          <scale-icon-navigation-collapse-up
            size={14}
          ></scale-icon-navigation-collapse-up>
        ) : (
          <scale-icon-navigation-collapse-down
            size={14}
          ></scale-icon-navigation-collapse-down>
        )}
      </scale-button>
    );
  },
};
