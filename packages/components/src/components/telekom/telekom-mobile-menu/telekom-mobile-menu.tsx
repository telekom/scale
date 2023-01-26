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

import {
  Component,
  h,
  Host,
  Element,
  Prop,
  Listen,
  State,
  Event,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { emitEvent } from '../../../utils/utils';

function elementDepth(el) {
  let depth = 0;
  while (null !== el.parentElement) {
    el = el.parentElement;
    depth++;
  }
  return depth;
}

@Component({
  tag: 'scale-telekom-mobile-menu',
  styleUrl: 'telekom-mobile-menu.css',
  shadow: true,
})
export class TelekomMobileMenu {
  @Element() hostElement: HTMLStencilElement;

  @Prop() closeButtonTitle: string = 'Close';
  @Prop() backButtonTitle: string = 'Back';

  @Prop() appName?: string;
  @Prop() appNameLink?: string;
  @Prop() appNameClick?: any;

  @State() currentLevel?: string;

  @Event({ eventName: 'scale-close-nav-flyout' }) scaleCloseNavFlyout;

  @Listen('scale-set-menu-item-active')
  handleSetMenuItemActive(e) {
    this.menuItems.forEach((element) => element.removeAttribute('active'));
    e.target.setAttribute('active', '');
  }
  @Listen('scale-set-menu-item-open')
  handleSetMenuItemOpen(e) {
    e.target.setAttribute('open', '');

    this.currentLevel = String(+e.target.getAttribute('level') + 1);

    Array.from(this.menuItems).forEach((element) => {
      element.setAttribute('current-level', this.currentLevel);
    });
  }

  connectedCallback() {
    this.setLevelAttributeForAllItems();
    this.currentLevel = this.activeItem
      ? String(+this.activeItem.getAttribute('level'))
      : '0';
    Array.from(this.menuItems).forEach((element) => {
      element.setAttribute('current-level', this.currentLevel);
    });
  }

  componentWillRender() {}

  get menuItems(): NodeListOf<HTMLElement> | null {
    return this.hostElement.querySelectorAll('scale-telekom-mobile-menu-item');
  }
  get activeItem(): HTMLElement | null {
    return Array.from(this.menuItems).find((element) =>
      element.hasAttribute('active')
    );
  }
  get openItems(): HTMLElement[] | null {
    return Array.from(this.menuItems).filter((element) =>
      element.hasAttribute('open')
    );
  }

  setLevelAttributeForAllItems = () => {
    const offset = Math.min(
      ...Array.from(this.menuItems).map((x) => elementDepth(x))
    );
    Array.from(this.menuItems).forEach((item) => {
      const level = elementDepth(item) - offset;
      item.setAttribute('level', String(level));
    });
  };

  back = () => {
    Array.from(this.openItems).forEach((element) => {
      if (element.getAttribute('level') === String(+this.currentLevel - 1)) {
        return element.removeAttribute('open');
      }
    });
    this.currentLevel = String(+this.currentLevel - 1);

    Array.from(this.menuItems).forEach((element) => {
      element.setAttribute('current-level', this.currentLevel);
    });
  };

  render() {
    return (
      <Host>
        <button
          part="close-button"
          onClick={(e) => {
            emitEvent(this, 'scaleCloseNavFlyout', e);
          }}
        >
          <scale-icon-action-close
            size={24}
            accessibility-title={this.closeButtonTitle}
          ></scale-icon-action-close>
        </button>

        <div part="base">
          <div part="app-name">
            {this.appNameLink ? (
              <a onClick={this.appNameClick} href={this.appNameLink}>
                {this.appName}
              </a>
            ) : (
              <span>{this.appName}</span>
            )}
          </div>

          <div part="links-top">
            <slot name="top-left"></slot>
            <slot name="top-right"></slot>
          </div>
          <nav
            part="nav"
          >
            {+this.currentLevel > 0 ? (
              <button part="back-button" 
                onClick={() => {
                  this.back();
                }}
              >
                <scale-icon-navigation-left></scale-icon-navigation-left>
                {this.backButtonTitle}
              </button>
            ) : null}
            <slot></slot>
          </nav>
          <slot name="bottom"></slot>
        </div>
      </Host>
    );
  }
}
