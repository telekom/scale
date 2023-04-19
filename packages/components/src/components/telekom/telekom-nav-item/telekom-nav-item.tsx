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

// TODO maybe we want to add the <scale-icon-navigation-external-link size="11"> icon
// automatically when inside variant="meta-nav-external"?

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
  shadow: false,
})
export class TelekomNavItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true }) active?: boolean = false;
  @Prop({ reflect: true }) variant?: string;
  @Prop() ariaLabelNavItem?: string;
  @Prop() navItemTitle?: string;

  @Watch('active')
  @Watch('variant')
  activeChanged(newValue: boolean) {
    if (this.linkElement == null) {
      return;
    }
    if (this.variant === 'lang-switcher' && this.active) {
      toggleAriaCurrent(this.linkElement, newValue, 'true');
    }
    if (this.variant === 'main-nav' && this.active) {
      toggleAriaCurrent(this.linkElement, newValue, 'true');
    }
  }

  connectedCallback() {
    this.activeChanged(this.active);
  }

  get linkElement(): HTMLAnchorElement | null {
    return this.hostElement.querySelector('a, button');
  }

  render() {
    return (
      // A class is used to avoid coupling styles to the tagname
      // (which can be different based on who defines it)
      <Host
        class="scale-telekom-nav-item"
        aria-label={this.ariaLabelNavItem}
        title={this.navItemTitle}
        role="listitem"
      >
        <slot></slot>
      </Host>
    );
  }
}
