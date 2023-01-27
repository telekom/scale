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

import { Component, h, Host, Element, State } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-mega-menu',
  styleUrl: 'telekom-mega-menu.css',
  shadow: false,
})
export class TelekomMegaMenu {
  @Element() hostElement: HTMLStencilElement;

  /** :) */
  @State() childrenTooMany: boolean = false;

  connectedCallback() {
    if (this.hostElement.children.length > 4) {
      this.childrenTooMany = true;
    }
  }

  render() {
    return (
      <Host
        class="scale-telekom-mega-menu"
        children-too-many={this.childrenTooMany}
      >
        <slot></slot>
      </Host>
    );
  }
}
