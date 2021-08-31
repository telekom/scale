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

import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { isPseudoClassSupported } from '../../utils/utils';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

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
  /** (optional) Input id */
  @Prop({ mutable: true }) inputId?: string;
  /** (optional) switch label */
  @Prop() label?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted when the switch was clicked */
  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy!: EventEmitter;

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
          <label id={`${this.inputId}-label`}>
            <input
              type="checkbox"
              checked={this.checked}
              disabled={this.disabled}
              aria-labelledby={`${this.inputId}-label`}
              id={this.inputId}
              onChange={(e: any) => {
                this.checked = e.target.checked;
                // bubble event through the shadow dom
                emitEvent(this, 'scaleChange', { value: this.checked });
              }}
            />
            <div class="switch__wrapper">
              <div class="switch__toggle" />
              <div class="switch__text" />
            </div>
            {this.label && <span class="switch__label">{this.label}</span>}
          </label>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'switch',
      this.disabled && 'switch--disabled',
      isFocusVisibleSupported && 'switch--focus-visible-supported',
      !isFocusVisibleSupported && 'switch--focus-visible-not-supported'
    );
  }
}
