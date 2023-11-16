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
import { isClickOutside } from '../../utils/utils';

const MENU_SELECTOR = '[role="menu"]';

const isButtonOrLink = (el: HTMLElement) => {
  if (
    el.tagName.toUpperCase() === 'BUTTON' ||
    el.tagName.toUpperCase() === 'A' ||
    el.getAttribute('role') === 'button'
  ) {
    return el;
  }
};

@Component({
  tag: 'scale-menu-flyout',
  styleUrl: 'menu-flyout.css',
  shadow: true,
})
export class MenuFlyout {
  @Element() hostElement: HTMLElement;

  /** (optional) Determines whether the flyout should close when a menu item is selected */
  @Prop() closeOnSelect = true;
  /** (optional) Set preference for where the menu appears, space permitting */
  @Prop() direction:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'right'
    | 'left' = 'bottom-right';
  /** (optional) Injected styles */
  @Prop() styles?: string;

  private trigger: HTMLElement;
  private lists: Set<HTMLScaleMenuFlyoutListElement> = new Set();
  // Keep track of the current active/open list
  private activeList: HTMLScaleMenuFlyoutListElement;

  @Listen('scale-open')
  async handleScaleOpen({ detail }) {
    // Close the previous active list and its parents if
    // - it's not the root and
    // - it's not the one being opened
    // (useful only with "click" interactions)
    const rootList = this.getListElement();
    if (
      this.activeList &&
      this.activeList.active &&
      this.activeList !== rootList &&
      this.activeList !== detail.list
    ) {
      let list: HTMLScaleMenuFlyoutListElement = this.activeList;
      while (list != null && list !== rootList) {
        await list.close(true);
        list = list.parentElement.closest(MENU_SELECTOR);
      }
    }
    this.activeList = detail.list;
  }

  @Listen('scale-select')
  handleScaleSelect({ detail }) {
    if (detail.closeOnSelect === false) {
      return;
    }
    if (this.closeOnSelect) {
      window.requestAnimationFrame(() => {
        this.closeAll();
      });
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

  @Listen('scroll', { target: 'window' })
  handleWindowScroll() {
    this.closeAll();
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (isClickOutside(event, this.hostElement)) {
      this.closeAll();
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {

    // TODO DaSu fix onClose bug

    if (
      'Tab' === event.key &&
      !this.hostElement.querySelector('app-navigation-user-menu')
    ) {
      if (this.trigger.tagName === 'SCALE-TELEKOM-NAV-ITEM') {
        (this.trigger.firstElementChild as HTMLElement).focus();
      }
      this.closeAll();
      return;
    }
  }

  componentDidLoad() {
    const triggerSlot = this.hostElement.querySelector(
      '[slot="trigger"]'
    ) as HTMLElement;
    const tagName = triggerSlot ? triggerSlot.tagName.toUpperCase() : '';
    // TODO a different, more global, solution less dependent on tag names
    // would be great…
    if (triggerSlot && tagName === 'SCALE-BUTTON') {
      this.trigger = triggerSlot.shadowRoot.querySelector('button');
    } else if (triggerSlot && tagName === 'SCALE-NAV-ICON') {
      this.trigger = triggerSlot.querySelector('a');
    } else {
      this.trigger = triggerSlot;
    }
    this.lists = new Set(
      Array.from(this.hostElement.querySelectorAll(MENU_SELECTOR))
    );
    this.setTriggerAttributes();
  }

  setTriggerAttributes() {
    const triggers = Array.from(
      this.hostElement.querySelectorAll('[role="menuitem"]')
    )
      .filter((el) => el.querySelector('[slot="sublist"]') != null)
      .concat([isButtonOrLink(this.trigger)])
      .filter((x) => x != null);
    triggers.forEach((el) => {
      el.setAttribute('aria-haspopup', 'true');
      el.setAttribute('aria-expanded', 'false');
    });
  }

  closeAll = () => {
    this.lists.forEach(async (list) => {
      await list.close(); // Wait for `scale-close` event to fire
      list.active = false; // Make sure focus control is right while reopening
    });
  };

  toggle = () => {
    const list = this.getListElement();
    if (list.opened) {
      this.closeAll();
      return;
    }
    if (this.direction != null) {
      // Overwrite `direction` in list
      list.direction = this.direction;
    }
    list.trigger = () => this.trigger;
    list.open();
  };

  getListElement(): HTMLScaleMenuFlyoutListElement {
    // TODO use [role="menu"]?
    return Array.from(this.hostElement.children).find((el) =>
      el.tagName.toUpperCase().startsWith('SCALE-MENU-FLYOUT')
    ) as HTMLScaleMenuFlyoutListElement;
  }

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
