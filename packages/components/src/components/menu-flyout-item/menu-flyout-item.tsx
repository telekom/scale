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
  Prop,
  h,
  Host,
  Element,
  Method,
  State,
} from '@stencil/core';
import classNames from 'classnames';

const name = 'menu-item';
@Component({
  tag: 'scale-menu-flyout-item',
  styleUrl: 'menu-flyout-item.css',
  shadow: true,
})
export class MenuFlyoutItem {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */
  @State() hasFocus = false;

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

  /* 4. Events (alphabetical) */

  /* 5. Private Properties (alphabetical) */
  /** Keep track of menu item element */
  menuItem: HTMLElement;

  /* 6. Lifecycle Events (call order) */
  constructor() {}
  connectedCallback() {}
  componentWillLoad() {}
  componentWillUpdate() {}
  componentDidRender() {}
  componentDidLoad() {}
  componentDidUpdate() {}
  disconnectedCallback() {}

  /* 7. Listeners */

  /* 8. Public Methods */
  /** Sets the focus on the item */
  @Method()
  async setFocus() {
    this.menuItem.focus();
  }

  /** Removes the focus from the item */
  @Method()
  async removeFocus() {
    this.menuItem.blur();
  }

  /* 9. Local Methods */
  getCssClassMap() {
    return classNames(
      name,
      this.disabled && `${name}--disabled`,
      this.hasFocus && `${name}--focused`,
      this.active && `${name}--active`
    );
  }

  /* 10. Render */
  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          ref={(el) => (this.menuItem = el)}
          part="base"
          role="menuitem"
          tabindex="-1"
          aria-disabled={this.disabled ? 'true' : 'false'}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onMouseEnter={() => this.setFocus()}
          onMouseLeave={() => this.removeFocus()}
          onTouchStart={() => this.setFocus()}
          onTouchEnd={() => this.removeFocus()}
        >
          <span part="prefix" class={`${name}__prefix`}>
            {this.checked === undefined ? (
              <slot name="prefix" />
            ) : (
              <scale-icon-action-success
                class={`${name}__check`}
                style={{
                  opacity:
                    !this.checked || this.checked === 'false' ? '0' : '1',
                }}
                size={16}
              ></scale-icon-action-success>
            )}
          </span>
          <span part="label" class={`${name}__label`}>
            <slot />
          </span>

          <span part="suffix" class={`${name}__suffix`}>
            {this.cascade ? (
              <scale-icon-navigation-right
                class={`${name}__cascade`}
                size={16}
                slot="suffix"
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
