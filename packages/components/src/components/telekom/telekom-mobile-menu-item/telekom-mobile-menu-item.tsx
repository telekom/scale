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

import { Component, h, Host, Element, Prop, Event, Watch } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import cx from 'classnames';
import { emitEvent } from '../../../utils/utils';

@Component({
  tag: 'scale-telekom-mobile-menu-item',
  styleUrl: 'telekom-mobile-menu-item.css',
  shadow: true,
})
export class TelekomMobileMenuItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop() open?: boolean = false;
  @Prop() active?: boolean = false;
  @Prop() level?: string = '0';
  @Prop() currentLevel?: string = '0';
  @Event({ eventName: 'scale-set-menu-item-active' }) scaleSetMenuItemActive;
  @Event({ eventName: 'scale-set-menu-item-open' }) scaleSetMenuItemOpen;
  @Event({ eventName: 'scale-close-nav-flyout' }) scaleCloseNavFlyout;

  @Watch('open')
  openChanged(newValue: boolean) {
    this.toggleChildrenVisibility(newValue);
  }

  connectedCallback() {
    this.toggleChildrenVisibility(this.open);
  }

  toggleChildrenVisibility(show) {
    this.children.forEach((element) => {
      show && element.getAttribute('level') === String(+this.level + 1)
        ? element.removeAttribute('hidden')
        : element.setAttribute('hidden', '');
    });
  }

  handleClick = (e) => {
    e.stopImmediatePropagation();
    const hasLink = !(e.target.getAttribute('href') || '').includes(
      'javascript:void(0)'
    );
    const hasLinkNoChildren = hasLink && !this.children.length;

    if (hasLinkNoChildren) {
      emitEvent(this, 'scaleCloseNavFlyout', e);
      return emitEvent(this, 'scaleSetMenuItemActive', e.detail);
    }

    const hasLinkAndChildrenAndOpen =
      hasLink && this.children.length && this.open;
    if (hasLinkAndChildrenAndOpen) {
      emitEvent(this, 'scaleCloseNavFlyout', e);
      return emitEvent(this, 'scaleSetMenuItemActive', e.detail);
    }

    // EITHER hos link and children - ready to expand children without firing the link click
    // OR no link but has children
    e.preventDefault();
    this.toggleChildrenVisibility(true);
    return emitEvent(this, 'scaleSetMenuItemOpen', e.detail);
  };

  get children(): NodeListOf<HTMLElement> | null {
    return this.hostElement.querySelectorAll('scale-telekom-mobile-menu-item');
  }

  get openChildren(): HTMLElement[] | null {
    return Array.from(
      this.hostElement.querySelectorAll('scale-telekom-mobile-menu-item')
    ).filter((element) => element.hasAttribute('open'));
  }

  render() {
    return (
      <Host onClick={this.handleClick}>
        <nav
          part={cx('base', `level-${this.level}`, {
            open: this.open,
            active: this.active,
            hidden: !this.open && this.level !== this.currentLevel,
          })}
        >
          <div
            part={cx('header', {
              hidden: !!this.openChildren.length,
            })}
          >
            <slot></slot>
            <div part="icon-right-container">
              {!!this.children.length && !this.open && (
                <scale-icon-navigation-right
                  size={20}
                ></scale-icon-navigation-right>
              )}
            </div>
          </div>
          {<slot name="children"></slot>}
        </nav>
      </Host>
    );
  }
}
