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
  Element,
  Event,
  h,
  EventEmitter,
  Host,
  State,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

@Component({
  tag: 'scale-textarea',
  styleUrl: './textarea.css',
  shadow: false,
})
export class Textarea {
  @Element() hostElement: HTMLElement;
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
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Variant */
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';
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
  /** (optional) the input should automatically get focus when the page loads. */
  @Prop() inputAutofocus?: boolean;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted when a keyboard input occurred. */
  @Event({ eventName: 'scale-input' }) scaleInput!: EventEmitter<KeyboardEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleInput' })
  scaleInputLegacy!: EventEmitter<KeyboardEvent>;
  /** Emitted when the value has changed. */
  @Event({ eventName: 'scale-change' })
  scaleChange!: EventEmitter<InputChangeEventDetail>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy!: EventEmitter<InputChangeEventDetail>;
  /** Emitted when the input has focus. */
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleFocus' }) scaleFocusLegacy!: EventEmitter<void>;
  /** Emitted when the input loses focus. */
  @Event({ eventName: 'scale-blur' }) scaleBlur!: EventEmitter<void>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleBlur' }) scaleBlurLegacy!: EventEmitter<void>;
  /** Emitted on keydown. */
  @Event({ eventName: 'scale-keydown' })
  scaleKeyDown!: EventEmitter<KeyboardEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleKeyDown' })
  scaleKeyDownLegacy!: EventEmitter<KeyboardEvent>;

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  private focusableElement: HTMLElement;
  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-textarea-' + this.internalId;
    }
  }

  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "status" is deprecated. Please use the "invalid" property!',
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
    emitEvent(this, 'scaleChange', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
    emitEvent(this, 'scaleInput', event as KeyboardEvent);
  };

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
  };

  handleFocus = () => {
    emitEvent(this, 'scaleFocus');
    this.hasFocus = true;
  };

  handleBlur = () => {
    emitEvent(this, 'scaleBlur');
    this.hasFocus = false;
  };

  handleKeyDown = (event: KeyboardEvent) => {
    emitEvent(this, 'scaleKeyDown', event);
  };

  render() {
    const ariaInvalidAttr =
      this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    const readonlyAttr = this.readonly ? { readonly: 'readonly' } : {};

    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <div
            class="textarea__wrapper"
            onClick={() => this.focusableElement.focus()}
            style={
              !!this.resize &&
              this.resize === 'horizontal' && { width: 'max-content' }
            }
          >
            {/* Accessibility: label should be always *before* the actual input */}
            <label class="textarea__label" htmlFor={this.inputId}>
              {this.label}
            </label>
            <textarea
              class="textarea__control"
              style={!!this.resize && { resize: this.resize }}
              value={this.value}
              {...(!!this.name ? { name: this.name } : {})}
              {...(!!this.inputAutofocus ? { autofocus: 'true' } : {})}
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
              ref={(el) => (this.focusableElement = el)}
            />
          </div>
          {(!!this.helperText || !!this.counter) && (
            <div
              class="textarea__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <scale-helper-text
                  helperText={this.helperText}
                  variant={this.invalid ? 'danger' : this.variant}
                ></scale-helper-text>
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
      this.invalid && `textarea--status-error`,
      this.variant && `textarea--variant-${this.variant}`,
      this.readonly && `textarea--readonly`,
      this.value != null && this.value !== '' && 'animated'
    );
  }
}
