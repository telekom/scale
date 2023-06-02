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

// Expected content: number or string, eg `120.0`

// Options
// precision
// decimalSymbol
// groupSymbol
// editable?: boolean = false / removed/deprecated in 3.0.0-beta.135

export const NumberCell: Cell = {
  defaults: {
    textAlign: 'right',
    sortBy: 'number',
  },
  render: ({
    field,
    content,
    // component,
    // rowIndex,
    // columnIndex,
    isAutoWidthCheck,
  }) => {
    const {
      precision = Infinity,
      decimalSymbol = '.',
      groupSymbol = '',
      prefix = '',
      suffix = '',
    } = field;

    // Input component doesn't expand with content, so need to return a fake element that simulates width
    // if (isAutoWidthCheck && editable) {
    //   return (
    //     <p class={`scl-body`} style={{ paddingRight: '26px' }}>
    //       {content}
    //     </p>
    //   );
    // }

    // const step = `0.${(String(content).split('.')[1] || '')
    //   .split('')
    //   .map(() => '0')}`.replace(/,/g, '');

    // if (editable) {
    //   const props = {
    //     type: 'number',
    //     size: 'small',
    //     step: step.slice(0, step.length - 1) + '1',
    //     value: String(content),
    //     styles: /* css */ `.text-field__control {
    //       text-align: right !important;
    //     }`,
    //     label,
    //   } as any;

    //   // TODO: use blur to reduce number of changes - but doesn't pass value
    //   props.onScaleChange = ({ detail }) => {
    //     const { value } = detail;
    //     // Update rows data
    //     component.rows[rowIndex][columnIndex] = value;
    //     // Trigger event
    //     component.triggerEditEvent(value, rowIndex, columnIndex);
    //   };

    //   return <scale-text-field {...props}></scale-text-field>;
    // } else {
    // }
    let value = content;

    // Render all digits with 8s as they're the widest
    if (isAutoWidthCheck) {
      value = Number(value.toString().replace(/[0-9]/g, '8'));
    }

    // Refine to requested decimal precision
    if (precision < 100) {
      value = Number(value).toFixed(precision);
    } else {
      value = value.toString();
    }

    // Replace/add requested delimiters
    if (groupSymbol || decimalSymbol !== '.') {
      const parts = value.split('.');
      if (groupSymbol) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSymbol);
      }
      value = parts.join(decimalSymbol);
    }

    // Add prefix/suffix
    if (prefix || suffix) {
      value = prefix + value + suffix;
    }

    return (
      <p class={`scl-body`} style={{ textAlign: 'right' }}>
        {value}
      </p>
    );
  },
};
