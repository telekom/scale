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

import { Component, Prop, h, Host, Element, Listen } from '@stencil/core';
import statusNote from '../../utils/status-note';

/*
  TODO
  - [ ] close all open menus
    - [ ] on Esc or Tab (focus back to trigger?)
    - [ ] on outside click
    - [ ] on "select" event based on `closeOnSelect` setting
    - [ ] on scroll and wheel
  - [ ] handle trigger attributes (aria-haspopup, aria-expanded)
*/

@Component({
  tag: 'scale-menu-flyout2',
  styleUrl: 'menu-flyout2.css',
  shadow: true,
})
export class MenuFlyout2 {
  @Element() hostElement: HTMLElement;

  @Prop() styles?: string;

  private lists: Set<HTMLElement>;

  @Listen('scale-open')
  handleScaleOpen() {
    // const { item }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    if ('Tab' === event.key || 'Escape' === event.key) {
      this.closeAll();
      return;
    }
  }

  connectedCallback() {
    this.lists = new Set(Array.from(this.hostElement.querySelectorAll('[role="menu"]')));
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  closeAll() {
    //
  }

  openList = (event: Event) => {
    const list = this.getListElement() as HTMLScaleMenuFlyoutList2Element;
    const trigger = event.target as HTMLElement;
    list.trigger = () => trigger;
    list.opened = !list.opened;
  };

  getListElement = () => {
    return Array.from(this.hostElement.children).find((node) =>
      // TODO use [role="menu"]?
      node.tagName.toUpperCase().startsWith('SCALE-MENU-FLYOUT')
    );
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part="trigger" onClick={this.openList}>
          <slot name="trigger" />
        </div>
        <slot />
      </Host>
    );
  }
}
