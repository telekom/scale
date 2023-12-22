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
  Event,
  EventEmitter,
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
@Component({
  tag: 'scale-chip',
  styleUrl: './chip.css',
  shadow: true,
})
export class Chip {
  @Element() hostElement: HTMLElement;
  /** (optional) */
  @Prop() variant?: 'standard' | 'outline' = 'standard';
  /** (optional) */
  @Prop() type?: 'dynamic' | 'persistent' = 'persistent';
  /** (optional) */
  @Prop() selected?: boolean = false;
  /** (optional) chip aria-role */
  @Prop() ariaRoleTitle?: 'switch' | 'radio' | 'option' | 'menuitemreadio' | 'menuitemcheckbox' | 'checkbox' = 'switch';
  /** @deprecated (optional) chip aria-checked - should be derived from selected state attribute */
  @Prop() ariaCheckedState?: boolean = false;
  /** (optional) chip label */
  @Prop() label?: string;
  /** (optional) chip disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) Dismiss label */
  @Prop() dismissText?: string = 'dismiss';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optional) Change icon click event */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy: EventEmitter<MouseEvent>;
  /** (optional) Close icon click event */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClose' })
  scaleCloseLegacy: EventEmitter<MouseEvent>;

  componentDidRender() {
    // handle no setted icon size attribute
    const defaultIconSize = 24;
    const iconSlot = this.hostElement.querySelector(
      '[slot="chip-icon"]'
    ) as HTMLElement;
    if (iconSlot !== null) {
      if (
        iconSlot.children[0].getAttribute('size') === String(defaultIconSize)
      ) {
        iconSlot.children[0].setAttribute('size', String(16));
      }
      if (this.selected) {
        iconSlot.children[0].setAttribute('selected', String(true));
      } else {
        iconSlot.children[0].setAttribute('selected', String(false));
      }
    }
  }
  disconnectedCallback() {}

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled && this.type !== 'dynamic') {
      return;
    }
    emitEvent(this, 'scaleClose', event);
  };

  handleClick = (event: MouseEvent) => {
    if (this.type !== 'dynamic') {
      this.selected = !this.selected;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled && this.type !== 'dynamic') {
      return;
    }
    emitEvent(this, 'scaleChange', event);
  };

  getIcon() {
    if (this.type === 'dynamic' && this.selected) {
      return (
        <button
          part="button-dismissable"
          disabled={this.disabled}
          aria-label={this.dismissText}
          onClick={!this.disabled ? this.handleClose : null}
        >
          <scale-icon-action-close
            accessibility-title="close"
            size={16}
            selected
          />
        </button>
      );
    } else if (this.type === 'persistent' && this.selected) {
      return (
        <scale-icon-action-checkmark
          accessibility-title="success"
          size={16}
          selected
        />
      );
    } else if (this.type === 'persistent') {
      return (
        <scale-icon-action-checkmark accessibility-title="success" size={16} />
      );
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        {this.type === 'dynamic' && this.selected ? (
          <span
            role={this.ariaRoleTitle}
            tabindex={this.selected ? '0' : '-1'}
            part={this.getBasePartMap()}
            class={this.getCssClassMap()}
            aria-checked={this.selected.toString()}
            onClick={
              !this.disabled || this.type === 'dynamic'
                ? this.handleClick
                : null
            }
          >
            <slot name="chip-icon"></slot>
            <span class="chip-label">
              <slot />
            </span>
            {this.selected ? this.getIcon() : null}
          </span>
        ) : (
          <span
            role={this.ariaRoleTitle}
            aria-checked={this.selected.toString()}
            tabindex={this.selected ? '0' : '-1'}
            part={this.getBasePartMap()}
            class={this.getCssClassMap()}
            onClick={
              !this.disabled || this.type === 'dynamic'
                ? this.handleClick
                : null
            }
          >
            <slot name="chip-icon"></slot>
            <span class="chip-label">
              <slot />
            </span>
            {this.selected ? this.getIcon() : null}
          </span>
        )}
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'chip';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      mode === 'basePart' ? 'base' : component,
      !!this.selected && `${prefix}selected`,
      !!this.disabled && `${prefix}disabled`,
      this.type && `${prefix}type-${this.type}`,
      this.variant && `${prefix}variant-${this.variant}`
    );
  }
}
