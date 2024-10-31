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

// Expected content: unformated string 'this is a string'

// Options
// variant?: string 'body' | 'h6' | 'h5' | etc
// editable?: boolean = false
// iconPrefix?: string eg 'action-download'
// iconSuffix?: string eg 'action-download'

export const TextCell: Cell = {
  defaults: {
    sortBy: 'text',
  },
  render: ({
    field,
    content,
    component,
    rowIndex,
    columnIndex,
    isAutoWidthCheck,
  }) => {
    const {
      variant = 'body',
      editable = false,
      iconPrefix,
      iconSuffix,
      label,
      textFieldProps = {}
    } = field;

    // Input component doesn't expand with content, so need to return a fake element that simulates width
    if (isAutoWidthCheck && editable) {
      return (
        <p class={`scl-body`} style={{ paddingRight: '26px' }}>
          {content}
        </p>
      );
    }

    if (editable) {
      const props = {
        type: 'text',
        ...textFieldProps,
        value: content,
        label,
      } as any;

      // TODO: use blur to reduce number of changes - but doesn't pass value
      // TODO: apply variant and iconPrefix/Suffix to editable text
      props.onScaleChange = ({ detail }) => {
        const { value } = detail;
        // Update rows data
        component.rows[rowIndex][columnIndex] = value;
        // Trigger event
        component.triggerEditEvent(value, rowIndex, columnIndex);
      };
      return <scale-text-field {...props}></scale-text-field>;
    } else {
      let value = content;

      // Add an extra couple of characters for the width check to avoid clipping
      if (isAutoWidthCheck) {
        value += 'w';
      }

      return (
        <div class={`tbody__text-cell`}>
          {iconPrefix && (
            <span class={`tbody__text-cell-prefix`}>
              {h(`scale-icon-${iconPrefix}`)}
            </span>
          )}
          <p class={`scl-${variant}`}>{value}</p>
          {iconSuffix && (
            <span class={`tbody__text-cell-suffix`}>
              {h(`scale-icon-${iconSuffix}`)}
            </span>
          )}
        </div>
      );
    }
  },
};
