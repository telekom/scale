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

import { Component, h, Host, Element, Prop } from '@stencil/core';
import { HTMLStencilElement, State } from '@stencil/core/internal';
import cx from 'classnames';

@Component({
  tag: 'scale-telekom-mega-menu-column',
  styleUrl: 'telekom-mega-menu-column.css',
  shadow: true,
})
export class TelekomMegaMenuColumn {
  @Element() hostElement: HTMLStencilElement;

  @Prop() headingLevel: number = 2;

  @State() headingHasLink: boolean = false;

  connectedCallback() {
    if (this.hostElement.querySelector('a[slot="heading"]')) {
      this.headingHasLink = true;
    }
  }

  render() {
    return (
      <Host>
        <div
          part={cx({
            base: true,
            'heading-has-link': this.headingHasLink,
          })}
        >
          <div part="icon" aria-hidden="true">
            <slot name="icon"></slot>
          </div>
          <div part="body">
            <div part="heading" role="heading" aria-level={this.headingLevel}>
              <slot name="heading"></slot>
              <scale-icon-navigation-right
                part="icon-arrow-right"
                size={11}
                selected
              />
            </div>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
