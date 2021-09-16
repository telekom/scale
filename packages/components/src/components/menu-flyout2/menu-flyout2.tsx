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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import statusNote from '../../utils/status-note';

/*
  TODO
  - [ ] Esc or Tab, or outside click, should close all open menus
*/

@Component({
  tag: 'scale-menu-flyout2',
  styleUrl: 'menu-flyout2.css',
  shadow: true,
})
export class MenuFlyout2 {
  @Element() hostElement: HTMLElement;

  @Prop() styles?: string;

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  toggleOpen = (event: Event) => {
    const list = this.getListElement() as HTMLScaleMenuFlyoutList2Element;
    const trigger = event.target as HTMLElement;
    list.trigger = () => trigger;
    list.opened = !list.opened;
  };

  getListElement = () => {
    return Array.from(this.hostElement.children).find((node) =>
      node.tagName.toUpperCase().startsWith('SCALE-MENU-FLYOUT')
    );
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part="trigger" onClick={this.toggleOpen}>
          <slot name="trigger" />
        </div>
        <slot />
      </Host>
    );
  }
}
