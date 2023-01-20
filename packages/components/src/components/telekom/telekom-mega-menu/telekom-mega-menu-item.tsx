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
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-mega-menu-item',
  styleUrl: 'telekom-mega-menu-item.css',
  shadow: true,
})
export class TelekomMegaMenuItem {
  @Element() hostElement: HTMLStencilElement;
  @Prop() href: string;

  render() {
    return (
      <Host>
        <div part="base">
          <a part="link" href={this.href}>
            <slot></slot>
          </a>
        </div>
      </Host>
    );
  }
}
