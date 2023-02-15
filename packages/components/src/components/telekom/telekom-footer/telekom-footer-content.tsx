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

import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'scale-telekom-footer-content',
  styleUrl: 'telekom-footer-content.css',
  shadow: true,
})
export class TelekomFooterContent {
  render() {
    return (
      <Host>
        <footer>
          <slot name="extended-navigation"></slot>
          <div part="footer-container">
            <div part="logo-container">
              <scale-logo
                part="app-logo"
                variant="white"
                transparent
              ></scale-logo>
            </div>
            <div part="navigation-container">
              <div part="notice-container">
                <slot name="notice"></slot>
              </div>
              <div part="navigation-links">
                <slot name="navigation"></slot>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
