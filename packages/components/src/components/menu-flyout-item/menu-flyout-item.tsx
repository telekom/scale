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
  Method,
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

@Component({
  tag: 'scale-menu-flyout-item',
  styleUrl: 'menu-flyout-item.css',
  shadow: true,
})
export class MenuFlyoutItem {
  @Element() hostElement: HTMLElement;

  /** (optional) Set to true to display arrow icon suffix */
  @Prop() cascade? = false; // TODO rename to `hasMenu`?
  /** (optional) Mark as active */
  @Prop({ reflect: true }) active? = false;
  /** (optional) Whether the item should behave as a checkbox */
  @Prop() checkable?: 'checkbox' | 'radio' | null;
  /** (optional) Set to true to display check prefix, false to display empty prefix */
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;
  /** (optional) Disabled */
  @Prop({ reflect: true }) disabled? = false;
  /** (optional) value */
  @Prop({ reflect: true }) value?: string;
  /** (optional) Injected styles */
  @Prop() styles?: string;

  /** Event triggered when menu item selected */
  @Event({ eventName: 'scale-select' }) scaleSelect: EventEmitter<{
    item: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleSelect' }) scaleSelectLegacy: EventEmitter<{
    item: HTMLElement;
  }>;

  private hasSlotSublist: boolean = false;

  // TODO there is lot of room for improving this, aka edge-cases
  @Method()
  async triggerEvent(
    event: KeyboardEvent | MouseEvent,
    closeOnSelect: boolean = true
  ) {
    const { key } = event as KeyboardEvent;
    if (this.disabled) {
      return;
    }
    if (key === 'ArrowRight' && !this.hasSlotSublist) {
      return;
    }
    if (this.hasSlotSublist) {
        this.openSublist();
      return;
    }
    const detail = {
      eventType: event.type,
      key,
      item: this.hostElement,
      closeOnSelect,
      originalEvent: event,
    };

    emitEvent(this, 'scaleSelect', detail);
  }

  connectedCallback() {
    this.hasSlotSublist =
      this.hostElement.querySelector('[slot="sublist"]') != null;
    if (this.hasSlotSublist) {
      this.cascade = true;
    }
  }

  openSublist() {
    const sublist = this.hostElement.querySelector(
      '[slot="sublist"]'
    ) as HTMLScaleMenuFlyoutListElement;
    if (sublist == null) {
      return;
    }
    sublist.trigger = () => this.hostElement;
    sublist.direction = 'right';
    sublist.open();
  }

  getCssClassMap() {
    return classNames(
      'menu-flyout-item',
      this.disabled && 'menu-flyout-item--disabled',
      this.checkable != null && 'menu-flyout-item--checkable',
      this.active && 'menu-flyout-item--active'
    );
  }

  render() {
    const checked = this.checked ? 'true' : 'false';

    return (
      <Host
        role={this.checkable ? `menuitem${this.checkable}` : 'menuitem'}
        aria-checked={this.checkable == null ? false : checked}
        aria-disabled={this.disabled ? 'true' : undefined}
        tabindex="-1"
      >
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()} part="base">
          <span part="prefix" class="menu-flyout-item__prefix">
            {this.checkable == null ? (
              <slot name="prefix" />
            ) : (
              <scale-icon-action-success
                class="menu-flyout-item__check"
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
