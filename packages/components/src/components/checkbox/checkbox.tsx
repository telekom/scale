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
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from '@stencil/core';
import classNames from 'classnames';

let i = 0;

@Component({
  tag: 'scale-checkbox',
  styleUrl: './checkbox.css',
  shadow: false,
})
export class Checkbox {
  @Element() el: HTMLElement;
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Active switch */
  @Prop({ reflect: true }) checked?: boolean = false;
  /** (optional) indeterminate */
  @Prop({ reflect: true }) indeterminate?: boolean = false;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** Emitted when the value has changed. */
  @Event() scaleChange!: EventEmitter;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-checkbox-' + i++;
    }
  }

  render() {
    const ariaInvalidAttr =
      this.status === 'error' ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <Host checked={this.checked}>
        <div class={this.getCssClassMap()}>
          <label class="checkbox__label-wrapper" htmlFor={this.inputId}>
            <input
              type="checkbox"
              name={this.name}
              id={this.inputId}
              onChange={(e: any) => {
                this.checked = e.target.checked;
                // bubble event through the shadow dom
                this.scaleChange.emit({
                  value: this.checked,
                  id: e.target.id,
                  checked: e.target.checked,
                });
              }}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              {...ariaInvalidAttr}
              {...(this.helperText ? ariaDescribedByAttr : {})}
            />
            <div class="checkbox__control-wrapper">
              <span class="checkbox__control"></span>
              {/* Accessibility: rendering the icon *only* when checked, otherwise is always visible in HCM */}
              {this.checked && (
                <scale-icon-action-success
                  class="icon"
                  decorative
                ></scale-icon-action-success>
              )}
              {this.indeterminate && (
                <scale-icon-action-play class="icon"></scale-icon-action-play>
              )}
            </div>
            <span class="checkbox__label">
              {this.label ? this.label : <slot></slot>}
            </span>
            {!!this.helperText && (
              <div
                class="checkbox__meta"
                id={helperTextId}
                aria-live="polite"
                aria-relevant="additions removals"
              >
                <div class="checkbox__helper-text">{this.helperText}</div>
              </div>
            )}
          </label>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'checkbox',
      this.checked && `checkbox--checked`,
      this.disabled && `checkbox--disabled`,
      this.status && `checkbox--status-${this.status}`
    );
  }
}
