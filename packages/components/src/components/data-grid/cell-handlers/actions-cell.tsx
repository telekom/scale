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

export const ActionsCell: Cell = {
  defaults: {},
  getLongestContent({ rows, columnIndex }) {
    // Skip check as content width is always the same
    return rows[0][columnIndex];
  },
  render: ({ content }) => {
    return (
      <div class={`tbody__actions`}>
        {content.map((action) => {
          const { label, ...props } = action;
          if (typeof label === 'object' && '__html' in label) {
            return (
              <scale-button innerHTML={label.__html} {...props}></scale-button>
            );
          }
          return <scale-button {...props}>{label}</scale-button>;
        })}
      </div>
    );
  },
};
