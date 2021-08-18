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
  Event,
  h,
  EventEmitter,
  Host,
  State,
} from '@stencil/core';
import classNames from 'classnames';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

let i = 0;

@Component({
  tag: 'scale-text-field',
  styleUrl: './text-field.css',
  shadow: false,
})
export class TextField {
  /** (optional) Input type */
  @Prop() type?:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'date'
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input size */
  @Prop() size?: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input max length */
  @Prop() maxLength?: number;
  /** (optional) Input min length */
  @Prop() minLength?: number;
  /** (optional) Input placeHolder */
  @Prop() placeholder?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input readonly */
  @Prop() readonly?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input counter */
  @Prop() counter?: boolean;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) input background transparent */
  @Prop() transparent?: boolean;
  /** (optional) the step attribute specifies the interval between legal numbers in an <input type="number"> element. */
  @Prop() step?: string = '1';

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted when a keyboard input occurred. */
  @Event() scaleInput!: EventEmitter<KeyboardEvent>;
  /** Emitted when the value has changed. */
  @Event() scaleChange!: EventEmitter<InputChangeEventDetail>;
  /** Emitted when the input has focus. */
  @Event() scaleFocus!: EventEmitter<void>;
  /** Emitted when the input loses focus. */
  @Event() scaleBlur!: EventEmitter<void>;
  /** Emitted on keydown. */
  @Event() scaleKeyDown!: EventEmitter<KeyboardEvent>;

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-text-field' + i++;
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

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
    this.scaleInput.emit(event as KeyboardEvent);
  };

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
  };

  handleFocus = () => {
    this.scaleFocus.emit();
    this.hasFocus = true;
  };

  handleBlur = () => {
    this.scaleBlur.emit();
    this.hasFocus = false;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    this.scaleKeyDown.emit(event);
  };

  render() {
    const ariaInvalidAttr =
      this.status === 'error' ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label class="text-field__label" htmlFor={this.inputId}>
            {this.label}
          </label>
          <input
            type={this.type}
            class="text-field__control"
            value={this.value}
            {...(!!this.name ? { name: this.name } : {})}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            id={this.inputId}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            {...(!!this.placeholder ? { placeholder: this.placeholder } : {})}
            disabled={this.disabled}
            readonly={this.readonly}
            {...ariaInvalidAttr}
            {...(this.helperText ? ariaDescribedByAttr : {})}
            {...(this.type === 'number' ? { step: this.step } : {})}
          />

          {(!!this.helperText || !!this.counter) && (
            <div
              class="text-field__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <div class="text-field__helper-text">{this.helperText}</div>
              )}
              {this.counter && (
                <div class="text-field__counter">
                  {!!this.value ? String(this.value).length : 0} /{' '}
                  {this.maxLength}
                </div>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    // input[type="date"] will print a placeholder in some browsers
    const animated =
      (this.value != null && this.value !== '') || this.type === 'date';

    return classNames(
      'text-field',
      this.type && `text-field--type-${this.type}`,
      this.hasFocus && 'text-field--has-focus',
      this.disabled && `text-field--disabled`,
      this.transparent && 'text-field--transparent',
      this.status && `text-field--status-${this.status}`,
      this.size && `text-field--size-${this.size}`,
      this.readonly && `text-field--readonly`,
      animated && 'animated'
    );
  }
}
