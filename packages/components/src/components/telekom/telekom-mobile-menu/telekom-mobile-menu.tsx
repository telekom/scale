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

  @Prop() activeRouteId: string;
  @Prop() closeButtonTitle: string = 'Close';

  @Prop() appName?: string;
  @Prop() appNameLink?: string;
  @Prop() appNameClick?: any;

  @State() currentLevel: number = 0;

  @Event({ eventName: 'scale-close-nav-flyout' }) scaleCloseNavFlyout;

  @Listen('scale-click-menu-item')
  handleClickMenuItem(e) {
    const hasChildren = !!e.target.querySelector('[slot="children"]');
    if (!hasChildren) {
      return;
    }
    if (e.target.hasAttribute('open')) {
      // go one level up
      this.selectItem(e.target);
      return;
    }
    // go one level down
    this.handleOpen(e.target);
  }

  connectedCallback() {
    this.setLevelOfItems();
  }

  componentWillRender() {
    const items = this.hostElement.querySelectorAll(
      'scale-telekom-mobile-menu-item'
    );

    this.hideItemsOnLevels({ items, levels: [1, 2] });

    const active = Array.from(items).find((item) => {
      return item.hasAttribute('active');
    });

    if (active) {
      this.selectItem(active);
    }
  }

  handleOpen = (target) => {
    // update current level
    this.currentLevel = Number(target.getAttribute('level'));

    // query all menu items
    const items = this.hostElement.querySelectorAll(
      'scale-telekom-mobile-menu-item'
    );

    // reset all items and hide them
    Array.from(items).forEach((item) => {
      item.removeAttribute('open');
      item.removeAttribute('hide-header');
      item.setAttribute('hidden', '');
    });

    // show affected items and the target
    [
      target,
      target.parentElement,
      // affected children
      ...Array.from(target.querySelectorAll('scale-telekom-mobile-menu-item')),
    ].forEach((item) => {
      item.removeAttribute('hidden');
    });

    // open the target and hide its header
    target.setAttribute('open', '');
    target.parentElement.setAttribute('hide-header', '');

    // hide third level items when in the first level
    if (this.currentLevel === 0) {
      this.hideItemsOnLevels({ items, levels: [2] });
    }
  };
  selectItem = (target) => {
    const items = this.hostElement.querySelectorAll(
      'scale-telekom-mobile-menu-item'
    );

    this.hideItemsOnLevels({ items, levels: [0, 1, 2] });
    target.removeAttribute('open');
    target.removeAttribute('hidden');
    target.parentElement.setAttribute('open', '');
    target.parentElement.removeAttribute('hidden');
    target.parentElement.removeAttribute('hide-header');
    target.parentElement.parentElement.setAttribute('hide-header', '');
    target.parentElement.parentElement.removeAttribute('hidden');
    Array.from(target.parentElement.children)
      .filter(({ tagName }) => tagName === 'SCALE-TELEKOM-MOBILE-MENU-ITEM')
      .forEach((item: HTMLElement) => item.removeAttribute('hidden'));
  };

  hideItemsOnLevels = ({
    items,
    levels,
  }: {
    items: NodeListOf<HTMLElement>;
    levels: number[];
  }) => {
    items.forEach((item) => {
      if (levels.includes(Number(item.getAttribute('level')))) {
        item.setAttribute('hidden', '');
      }
    });
  };
  setLevelOfItems = () => {
    const items = this.hostElement.querySelectorAll(
      'scale-telekom-mobile-menu-item'
    );

    const offset = Math.min(...Array.from(items).map((x) => elementDepth(x)));

    Array.from(items).forEach((item) => {
      const level = elementDepth(item) - offset;
      item.setAttribute('level', String(level));
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
            <scale-telekom-app-name>
              {this.appNameLink ? (
                <a onClick={this.appNameClick} href={this.appNameLink}>
                  {this.appName}
                </a>
              ) : (
                <span>{this.appName}</span>
              )}
            </scale-telekom-app-name>
          </div>

          <div part="links-top">
            <slot name="top-left"></slot>
            <slot name="top-right"></slot>
          </div>
          <nav part="nav">
            <slot></slot>
          </nav>
          <slot name="bottom"></slot>
        </div>
      </Host>
    );
  }
}
