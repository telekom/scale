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
  h,
  Prop,
  Method,
  Element,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';
import { DuetDatePicker as DuetDatePickerCustomElement } from '@duetds/date-picker/custom-element';

import {
  DuetDatePickerChangeEvent,
  DuetDatePickerDirection,
  DuetDatePickerFocusEvent,
  DuetDatePicker,
} from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
import classNames from 'classnames';
import { DuetLocalizedText } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-localization';
import statusNote from '../../utils/status-note';

let i = 0;

if (
  typeof window !== 'undefined' &&
  typeof window.Audio !== 'undefined' &&
  !customElements.get('duet-date-picker')
) {
  customElements.define('duet-date-picker', DuetDatePickerCustomElement);
}

@Component({
  tag: 'scale-date-picker',
  shadow: false,
  styleUrl: 'date-picker.css',
})
export class DatePicker {
  duetInput: DuetDatePicker;

  @Element() hostElement: HTMLElement;
  /**
   * Name of the date picker input.
   */
  @Prop() name: string = 'date';

  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  @Prop() identifier: string = '';

  /**
   * Makes the date picker input component disabled. This prevents users from being able to
   * interact with the input, and conveys its inactive state to assistive technologies.
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Defines a specific role attribute for the date picker input.
   */
  @Prop() role: string;

  /**
   * Forces the opening direction of the calendar modal to be always left or right.
   * This setting can be useful when the input is smaller than the opening date picker
   * would be as by default the picker always opens towards right.
   */
  @Prop() direction: DuetDatePickerDirection = 'right';

  /**
   * Should the input be marked as required?
   */
  @Prop() required: boolean = false;

  /**
   * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  @Prop({ reflect: true }) value: string = '';

  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the max property.
   */
  @Prop() min: string = '';

  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   * This setting can be used alone or together with the min property.
   */
  @Prop() max: string = '';

  /**
   * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
   * Default is Monday.
   */
  @Prop() firstDayOfWeek?: any;

  /**
   * Button labels, day names, month names, etc, used for localization.
   * Default is English.
   */
  @Prop() localization?: DuetLocalizedText;

  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  @Prop() dateAdapter?: any;

  /** (optional) Helper text */
  @Prop() helperText?: string = '';

  /** (optional) Status */
  @Prop() status?: string = '';

  /** (optional) Label */
  @Prop() label: string = '';

  /** (optional) Size */
  @Prop() size?: string = '';

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  /** Whether the input element has value */
  @State() hasValue: boolean = this.value != null && this.value !== '';

  /**
   * Events section.
   */

  /**
   * Event emitted when a date is selected.
   */
  @Event() scaleChange: EventEmitter<DuetDatePickerChangeEvent>;

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event() scaleBlur: EventEmitter<DuetDatePickerFocusEvent>;

  /**
   * Event emitted the date picker input is focused.
   */
  @Event() scaleFocus: EventEmitter<DuetDatePickerFocusEvent>;

  /**
   * Public methods API
   */

  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  @Method() async setFocus() {
    return this.duetInput.setFocus();
  }

  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  @Method() async show() {
    return this.duetInput.show();
  }

  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  @Method() async hide(moveFocusToButton = true) {
    return this.duetInput.hide(moveFocusToButton);
  }

  componentWillLoad() {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (this.identifier == null) {
      this.identifier = 'scale-date-picker-' + i++;
    }
  }

  componentDidLoad() {
    const icon = this.duetInput
      // @ts-ignore
      .querySelector('.duet-date__toggle-icon');

    if (icon) {
      icon.replaceWith(document.createElement('scale-icon-content-calendar'));
    }

    const input = this.duetInput
      // @ts-ignore
      .querySelector('.duet-date__input');

    if (input) {
      input.addEventListener('keyup', this.handleKeyPress);
    }
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  disconnectedCallback() {
    const input = this.duetInput
      // @ts-ignore
      .querySelector('.duet-date__input');

    if (input) {
      input.removeEventListener('keyup', this.handleKeyPress);
    }
  }

  handleKeyPress(e) {
    this.hasValue = e.target.value != null && e.target.value !== '';
  }

  render() {
    const ariaInvalidAttr =
      this.status === 'error' ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <div
        class={classNames(
          'scale-date-picker',
          this.status && `scale-date-picker--status-${this.status}`,
          this.hasFocus && 'scale-date-picker--focus',
          this.disabled && 'scale-date-picker--disabled',
          this.size && `scale-date-picker--size-${this.size}`,
          this.hasValue && 'animated'
        )}
      >
        <label class="date-picker__label" htmlFor={this.identifier}>
          {this.label}
        </label>
        <duet-date-picker
          onDuetChange={(e) => {
            this.scaleChange.emit(e.detail);
            this.handleKeyPress(e);
          }}
          onDuetFocus={(e) => {
            this.scaleFocus.emit(e.detail);
            this.hasFocus = true;
          }}
          onDuetBlur={(e) => {
            this.scaleBlur.emit(e.detail);
            this.hasFocus = false;
          }}
          name={this.name}
          identifier={this.identifier}
          role={this.role}
          direction={this.direction}
          required={this.required}
          min={this.min}
          max={this.max}
          firstDayOfWeek={this.firstDayOfWeek}
          localization={this.localization}
          dateAdapter={this.dateAdapter}
          disabled={this.disabled}
          value={this.value}
          // @ts-ignore
          ref={(element) => (this.duetInput = element)}
          {...ariaInvalidAttr}
          {...ariaDescribedByAttr}
        ></duet-date-picker>
        {!!this.helperText && (
          <div
            class="date-picker__meta"
            id={helperTextId}
            aria-live="polite"
            aria-relevant="additions removals"
          >
            <div class="date-picker__helper-text">{this.helperText}</div>
          </div>
        )}
      </div>
    );
  }
}
