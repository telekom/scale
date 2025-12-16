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

import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, isPseudoClassSupported } from '../../utils/utils';

let i = 0;

// For chrome that applies :focus upon click, and :focus-visible isn't widely supported
const isFocusVisibleSupported = isPseudoClassSupported(':focus-visible');

@Component({
  tag: 'scale-switch',
  styleUrl: './switch.css',
  shadow: false,
})
export class Switch {
  /** (optional) Active switch */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false;
  /** (optional) Disabled switch */
  @Prop() disabled?: boolean = false;
  /** (optional) Input name */
  @Prop() name?: string;
  /** (optional) Input id */
  @Prop({ mutable: true }) inputId?: string;
  /** (optional) switch label */
  @Prop() label?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @Prop() size?: 'small' | 'large' = 'large';

  /** Emitted when the switch was clicked */
  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'switch-' + i++;
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          <label id={`${this.inputId}-label`} class="switch__wrapper">
            <input
              type="checkbox"
              name={this.name}
              class="switch__control"
              checked={this.checked}
              disabled={this.disabled}
              aria-labelledby={`${this.inputId}-label`}
              id={this.inputId}
              onChange={(event: any) => {
                this.checked = event.target.checked;
                emitEvent(this, 'scale-change', { value: this.checked });
              }}
            />
            <span class="switch__toggle" aria-hidden="true">
              <span class="switch__thumb">
                <scale-icon-action-checkmark size={12} decorative selected />
              </span>
              <span class="switch__io-text">
                <span>{this.checked ? 'I' : '0'}</span>
              </span>
            </span>
            <span class="switch__toggle--overlay" aria-hidden="true"></span>
            {this.label && <span class="switch__label-text">{this.label}</span>}
          </label>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'switch',
      this.checked && 'switch--checked',
      this.disabled && 'switch--disabled',
      this.size && `switch--size-${this.size}`,
      isFocusVisibleSupported && 'switch--focus-visible-supported',
      !isFocusVisibleSupported && 'switch--focus-visible-not-supported'
    );
  }
}
