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
  tag: 'scale-telekom-nav-list',
  styleUrl: 'telekom-nav-list.css',
  shadow: false,
})
export class TelekomNavList {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true }) alignment: 'left' | 'center' | 'right' = 'left';
  @Prop({ reflect: true }) variant:
    | 'meta-nav-external'
    | 'meta-nav'
    | 'lang-switcher'
    | 'main-nav'
    | 'functions' = 'main-nav';

  render() {
    return (
      <Host class="scale-telekom-nav-list">
        <slot></slot>
      </Host>
    );
  }
}
