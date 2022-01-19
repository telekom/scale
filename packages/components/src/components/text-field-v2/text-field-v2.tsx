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
import { emitEvent } from '../../utils/utils';
import statusNote from '../../utils/status-note';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

let i = 0;

@Component({
  tag: 'scale-text-field-v2',
  styleUrl: './text-field-v2.css',
  shadow: false,
})
export class TextFieldV2 {
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
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input size */
  @Prop() size?: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
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
  /** (optional) input list */
  @Prop() list?: string;
  /** (optional) the input should automatically get focus when the page loads. */
  @Prop() inputAutofocus?: boolean;
  /** (optional) input prefix */
  @Prop() inputprefix?: string;
  /** (optional) input suffix */
  @Prop() inputsuffix?: string;

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
  @Event({ eventName: 'scaleKeydown' })
  scaleKeyDownLegacy!: EventEmitter<KeyboardEvent>;

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-text-field' + i++;
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
    if (this.inputprefix) {
      const width = this.hostElement.querySelector('.text-field-v2__prefix').getBoundingClientRect().width
      this.hostElement.style.setProperty('--prefix-length',`${width}px`)
    }
    if (this.inputsuffix) {
      const width = this.hostElement.querySelector('.text-field-v2__suffix').getBoundingClientRect().width
      this.hostElement.style.setProperty('--suffix-length',`${width}px`)
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
      this.status === 'error' || this.invalid ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label class="text-field-v2__label" htmlFor={this.inputId}>
            {this.label}
          </label>
          {this.inputprefix !== '' ? <div class="text-field-v2__prefix"> {this.inputprefix} </div> : {}}          
          <input
            type={this.type}
            class="text-field-v2__control"
            value={this.value}
            {...(!!this.name ? { name: this.name } : {})}
            {...(!!this.inputAutofocus ? { autofocus: 'true' } : {})}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            id={this.inputId}
            list={this.list}
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
              class="text-field-v2__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <div class="text-field-v2__helper-text">{this.helperText}</div>
              )}
              {this.counter && (
                <div class="text-field-v2__counter">
                  {!!this.value ? String(this.value).length : 0} /{' '}
                  {this.maxLength}
                </div>
              )}
            </div>
          )}
          {this.inputsuffix && <div class="text-field-v2__suffix"> {this.inputsuffix} </div>}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    // input[type="date"] will print a placeholder in some browsers
    const animated =
      (this.value != null && this.value !== '') || this.type === 'date';

    return classNames(
      'text-field-v2',
      this.type && `text-field-v2--type-${this.type}`,
      this.hasFocus && 'text-field-v2--has-focus',
      this.disabled && `text-field-v2--disabled`,
      this.transparent && 'text-field-v2--transparent',
      this.status && `text-field-v2--status-${this.status}`,
      this.invalid && `text-field-v2--status-error`,
      this.size && `text-field-v2--size-${this.size}`,
      this.readonly && `text-field-v2--readonly`,
      this.inputprefix && `text-field-v2--has-prefix`,
      this.inputsuffix && `text-field-v2--has-suffix`,
      animated && 'animated'
    );
  }
}
