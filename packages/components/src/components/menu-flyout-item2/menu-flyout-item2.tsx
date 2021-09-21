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

import { Component, Prop, h, Host, Method, Event, EventEmitter, Element } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

@Component({
  tag: 'scale-menu-flyout-item2',
  styleUrl: 'menu-flyout-item2.css',
  shadow: true,
})
export class MenuFlyoutItem2 {
  @Element() hostElement: HTMLElement;

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

  private hasSlotSublist: boolean = false;

  /** Event triggered when menu item selected */
  @Event({ eventName: 'scale-select' }) scaleSelect: EventEmitter<{
    item: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleSelect' }) scaleSelectLegacy: EventEmitter<{
    item: HTMLElement;
  }>;

  @Method()
  async triggerEvent(eventType: 'keydown' | 'click', key?: 'Enter' | ' ' | 'ArrowRight') {
    // TODO refactor!! click if sublist should toggle
    if (eventType === 'keydown' && key === 'ArrowRight') {
      this.toggleSublistOpen()
      return;
    }
    if (!this.disabled) {
      emitEvent(this, 'scaleSelect', { item: this.hostElement })
    }
  }

  connectedCallback() {
    this.hasSlotSublist = this.hostElement.querySelector('[slot="sublist"]') != null;
  }

  toggleSublistOpen() {
    if (!this.hasSlotSublist) {
      return;
    }
    const sublist = this.hostElement.querySelector('[slot="sublist"]') as HTMLScaleMenuFlyoutList2Element
    sublist.trigger = () => this.hostElement
    sublist.direction = 'right'
    sublist.opened = true
  }

  getCssClassMap() {
    return classNames(
      'menu-flyout-item',
      this.disabled && 'menu-flyout-item--disabled',
      this.active && 'menu-flyout-item--active'
    );
  }

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
        <slot name="sublist"></slot>
      </Host>
    );
  }
}
