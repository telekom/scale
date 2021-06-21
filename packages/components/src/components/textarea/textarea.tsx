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
  tag: 'scale-textarea',
  styleUrl: './textarea.css',
  shadow: false,
})
export class Textarea {
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) textarea row */
  @Prop() rows?: number;
  /** (optional) textarea column */
  @Prop() cols?: number;
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
  /** (optional) textarea resize */
  @Prop() resize?: 'unset' | 'none' | 'vertical' | 'horizontal';
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) input background transparent */
  @Prop() transparent?: boolean;
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
      this.inputId = 'input-textarea' + i++;
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
    const readonlyAttr = this.readonly ? { readonly: 'readonly' } : {};

    return (
      <Host>
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label class="textarea__label" htmlFor={this.inputId}>
            {this.label}
          </label>
          <textarea
            class="textarea__control"
            style={!!this.resize && { resize: this.resize }}
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
            {...readonlyAttr}
            {...(!!this.rows ? { rows: this.rows } : {})}
            {...(!!this.cols ? { cols: this.cols } : {})}
            {...ariaInvalidAttr}
            {...(this.helperText ? ariaDescribedByAttr : {})}
          />

          {/* Accessibility: solid background for the textarea label to avoid making the label unreadable when there's text underneath */}
          <span class="textarea__label-safety-background" aria-hidden="true" />
          {(!!this.helperText || !!this.counter) && (
            <div
              class="textarea__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <div class="textarea__helper-text">{this.helperText}</div>
              )}
              {this.counter && (
                <div class="textarea__counter">
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
    return classNames(
      'textarea',
      this.hasFocus && 'textarea--has-focus',
      this.resize && `textarea--resize-${this.resize}`,
      this.disabled && `textarea--disabled`,
      this.transparent && 'textarea--transparent',
      this.status && `textarea--status-${this.status}`,
      this.value != null && this.value !== '' && 'animated'
    );
  }
}
