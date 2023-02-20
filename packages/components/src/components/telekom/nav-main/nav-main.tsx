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
import statusNote from '../../../utils/status-note';

@Component({
  tag: 'scale-nav-main',
  styleUrl: './nav-main.css',
})
export class NavMain {
  @Element() hostElement: HTMLStencilElement;
  // DEPRECATED - megaMenuVisible should replace isActive
  @Prop() isActive: boolean;
  /** (optional) if this item is active */
  @Prop() active: boolean;
  @Prop() popup: boolean;
  // DEPRECATED - megaMenuVisible should replace isMegaMenuVisible
  @Prop() isMegaMenuVisible?: boolean = false;
  /** (optional) if this mega-menu is visible */
  @Prop() megaMenuVisible?: boolean = false;
  /** (optional) href value */
  @Prop() href?: string = 'javascript:void(0);';
  /** (optional) name value */
  @Prop() name: string;
  /** (optional) target value */
  @Prop() target?: string = '_self';

  @Prop() clickLink: any;
  hasPopup: boolean;

  componentWillLoad() {
    this.hasPopup =
      this.popup || !!this.hostElement.querySelector('app-mega-menu');
  }
  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isMegaMenuVisible !== false) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isMegaMenuVisible" is deprecated. Please use the "megaMenuVisible" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.isActive !== undefined) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isActive" is deprecated. Please use the "active" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  render() {
    return (
      <Host>
        <li class={this.getCssClassMap()}>
          <a
            class="main-navigation__item-link"
            href={this.href}
            target={this.target || '_self'}
            aria-current={this.active || this.isActive ? 'true' : 'false'}
            aria-haspopup={this.hasPopup ? 'true' : 'false'}
            onClick={this.clickLink}
          >
            <span class="main-navigation__item-link-text">{this.name}</span>
            {(this.active || this.isActive) && (
              <span class="sr-only">active</span>
            )}
          </a>
          <slot></slot>
        </li>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'main-navigation__item',
      (this.megaMenuVisible || this.isMegaMenuVisible) && 'mega-menu--visible',
      (this.active || this.isActive) && 'selected'
    );
  }
}
