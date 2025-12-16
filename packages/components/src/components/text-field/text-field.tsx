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
  State,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { emitEvent, generateUniqueId } from '../../utils/utils';

export interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

@Component({
  tag: 'scale-text-field',
  styleUrl: './text-field.css',
  shadow: false,
})
export class TextField {
  @Element() hostElement: HTMLElement;
  /** (optional) Input type */
  @Prop() type?:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'date'
    | 'month' // example yyyy-mm
    | 'week' // example yyyy-W##
    | 'time' // example hh:mm
    | 'datetime-local' // example yyyy-mm-ddThh:mm
    | 'url' = 'text';
  /** (optional) Input mode */
  @Prop() inputModeType?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** Input label */
  @Prop() label: string = '';
  /** @deprecated - css overwrite should replace size */
  @Prop() size?: string;
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Variant */
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';
  /** (optional) Input text string max length */
  @Prop() maxLength?: number;
  /** (optional) Input text string min length */
  @Prop() minLength?: number;
  /** (optional) define the numeric maximum value of input types such as month, date, time */
  @Prop() max?: number;
  /** (optional) defines the numeric minimum value of input types such as month, date, time */
  @Prop() min?: number;
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
  /** (optional) input list */
  @Prop() list?: string;
  /** (optional) the input should automatically get focus when the page loads. */
  @Prop() inputAutofocus?: boolean;
  /** (optional) custom value for autocomplete HTML attribute */
  @Prop() inputAutocomplete?: string;
  /** (optional) id or space separated list of ids of elements that provide or link to additional related information. */
  @Prop() ariaDetailedId?: string;
  /** (optional) to avoid displaying the label */
  @Prop() hideLabelVisually?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional)) Makes type `input` behave as a controlled component in React */
  @Prop() experimentalControlled?: boolean = false;
  /** Emitted when a keyboard input occurred. */
  @Event({ eventName: 'scale-input' }) scaleInput!: EventEmitter<KeyboardEvent>;
  /** Emitted when the value has changed. */
  @Event({ eventName: 'scale-change' })
  scaleChange!: EventEmitter<InputChangeEventDetail>;
  /** Emitted when the input has focus. */
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  /** Emitted when the input loses focus. */
  @Event({ eventName: 'scale-blur' }) scaleBlur!: EventEmitter<void>;
  /** Emitted on keydown. */
  @Event({ eventName: 'scale-keydown' })
  scaleKeyDown!: EventEmitter<KeyboardEvent>;

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;

  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-text-field-' + this.internalId;
    }
  }

  componentDidRender() {
    // When `experimentalControlled` is true,
    // make sure the <input> is always in sync with the value.
    const value = this.value == null ? '' : this.value.toString();
    const input = this.hostElement.querySelector('input');
    if (this.experimentalControlled && input.value.toString() !== value) {
      input.value = value;
    }
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "size" is deprecated. Please use css overwrites for a small version!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  // We're not watching `value` like we used to
  // because we get unwanted `scaleChange` events
  // because how we keep this.value up-to-date for type="select"
  // `this.value = selectedValue`

  emitChange() {
    emitEvent(this, 'scale-change', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (this.experimentalControlled) {
      this.hostElement.querySelector('input').value = String(this.value);
      this.forceUpdate = String(Date.now());
    }
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
    emitEvent(this, 'scale-input', event as KeyboardEvent);
  };

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
  };

  handleFocus = () => {
    emitEvent(this, 'scale-focus');
    this.hasFocus = true;
  };

  handleBlur = () => {
    emitEvent(this, 'scale-blur');
    this.hasFocus = false;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    emitEvent(this, 'scale-keydown', event);
  };

  render() {
    const ariaInvalidAttr =
      this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = {
      'aria-describedBy':
        (this.helperText && helperTextId) || this.ariaDetailedId,
    };
    const ariaDetailsAttr = { 'aria-details': this.ariaDetailedId };
    const numericTypes = [
      'number',
      'date',
      'month',
      'week',
      'time',
      'datetime-local',
    ];

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label
            id={`${this.inputId}-label`}
            class="text-field__label"
            htmlFor={this.inputId}
          >
            {this.label}
          </label>
          <input
            type={this.type}
            inputMode={this.inputModeType}
            class="text-field__control"
            aria-labelledby={`${this.inputId}-label`}
            value={this.value}
            {...(!!this.name ? { name: this.name } : {})}
            {...(!!this.inputAutofocus ? { autofocus: 'true' } : {})}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            min={this.min}
            max={this.max}
            id={this.inputId}
            list={this.list}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            {...(!!this.placeholder && !this.readonly
              ? { placeholder: this.placeholder }
              : {})}
            disabled={this.disabled}
            readonly={this.readonly}
            autocomplete={this.inputAutocomplete}
            {...ariaInvalidAttr}
            {...(this.helperText || this.ariaDetailedId
              ? ariaDescribedByAttr
              : {})}
            {...(this.helperText && this.ariaDetailedId ? ariaDetailsAttr : {})}
            {...(numericTypes.includes(this.type) ? { step: this.step } : {})}
          />
          {(!!this.helperText || !!this.counter) && (
            <div
              class="text-field__meta"
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {this.helperText && (
                <scale-helper-text
                  id={helperTextId}
                  helperText={this.helperText}
                  variant={this.invalid ? 'danger' : this.variant}
                ></scale-helper-text>
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
    // the numeric type as followings, eg input[type="date"], will print a placeholder in some browsers
    const numericTypes = ['date', 'month', 'week', 'time', 'datetime-local'];
    const animated =
      (this.value != null && this.value !== '') ||
      numericTypes.includes(this.type);

    return classNames(
      'text-field',
      this.type && `text-field--type-${this.type}`,
      this.hasFocus && 'text-field--has-focus',
      this.disabled && `text-field--disabled`,
      this.transparent && 'text-field--transparent',
      this.status && `text-field--status-${this.status}`,
      this.invalid && `text-field--variant-danger`,
      this.variant && `text-field--variant-${this.variant}`,
      this.helperText && `text-field--helper-text`,
      this.readonly && `text-field--readonly`,
      this.hideLabelVisually && `text-field--hide-label`,
      animated && 'animated'
    );
  }
}
