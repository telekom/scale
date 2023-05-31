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

// Expected: string

// Options
// options: string array
// editable?: boolean = false

export const SelectCell: Cell = {
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
    const { options, editable = false, label } = field;

    // Select component doesn't expand with content, so need to return a fake element that simulates width
    if (isAutoWidthCheck) {
      return (
        <p class={`scl-body`} style={{ paddingRight: '56px' }}>
          {content}
        </p>
      );
    }

    const props = {
      disabled: !editable,
      value: content,
      label,
    } as any;

    if (editable) {
      props.onScaleChange = ({ detail }) => {
        const { value } = detail;
        // Update rows data
        component.rows[rowIndex][columnIndex] = value;
        // Trigger event
        component.triggerEditEvent(value, rowIndex, columnIndex);
      };
    }

    return (
      <scale-dropdown-select floatingStrategy="fixed" {...props}>
        {options.map((option) => {
          return (
            <scale-dropdown-select-item value={option}>
              {option}
            </scale-dropdown-select-item>
          );
        })}
      </scale-dropdown-select>
    );
  },
};
