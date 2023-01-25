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
  tag: 'scale-telekom-mega-menu',
  styleUrl: 'telekom-mega-menu.css',
  shadow: true,
})
export class TelekomMegaMenu {
  @Element() hostElement: HTMLStencilElement;
  private container: HTMLElement;

  componentDidLoad() {
    const slotted = this.hostElement.children;
    if (slotted.length < 5) {
      this.container.style.paddingLeft = 'var(--spacing-4-columns)';
    }
  }

  render() {
    return (
      <Host>
        <div
          ref={(el) => {
            this.container = el;
          }}
          part="base"
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
