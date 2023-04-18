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
import statusNote from '../../utils/status-note';

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
  @Prop() ariaRoleTitle?: string;
  /** (optional) chip aria-checked */
  @Prop() ariaCheckedState?: boolean;
  /** @deprecated - label slot should label prop */
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

    // handle deprecated props
    if (this.label !== '') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "label" is deprecated. Please use the slot!',
        type: 'warn',
        source: this.hostElement,
      });
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
    this.handleScaleChangeEvent(event);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    this.handleScaleChangeEvent(event);
  };

  handleScaleChangeEvent = (event) => {
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
        <scale-icon-action-success
          accessibility-title="success"
          size={16}
          selected
        />
      );
    } else if (this.type === 'persistent') {
      return (
        <scale-icon-action-success accessibility-title="success" size={16} />
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
            tabindex="-1"
            part={this.getBasePartMap()}
            class={this.getCssClassMap()}
          >
            <slot name="chip-icon"></slot>
            <span class="chip-label">
              <slot />
            </span>
            {this.selected ? this.getIcon() : null}
          </span>
        ) : (
          <span
            role={this.ariaRoleTitle ? this.ariaRoleTitle : 'switch'}
            aria-checked={
              this.ariaCheckedState ? this.ariaCheckedState : this.selected
            }
            tabindex="0"
            part={this.getBasePartMap()}
            class={this.getCssClassMap()}
            onClick={(event) => {
              !this.disabled || this.type === 'dynamic'
                ? this.handleClick(event)
                : null;
            }}
            onKeyDown={(event) => {
              (!this.disabled && ['Enter', ' '].includes(event.key)) ||
              (this.type === 'dynamic' && ['Enter', ' '].includes(event.key))
                ? this.handleKeyPress(event)
                : null;
            }}
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
