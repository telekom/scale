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

import { Component, Prop, Element, h } from '@stencil/core';
import classNames from 'classnames';
import { renderIcon } from '../../../utils/render-icon';
import statusNote from '../../../utils/status-note';

@Component({
  tag: 'scale-nav-icon',
  styleUrl: './nav-icon.css',
})
export class NavIcon {
  @Element() host: HTMLElement;
  /** (optional) if this item is active */
  // DEPRECATED - active should replace isActive
  @Prop() isActive: boolean;
  @Prop() active: boolean;
  /** (optional) href value */
  @Prop() href?: string = 'javascript:void(0);';
  @Prop() clickLink: any;
  @Prop() icon: string;
  // DEPRECATED - mobileMenuOpen should replace isMobileMenuOpen
  @Prop() isMobileMenuOpen?: boolean = false;
  @Prop() mobileMenuOpen?: boolean = false;
  @Prop() refMobileMenuToggle?: any;
  @Prop() refMobileUserMenuToggle?: any;
  @Prop() refUserMenuToggle?: any;
  @Prop() badge: boolean = false;
  @Prop() badgeLabel: number;

  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isActive !== undefined) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isActive" is deprecated. Please use the "active" property!',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.isMobileMenuOpen !== false) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isMobileMenuOpen" is deprecated. Please use the "mobileMenuOpen" property!',
        type: 'warn',
        source: this.host,
      });
    }
  }

  render() {
    return (
      <li class={this.getCssClassMap()}>
        <a
          class="meta-navigation__item-link"
          ref={
            this.refMobileMenuToggle ||
            this.refMobileUserMenuToggle ||
            this.refUserMenuToggle
          }
          href={this.href}
          role={this.href === 'javascript:void(0);' ? 'button' : null}
          onClick={this.clickLink}
          onKeyDown={(event) => {
            if (!this.refMobileMenuToggle) {
              return;
            }
            if (['Enter', ' ', 'Escape', 'Esc'].includes(event.key)) {
              event.preventDefault();
              this.clickLink(event);
            }
          }}
        >
          {this.badge || (this.badgeLabel && this.badge) || this.badgeLabel ? (
            <scale-notification-badge label={this.badgeLabel} type="nav-icon">
              {renderIcon({
                tag: `scale-icon-${this.icon}`,
                attributes: {
                  class: 'meta-navigation__item-link-icon',
                  selected: this.active || this.isActive,
                },
              })}
            </scale-notification-badge>
          ) : (
            renderIcon({
              tag: `scale-icon-${this.icon}`,
              attributes: {
                class: 'meta-navigation__item-link-icon',
                selected: this.active || this.isActive,
              },
            })
          )}
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
      (this.active ||
        this.isActive ||
        this.mobileMenuOpen ||
        this.isMobileMenuOpen) &&
        'meta-navigation__item--selected',
      !!this.refMobileMenuToggle && 'mobile-menu'
    );
  }
}
