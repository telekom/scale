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
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-footer-extended-navigation',
  styleUrl: 'telekom-footer-extended-navigation.css',
  shadow: false,
})
export class TelekomFooterExtendedNavigation {
  @Element() hostElement: HTMLStencilElement;
  //   @Prop() variant: 'standard' | 'slim' = 'standard';
  render() {
    return (
      <Host class="telekom-footer-extended-navigation">
        <div class="extended-navigation-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
