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
  Event,
  EventEmitter,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

@Component({
  tag: 'scale-icon-button',
  styleUrl: 'icon-button.css',
  shadow: true,
})
export class IconButton {
  @Element() hostElement: HTMLElement;

  /** (optional) The size of the element */
  @Prop() size?: 'small' | 'standard' | 'large' = 'standard';
  /** (optional) Button type */
  @Prop() type?: 'standard' | 'activate' | 'toggle' = 'standard';
  /** (optional) The name of the button, submitted as a pair with the button's `value` as part of the form data */
  @Prop() name?: string;
  /** (optional) Defines the value associated with the button's `name` */
  @Prop() value?: string;
  /** (optional) Name of a file to be downloaded */
  @Prop() download?: string;
  /** (optional) Set `tabindex` in the inner button or link element */
  @Prop() innerTabindex?: number;
  /** (optional) Set the element to active state  */
  @Prop() active?: boolean;
  /** (optional) Element label  */
  @Prop() label?: string;
  /** (optional) Label placement  */
  @Prop() labelPlacement?: 'bottom' | 'right' = 'bottom';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** Emitted when the switch was clicked */
  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter;

  private focusableElement: HTMLElement;

  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  setDisabled() {
    Array.from(this.hostElement.childNodes).forEach((child) => {
      if (
        child.nodeType === 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON'
      ) {
        const icon: HTMLElement = this.hostElement.querySelector(
          child.nodeName
        );
        if (this.disabled) {
          icon.setAttribute('disabled', 'true');
        } else {
          icon.removeAttribute('disabled');
        }
      }
    });
  }

  connectedCallback() {
    Array.from(this.hostElement.childNodes).forEach((child) => {
      if (
        child.nodeType === 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON'
      ) {
        const icon: HTMLElement = this.hostElement.querySelector(
          child.nodeName
        );
        //set icon size
        switch (this.size) {
          case 'small':
            icon.setAttribute('size', '16');
            break;
          case 'standard':
            icon.setAttribute('size', '20');
            break;
          case 'large':
            icon.setAttribute('size', '24');
            break;
        }
        if (this.type == 'toggle') {
          if (this.active) {
            icon.setAttribute('selected', 'true');
          } else {
            icon.removeAttribute('selected');
          }
        }
      }
    });
    if (this.disabled) {
      this.setDisabled();
    }
  }

  componentDidUpdate() {
    if (this.type == 'toggle') {
      Array.from(this.hostElement.childNodes).forEach((child) => {
        if (
          child.nodeType === 1 &&
          child.nodeName.substr(0, 10) === 'SCALE-ICON'
        ) {
          const icon: HTMLElement = this.hostElement.querySelector(
            child.nodeName
          );
          if (this.active) {
            icon.setAttribute('selected', 'true');
          } else {
            icon.removeAttribute('selected');
          }
        }
      });
    }

    if (this.disabled) {
      this.setDisabled();      
    }
  }

  render() {
    const basePart = classNames(
      'base',
      this.labelPlacement && `label-${this.labelPlacement}`
    );

    const wrapperPart = classNames(
      this.labelPlacement && `label-${this.labelPlacement}`,
      this.size && `size-${this.size}`,
      this.disabled && 'disabled'
    );

    const alternatePart = classNames(
      this.type === 'activate' && 'activate',
      this.type === 'toggle' && 'toggle',
      this.active && 'active',
      this.size && `size-${this.size}`,
      `label-${this.labelPlacement}`,
      this.disabled && 'disabled'
    );

    return (
      <Host>
        {this.type === 'standard' ? (
          <div part={wrapperPart}>
            <button
              ref={(el) => (this.focusableElement = el)}
              type="button"
              part={basePart}
              tabIndex={this.innerTabindex}
              name={this.name}
              value={this.value}
              aria-pressed={this.active ? 'true' : 'false'}
              disabled={this.disabled}
            >
              <div class={'icon-button--plate'}>
                <slot />
              </div>
              <div class={'icon-button--label-wrapper'}>
                {this.label}
              </div>
            </button>
          </div>
        ) : (
          <label part={alternatePart}>
            <div>
              <input
                type="checkbox"
                checked={this.active}
                disabled={this.disabled}
                onChange={(event: any) => {
                  if (!this.disabled) {
                    this.active = event.target.checked;
                    emitEvent(this, 'scaleChange', { value: this.active });
                  }
                }}
                ref={(el) => (this.focusableElement = el)}
              />
              <div class={'icon-button--plate'}>
                <slot />
              </div>
            </div>
            <div class={'icon-button--label-wrapper'}>{this.label}</div>
          </label>
        )}
      </Host>
    );
  }
  getCssClassMap() {
    return classNames(
      'icon-button',
      this.type === 'activate' && 'icon-button--activate',
      this.type === 'toggle' && 'icon-button--toggle',
      this.active && 'icon-button--active',
      this.labelPlacement &&
        `icon-button--label-position-${this.labelPlacement}`,
      this.size && `icon-button--size-${this.size}`
    );
  }
}
