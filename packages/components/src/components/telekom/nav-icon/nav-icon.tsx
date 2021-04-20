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

import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import { renderIcon } from '../../../utils/render-icon';

@Component({
  tag: 'scale-nav-icon',
  styleUrl: './nav-icon.css',
})
export class NavIcon {
  /** (optional) if this item is active */
  @Prop() isActive?: boolean = false;
  /** (optional) href value */
  @Prop() href?: string = 'javascript:void(0);';
  @Prop() clickLink: any;
  @Prop() icon: string;
  @Prop() isMobileMenuOpen?: boolean = false;
  @Prop() refMobileMenuToggle?: any;

  render() {
    return (
      <li class={this.getCssClassMap()}>
        <a
          class="meta-navigation__item-link"
          ref={this.refMobileMenuToggle}
          href={this.href}
          onClick={this.clickLink}
          onKeyDown={event => {
            if (!this.refMobileMenuToggle) {
              return;
            }
            if (['Enter', ' ', 'Escape', 'Esc'].includes(event.key)) {
              event.preventDefault();
              this.clickLink(event);
            }
          }}
        >
          {renderIcon({
            tag: `scale-icon-${this.icon}`,
            attributes: { class: 'meta-navigation__item-link-icon' },
          })}
          <span class="meta-navigation__item-label">
            <slot></slot>
          </span>
        </a>
      </li>
    );
  }

  getCssClassMap() {
    return classNames(
      'meta-navigation__item',
      !!this.refMobileMenuToggle && 'mobile-menu',
      this.isMobileMenuOpen && 'open'
    );
  }
}
