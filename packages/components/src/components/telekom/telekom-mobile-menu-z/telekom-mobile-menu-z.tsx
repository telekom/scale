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

// TODO rename to `telekom-mobile-menu` once current <telekom-mobile-menu> is renamed to `telekom-mobile-nav`
// TODO I wonder if we need the `mobile-` prefix for the slots if this is a different component from `telekom-header`
// TODO try and find a better name for mobile-bottom slot?

@Component({
  tag: 'scale-telekom-mobile-menu-z',
  styleUrl: 'telekom-mobile-menu-z.css',
  shadow: true,
})
export class TelekomNavItem {
  @Element() hostElement: HTMLStencilElement;

  render() {
    return (
      <Host>
        <div part="base">
          {/* TODO structure + close button */}
          <slot name="mobile-before-main-nav"></slot>
          <slot name="mobile-main-nav"></slot>
          <slot name="mobile-after-main-nav"></slot>
          <slot name="mobile-meta-nav-external"></slot>
          <slot name="mobile-meta-nav"></slot>
          <slot name="mobile-lang-switcher"></slot>
          <slot name="mobile-bottom"></slot>
        </div>
      </Host>
    );
  }
}
