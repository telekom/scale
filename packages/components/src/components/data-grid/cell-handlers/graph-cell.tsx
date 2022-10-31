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

// Expected content: number, eg 10230.32

// Options
// style?: string 'bar' | 'progress'
// min?: number 0
// max?: number 100

export const GraphCell: Cell = {
  defaults: {
    sortBy: 'number',
  },
  render: ({ field, content }) => {
    const { style = 'progress', min = 0, max = 100 } = field;

    // Convert content to 0>100 range for progress bar
    const progress = ((content - min) / (max - min)) * 100;

    switch (style) {
      case 'bar':
        return (
          <div class={`tbody__bar-cell`}>
            <scale-progress-bar
              aria-hidden="true"
              percentage={progress}
              // showStatus={true}
              mute={true}
              style={{ maxWidth: '200px' }}
              styles={
                /* css */ `.progress-bar__outer {
                min-width: 50px;
                max-width: 200px;
              }
              .progress-bar__inner {
                background: var(--telekom-color-ui-faint) !important;
              }
              `
              }
            ></scale-progress-bar>
            <p class={`scl-body`}>{content}</p>
          </div>
        );
      default:
        // progress
        return (
          <scale-progress-bar
            percentage={progress}
            showStatus={true}
            mute={true}
            styles={
              /* css */ `.progress-bar__outer {
              min-width: 50px;
              max-width: 200px;
            }
            .progress-bar__inner {
                background: var(--telekom-color-functional-informational-standard) !important;
              }
            `
            }
          ></scale-progress-bar>
        );
    }
  },
};
