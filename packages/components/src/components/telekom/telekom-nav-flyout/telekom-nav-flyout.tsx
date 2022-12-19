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

/*
  TODO
  ----
  - [ ] handle hover
  - [ ] animate
  - [ ] add CSS variables
  - [ ] handle closing on focusout somehow (probably something for nav-list)
*/

import { Component, h, Host, Element, State, Prop, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import cx from 'classnames';

@Component({
  tag: 'scale-telekom-nav-flyout',
  styleUrl: 'telekom-nav-flyout.css',
  shadow: true,
})
export class TelekomNavItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true, mutable: true }) expanded?: boolean = false;
  @Prop() triggerSelector?: string;

  @State() isExpanded: boolean = this.expanded;

  @Watch('expanded')
  expandedChanged(newValue) {
    newValue ? this.show() : this.hide();
  }

  connectedCallback() {
    if (this.triggerElement == null) {
      return;
    }
    this.triggerElement.addEventListener('click', this.toggle);
    this.triggerElement.setAttribute('aria-haspopup', 'true');
    this.triggerElement.setAttribute('aria-expanded', String(this.expanded));
  }

  toggle = (event) => {
    event.preventDefault(); // TODO exclude ctrl, etc.
    this.expanded = !this.expanded;
    this.expanded ? this.show() : this.hide();
  };

  show = () => {
    this.isExpanded = true;
    this.triggerElement.setAttribute('aria-expanded', 'true');
  };

  hide = () => {
    this.isExpanded = false;
    this.triggerElement.setAttribute('aria-expanded', 'false');
  };

  get triggerElement() {
    if (this.triggerSelector) {
      return this.hostElement.ownerDocument.querySelector(this.triggerSelector);
    }
    return this.hostElement.previousElementSibling;
  }

  render() {
    return (
      <Host>
        <div
          part={cx({
            base: true,
            expanded: this.isExpanded,
          })}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
