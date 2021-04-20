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

import { Component, Prop, h, Element, Host } from '@stencil/core';
import classNames from 'classnames';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-nav-main',
  styleUrl: './nav-main.css',
})
export class NavMain {
  @Element() hostElement: HTMLStencilElement;
  /** (optional) if this item is active */
  @Prop() isActive?: boolean = false;
  /** (optional) if this mega-menu is visible */
  @Prop() isMegaMenuVisible?: boolean = false;
  /** (optional) href value */
  @Prop() href?: string = 'javascript:void(0);';
  /** (optional) name value */
  @Prop() name: string;

  @Prop() clickLink: any;
  hasSlotMegaMenu: boolean;

  componentWillLoad() {
    this.hasSlotMegaMenu = !!this.hostElement.querySelector('app-mega-menu');
  }
  render() {
    return (
      <Host>
        <li class={this.getCssClassMap()}>
          <a
            class="main-navigation__item-link"
            href={this.href}
            aria-current={this.isActive ? 'true' : 'false'}
            aria-haspopup={this.hasSlotMegaMenu ? 'true' : 'false'}
            tabIndex={0}
            onClick={this.clickLink}
          >
            <span class="main-navigation__item-link-text">{this.name}</span>
            {this.isActive && <span class="sr-only">active</span>}
          </a>
          <slot></slot>
        </li>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'main-navigation__item',
      this.isMegaMenuVisible && 'mega-menu--visible',
      this.isActive && 'selected'
    );
  }
}
