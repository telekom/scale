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

@Component({
  tag: 'scale-telekom-footer-content',
  styleUrl: 'telekom-footer-content.css',
  shadow: true,
})
export class TelekomFooterContent {
  //   @Element() hostElement: HTMLStencilElement;
  //   @Prop() variant: 'standard' | 'slim' = 'standard';
  render() {
    return (
      <Host
      // class={cx('scale-telekom-footer-content', {
      //   slim: this.variant === 'slim',
      // })}
      >
        <footer>
          <slot name="extended-navigation"></slot>
          <div class="footer-container">
            <div class="logo-container">
              <scale-logo
                part="app-logo"
                variant="white"
                transparent
              ></scale-logo>
            </div>
            <div class="navigation-container">
              <div class="notice-container">
                <slot name="notice"></slot>
              </div>
              <div class="navigation-links">
                <slot name="navigation"></slot>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
