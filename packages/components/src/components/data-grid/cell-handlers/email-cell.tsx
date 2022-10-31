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

// Expected content: an email string (eg: 'mailto:example@domain.com)

export const EmailCell: Cell = {
  defaults: {
    sortBy: 'text',
  },
  render: ({ content }) => {
    // Remove protocol (mailto:)
    const emailNoProtocol = content.replace(/^mailto:/i, '');
    return <scale-link href={content}>{emailNoProtocol}</scale-link>;
  },
};
