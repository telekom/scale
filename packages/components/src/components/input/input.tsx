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
  Watch,
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { emitEvent, generateUniqueId } from '../../utils/utils';

export interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

const SELECT_ICON =
  'M20.65 7.4c-.3-.3-.75-.3-1.05 0L12 15 4.4 7.4c-.3-.3-.75-.3-1.05 0s-.3.75 0 1.05L12 17.1l8.65-8.65c.3-.25.3-.75 0-1.05z';

@Component({
  tag: 'scale-input',
  styleUrl: './input.css',
  shadow: false,
})
export class Input {
  selectElement: HTMLSelectElement;
  mutationObserver: MutationObserver;

  @Element() el: HTMLElement;
  /** (optional) Input type */
  @Prop() type?:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'textarea'
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label variant */
  @Prop() variant?: 'animated' | 'static' = 'static';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input size */
  @Prop() size?: string = '';
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
  /** (optional) Input max length */
  @Prop() maxLength?: number;
  /** (optional) Input min length */
  @Prop() minLength?: number;
  /** (optional) Input placeHolder */
  @Prop() placeholder?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input counter */
  @Prop() counter?: boolean;
  /** (optional) Active switch */
  @Prop({ reflect: true }) checked?: boolean = false;
  /** (optional) textarea resize */
  @Prop() resize?: 'unset' | 'none' | 'vertical' | 'horizontal';
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) Input checkbox checked icon */
  @Prop() icon?: string;
  /** (optional) select multiple options */
  @Prop() multiple?: boolean;
  /** (optional) the number of visible options in a select drop-down list */
  @Prop() visibleSize?: number;
  /** (optional) input background transparent */
  @Prop() transparent?: boolean;
  /** (optional) Makes type `select` behave as a controlled component in React */
  @Prop() controlled?: boolean = false;

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optional) data-qa attribute for e2e testing */
  @Prop() dataQa?: string;

  /** Emitted when a keyboard input occurred. */
  @Event({ eventName: 'scale-input' }) scaleInput!: EventEmitter<KeyboardEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleInput' })
  scaleInputLegacy: EventEmitter<KeyboardEvent>;
  /** Emitted when the value has changed. */
  @Event({ eventName: 'scale-change' })
  scaleChange: EventEmitter<InputChangeEventDetail>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy: EventEmitter<InputChangeEventDetail>;
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
  /** (optional) Input checkbox checked */
  @State() customResize?: any;
  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;
  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;

  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-' + this.internalId;
    }
    // Default icon for `select` type
    if (this.type === 'select' && this.icon == null) {
      this.icon = SELECT_ICON;
    }
  }

  componentDidLoad() {
    // tslint:disable-next-line:no-console
    statusNote({
      tag: 'deprecated',
      source: this.el,
      type: 'warn',
      extraMessage: `Please use <${
        {
          select: 'scale-dropdown',
          checkbox: 'scale-checkbox',
          radio: 'scale-radio-button',
          textarea: 'scale-textarea',
        }[this.type] || 'scale-text-field'
      }> instead.`,
    });
    // Keep this.value up-to-date for type="select".
    // This is important also for React, where `value` is used to control the element state.
    if (this.type === 'select') {
      const select = this.selectElement;
      const selectedValue =
        select.selectedIndex > -1
          ? select.options[select.selectedIndex].value
          : null;

      // If we have a `value` passed, set it on the <select> element
      // Otherwise, if we have an <option selected>, set its value on `value`
      if (this.value) {
        select.value = String(this.value);
      } else if (selectedValue) {
        this.value = selectedValue;
      }
    }
    // This is a workaroud to prevent a bug in Stencil:
    // when using slots without Shadow DOM (possible only with Stencil)
    // sometimes an update in the Light DOM does not trigger a re-render
    // thus causing unexpected results.
    // https://gitlab.com/scale-ds/scale-telekom/-/issues/16
    if (this.type === 'select' && this.selectElement) {
      this.mutationObserver = new MutationObserver(() => {
        this.forceUpdate = String(Date.now());
      });
      this.mutationObserver.observe(this.el, {
        childList: true,
        subtree: true,
      });
    }
  }

  componentWillUpdate() {}
  componentDidRender() {
    // When type `select` and `controlled` is true,
    // make sure the <select> is always in sync with the value.
    const value = this.value == null ? '' : this.value.toString();
    if (
      this.type === 'select' &&
      this.controlled &&
      this.selectElement.value.toString() !== value
    ) {
      this.selectElement.value = value;
    }

    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.el,
      });
    }
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
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

  @Watch('checked')
  checkedChanged() {
    emitEvent(this, 'scaleChange', { value: this.checked });
  }

  // Handle checkbox/radio change (click on label)
  handleCheckChange = (event) => {
    this.checked = event.target.checked;
  };

  // Handle click on checkbox visual element
  handleCheckboxClick = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  };

  // Handle change on <select> independently
  // so we can allow "controlled" (React) behavior,
  // in which only the `value` changing does update
  // the actual <select> value, not the user's input.
  handleSelectChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;

    if (this.controlled) {
      emitEvent(this, 'scaleChange', { value: target.value });
      this.selectElement.value = String(this.value);
      this.forceUpdate = String(Date.now());
    } else {
      this.value = target.value || '';
      this.emitChange();
    }
  };

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
    const Tag = this.type === 'textarea' ? 'textarea' : 'input';

    const ariaInvalidAttr =
      this.status === 'error' || this.invalid ? { 'aria-invalid': 'true' } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    if (this.type === 'checkbox') {
      return (
        <Host checked={this.checked}>
          <div class={this.getCssClassMap()}>
            <input
              type="checkbox"
              name={this.name}
              id={this.inputId}
              onChange={this.handleCheckChange}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              {...ariaInvalidAttr}
              {...ariaDescribedByAttr}
              {...(this.dataQa ? { 'data-qa': this.dataQa } : {})}
            />
            <div
              class={classNames('input__checkbox-container')}
              onClick={this.handleCheckboxClick}
            >
              <span class={classNames('input__checkbox-placeholder')}></span>
              {/* Accessibility: rendering the icon *only* when checked, otherwise is always visible in HCM */}
              {!!this.icon && this.checked && (
                <scale-icon path={this.icon} size={12}></scale-icon>
              )}
            </div>
            <label htmlFor={this.inputId}>{this.label}</label>
            {!!this.helperText && (
              <div
                class="input__meta"
                id={helperTextId}
                aria-live="polite"
                aria-relevant="additions removals"
              >
                <div class="input__helper-text">{this.helperText}</div>
              </div>
            )}
          </div>
        </Host>
      );
    }

    if (this.type === 'radio') {
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
              {...(this.dataQa ? { 'data-qa': this.dataQa } : {})}
            />
            <label htmlFor={this.inputId}>{this.label}</label>
            {!!this.helperText && (
              <div
                class="input__meta"
                id={helperTextId}
                aria-live="polite"
                aria-relevant="additions removals"
              >
                <div class="input__helper-text">{this.helperText}</div>
              </div>
            )}
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label class="input__label" htmlFor={this.inputId}>
            {this.label}
          </label>
          {this.type === 'select' ? (
            <div class="input__select-wrapper">
              <select
                ref={(el) => (this.selectElement = el)}
                class={classNames('input__select')}
                // @ts-ignore
                value={this.value}
                onChange={this.handleSelectChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                disabled={this.disabled}
                required={this.required}
                multiple={this.multiple}
                id={this.inputId}
                name={this.name}
                size={this.visibleSize}
                {...ariaInvalidAttr}
                {...ariaDescribedByAttr}
                {...(this.dataQa ? { 'data-qa': this.dataQa } : {})}
              >
                <slot />
              </select>
              {!!this.icon && <scale-icon path={this.icon}></scale-icon>}
            </div>
          ) : (
            <Tag
              type={this.type}
              class={classNames(
                `input__${this.type === 'textarea' ? 'textarea' : 'input'}`,
                this.customResize && this.customResize.id
              )}
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
              {...(!!this.rows ? { rows: this.rows } : {})}
              {...(!!this.cols ? { cols: this.cols } : {})}
              {...ariaInvalidAttr}
              {...ariaDescribedByAttr}
              {...(this.dataQa ? { 'data-qa': this.dataQa } : {})}
            />
          )}

          {/* Accessibility: solid background for the textarea label to avoid making the label unreadable when there's text underneath */}
          {this.type === 'textarea' && this.variant === 'animated' && (
            <span
              class="input__textarea-label-safety-background"
              aria-hidden="true"
            />
          )}
          {(!!this.helperText || !!this.counter) && (
            <div
              class="input__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <div class="input__helper-text">{this.helperText}</div>
              )}
              {this.counter && (
                <div class="input__counter">
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
      'input',
      this.type && `input--type-${this.type}`,
      this.hasFocus && 'input--has-focus',
      this.checked && `input--checked`,
      this.resize && `input--resize-${this.resize}`,
      this.variant && `input--variant-${this.variant}`,
      this.disabled && `input--disabled`,
      this.transparent && 'input--transparent',
      this.status && `input--status-${this.status}`,
      this.invalid && `input--status-error`,
      this.size && `input--size-${this.size}`,
      this.value != null && this.value !== '' && 'animated'
    );
  }
}
