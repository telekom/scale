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

// Expected content: a url string (eg: 'https://sample.com')

export const LinkCell: Cell = {
  defaults: {
    sortBy: 'text',
  },
  render: ({ content }) => {
    if (typeof content === 'string') {
      // Remove protocol (http/https)
      const urlNoProtocol = content.replace(/^https?\:\/\//i, '');
      return (
        <scale-link href={content} target="_blank">
          {urlNoProtocol}
        </scale-link>
      );
    } else {
      // if the type of content is not a string, the content is handled as
      // object of text and props (spread) which are passed as attributes to
      // the scale-link element
      const { text, ...props } = content;
      return <scale-link {...props}>{text}</scale-link>;
    }
  },
};
