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

import { Component, h, Host, Element, Listen, Prop } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

const isDirectChild = (parent: HTMLElement, child: HTMLElement) =>
  [...parent.children].includes(child);

@Component({
  tag: 'scale-telekom-nav-list',
  styleUrl: 'telekom-nav-list.css',
  shadow: false,
})
export class TelekomNavList {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true }) role: string | null = 'list';
  @Prop({ reflect: true }) alignment: 'left' | 'center' | 'right' = 'left';
  @Prop({ reflect: true }) variant:
    | 'meta-nav-external'
    | 'meta-nav'
    | 'lang-switcher'
    | 'main-nav'
    | 'functions' = 'main-nav';

  @Listen('scale-expanded')
  handleScaleExpanded(event) {
    if (event.detail.expanded) {
      this.closeExpandedFlyoutSiblings(event.target);
    }
  }

  closeExpandedFlyoutSiblings(target: HTMLElement) {
    const siblingItems = [...this.hostElement.children].filter(
      (x) => !x.contains(target)
    ) as HTMLElement[];
    siblingItems.forEach((item) => {
      const flyout = item.querySelector('scale-telekom-nav-flyout');
      if (isDirectChild(item, flyout) && flyout.expanded) {
        flyout.expanded = false;
      }
    });
  }

  connectedCallback() {
    [...this.hostElement.children].forEach((el: HTMLElement) => {
      el.setAttribute('variant', this.variant);
    });
  }

  render() {
    return (
      <Host class="scale-telekom-nav-list">
        <slot></slot>
      </Host>
    );
  }
}
