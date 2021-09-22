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

const MENU_SELECTOR = '[role="menu"]';

@Component({
  tag: 'scale-menu-flyout2',
  styleUrl: 'menu-flyout2.css',
  shadow: true,
})
export class MenuFlyout2 {
  @Element() hostElement: HTMLElement;

  /** (optional) Determines whether the dropdown should close when a menu item is selected */
  @Prop() closeOnSelect = true;
  /** (optional) Injected styles */
  @Prop() styles?: string;

  private lists: Set<HTMLScaleMenuFlyoutList2Element>;

  @Listen('scale-select')
  handleScaleSelect() {
    if (this.closeOnSelect) {
      window.requestAnimationFrame(() => {
        this.closeAll();
      })
    }
  }

  @Listen('scale-close')
  handleScaleClose({ detail }) {
    const parent =
      detail.list != null
        ? detail.list.parentNode.closest(MENU_SELECTOR)
        : null;
    if (parent) {
      window.requestAnimationFrame(() => {
        parent.active = true;
        parent.setFocus();
      });
    }
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    let target = event.target as Node
    do {
      if (target === this.hostElement) {
        return;
      }
      target = target.parentNode;
    } while (target);
    this.closeAll();
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    if ('Tab' === event.key || 'Escape' === event.key) {
      this.closeAll();
      return;
    }
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  componentDidLoad() {
    this.lists = new Set(
      Array.from(this.hostElement.querySelectorAll(MENU_SELECTOR))
    );
  }

  closeAll() {
    this.lists.forEach(async (list) => {
      await list.close(); // Wait for `scale-close` event to fire
      list.active = false; // Make sure focus control is right while reopening
    });
  }

  toggle = (event: Event) => {
    const list = this.getListElement();
    if (list.opened) {
      this.closeAll();
      return;
    }
    const trigger = event.target as HTMLElement;
    list.trigger = () => trigger;
    list.open();
  };

  getListElement(): HTMLScaleMenuFlyoutList2Element {
    // TODO use [role="menu"]?
    return Array.from(this.hostElement.children).find((node) =>
      node.tagName.toUpperCase().startsWith('SCALE-MENU-FLYOUT')
    ) as HTMLScaleMenuFlyoutList2Element;
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part="trigger" onClick={this.toggle}>
          <slot name="trigger" />
        </div>
        <slot />
      </Host>
    );
  }
}
