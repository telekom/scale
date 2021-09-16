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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-menu-flyout-item2',
  styleUrl: 'menu-flyout-item2.css',
  shadow: true,
})
export class MenuFlyoutItem2 {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 3. Public Properties (alphabetical) */
  /** (optional) Used by cascading menus to set when open */
  @Prop() active? = false;
  /** (optional) Set to true to display arrow icon suffix */
  @Prop() cascade? = false;
  /** (optional) Set to true to display check prefix, false to display empty prefix */
  @Prop() checked?: any;
  /** (optional) Disabled */
  @Prop() disabled? = false;
  /** (optional) Injected styles */
  @Prop() styles?: string;
  /** (optional) value */
  @Prop() value?: string;

  getCssClassMap() {
    return classNames(
      'menu-flyout-item',
      this.disabled && 'menu-flyout-item--disabled',
      this.active && 'menu-flyout-item--active'
    );
  }

  /* 10. Render */
  render() {
    return (
      <Host role="menuitem" tabindex="-1">
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          part="base"
          aria-disabled={this.disabled ? 'true' : 'false'}
        >
          <span part="prefix" class="menu-flyout-item__prefix">
            {this.checked === undefined ? (
              <slot name="prefix" />
            ) : (
              <scale-icon-action-success
                class="menu-flyout-item__check"
                style={{
                  opacity:
                    !this.checked || this.checked === 'false' ? '0' : '1',
                }}
                size={16}
              ></scale-icon-action-success>
            )}
          </span>
          <span part="label" class="menu-flyout-item__label">
            <slot />
          </span>
          <span part="suffix" class="menu-flyout-item__suffix">
            {this.cascade ? (
              <scale-icon-navigation-right
                class="menu-flyout-item__cascade"
                size={16}
              ></scale-icon-navigation-right>
            ) : (
              <slot name="suffix" />
            )}
          </span>
        </div>
      </Host>
    );
  }
}
