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
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

let i = 0;

@Component({
  tag: 'scale-radio-button',
  styleUrl: './radio-button.css',
  shadow: false,
})
export class RadioButton {
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
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted when the value has changed. */
  @Event() scaleChange!: EventEmitter<InputChangeEventDetail>;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-' + i++;
    }
  }

  // We're not watching `value` like we used to
  // because we get unwanted `scaleChange` events
  // because how we keep this.value up-to-date for type="select"
  // `this.value = selectedValue`
  emitChange() {
    this.scaleChange.emit({
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  @Watch('checked')
  checkedChanged() {
    this.scaleChange.emit({ value: this.checked });
  }

  // Handle checkbox/radio change (click on label)
  handleCheckChange = event => {
    this.checked = event.target.checked;
  };

  render() {
    const ariaInvalidAttr =
      this.status === 'error' ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <input
            type="radio"
            name={this.name}
            id={this.inputId}
            onChange={this.handleCheckChange}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            {...ariaInvalidAttr}
            {...ariaDescribedByAttr}
          />
          <label htmlFor={this.inputId}>{this.label}</label>
          {!!this.helperText && (
            <div
              class="radio-button__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              <div class="radio-button__helper-text">{this.helperText}</div>
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'radio-button',
      this.checked && `radio-button--checked`,
      this.disabled && `radio-button--disabled`,
      this.status && `radio-button--status-${this.status}`
    );
  }
}
