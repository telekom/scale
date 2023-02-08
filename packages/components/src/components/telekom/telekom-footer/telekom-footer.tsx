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

import { Component, h, Prop, Host, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { isScaleIcon, ScaleIcon} from '../../../utils/utils';
@Component({
  tag: 'scale-telekom-footer',
  styleUrl: 'telekom-footer.css',
  shadow: false,
})
export class TelekomFooter {
  @Element() hostElement: HTMLStencilElement;
  render() {
    console.log('footer');
    return (
      <Host
        class="base"
      >
        <footer part="footer">
            <div class="footer-container">
                <div class="logo-container">
                    <scale-logo
                    part="app-logo"
                    variant="white"
                    transparent
                    ></scale-logo>
                </div>
                <div class="footer-content">
                    <div class="notice-container">
                        <slot name="notice"></slot>
                    </div>
                    <div class="nav-links-container">
                        <slot name="nav-links"></slot>
                    </div>
                </div>
            </div>
        </footer>
      </Host>
    );
  }
}
