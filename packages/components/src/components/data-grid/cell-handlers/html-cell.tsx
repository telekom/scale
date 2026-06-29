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
  getLongestContent({ rows, columnIndex, field }) {
    if (field.display === 'inline') {
      let maxLength = -1;
      let longestContent;
      rows.forEach((row) => {
        const content = row[columnIndex];
        const length = content?.textContent?.length || 0;
        if (content && length > maxLength) {
          longestContent = content;
          maxLength = length;
        }
      });
      return longestContent;
    }

    // Skip check as nested HTML content width is always the same toggle button.
    return rows[0][columnIndex];
  },
  render: ({ field, content, component, localization }) => {
    if (field.display === 'inline') {
      return (
        content && (
          <div
            class={`tbody__html-cell tbody__html-cell--inline`}
            ref={(el) => {
              if (el) {
                let child = el.lastElementChild;
                while (child) {
                  el.removeChild(child);
                  child = el.lastElementChild;
                }
                el.appendChild(content);
              }
            }}
          ></div>
        )
      );
    }

    const getAriaLabel = () => {
      if (localization?.expand && localization?.collapse) {
        return content.isExpanded
          ? localization?.collapse
          : localization?.expand;
      }
      return `Activate to ${
        content.isExpanded ? 'collapse' : 'expand'
      } content`;
    };
    return (
      content && (
        <scale-button
          variant="secondary"
          size="small"
          icon-only
          inner-aria-label={getAriaLabel()}
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
      )
    );
  },
};
