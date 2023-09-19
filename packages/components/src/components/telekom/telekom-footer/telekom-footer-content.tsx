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

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'scale-telekom-footer-content',
  styleUrl: 'telekom-footer-content.css',
  shadow: true,
})
export class TelekomFooterContent {
  /** (optional) Logo link */
  @Prop() logoHref?: string = 'javascript:void(0);';
  /** (optional) set logo specific title */
  @Prop() logoTitle?: string = 'Telekom Logo';
  /** (optional) set logo specific title */
  @Prop() logoHideTitle?: boolean = false;

  render() {
    return (
      <Host>
        <footer>
          <slot name="extended-navigation"></slot>
          <div part="base">
            <div part="logo">
              <scale-logo
                part="app-logo"
                variant="white"
                style={{
                  '--focus-outline':
                    'var(--telekom-line-weight-highlight) solid var(--telekom-color-functional-focus-on-dark-background)',
                }}
                transparent
                href={this.logoHref}
                title={this.logoHideTitle ? '' : this.logoTitle}
              ></scale-logo>
            </div>
            <div part="body">
              <div part="notice">
                <slot name="notice"></slot>
              </div>
              <div part="navigation">
                <slot name="navigation"></slot>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
