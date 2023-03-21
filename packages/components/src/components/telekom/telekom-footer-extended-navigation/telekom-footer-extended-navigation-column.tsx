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

import { Component, h, Host, Element } from '@stencil/core';
import { HTMLStencilElement, Prop } from '@stencil/core/internal';
import cx from 'classnames';
// import { emitEvent } from '../../../utils/utils';

@Component({
  tag: 'scale-telekom-footer-extended-navigation-column',
  styleUrl: 'telekom-footer-extended-navigation-column.css',
  shadow: true,
})
export class TelekomFooterExtendedNavigationColumn {
  @Element() hostElement: HTMLStencilElement;
  @Prop() heading: string;
  /** Set to `true` to expand */
  @Prop({ reflect: true }) expanded: boolean = false;
  // Optional heading level - default h2
  @Prop() headingLevel?: string = 'h2';

  handleClick = () => {
    this.expanded = !this.expanded;
    // emitEvent(this, 'scaleExpand', { expanded: this.expanded });
  };

  render() {
    return (
      <Host>
        <div
          part={cx('telekom-footer-extended-navigation-column', {
            expanded: this.expanded,
          })}
        >
          <div part="heading-container">
            <h2 aria-level={this.headingLevel}>
              <button onClick={this.handleClick} part="heading-button">
                <span> {this.heading}</span>
                <scale-icon-navigation-collapse-down
                  selected
                  size={16}
                ></scale-icon-navigation-collapse-down>
              </button>
            </h2>
            <span part="heading"> {this.heading}</span>
          </div>
          <div
            part={cx(
              'telekom-footer-extended-navigation-column-links',
              this.expanded ? 'links-expanded' : 'links-hidden'
            )}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
