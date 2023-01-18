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

import { Component, h, Host, Element, Prop, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

// TODO? turn into util
function toggleAriaCurrent(
  element: HTMLElement,
  value: boolean,
  attrValue = 'page'
) {
  if (value) {
    element.setAttribute('aria-current', attrValue);
  } else {
    element.removeAttribute('aria-current');
  }
}

@Component({
  tag: 'scale-telekom-nav-item',
  styleUrl: 'telekom-nav-item.css',
  shadow: true,
})
export class TelekomNavItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true }) active?: boolean = false;

  @Watch('active')
  activeChanged(newValue: boolean) {
    if (this.link == null) {
      return;
    }
    toggleAriaCurrent(this.link, newValue);
  }

  connectedCallback() {
    this.activeChanged(this.active);
  }

  get link(): HTMLAnchorElement | null {
    return this.hostElement.querySelector('a');
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
