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

// Expected: date/time string, eg '10:23:00'
// TODO: see if this is even worth it. It may help with sorting/filtering?
// work out format requirements - as date/time formatting is heavy eg moment.js
// const { inputFormat, outputFormat } = field;
// inputFormat: 'HH:mm:ss', // ['timestamp', '']
// outputFormat: 'HH:mm',

export const DateCell: Cell = {
  defaults: {
    sortBy: 'date',
  },
  render: ({ content, isAutoWidthCheck }) => {
    let value = content ?? '';

    // Render all digits with 8s as they're the widest
    if (isAutoWidthCheck) {
      value = value.replace(/[0-9]/g, '8');
    }

    return <p class={`scl-body`}>{value}</p>;
  },
};
