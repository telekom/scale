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
  Watch,
  Host,
} from '@stencil/core';
import { DuetDatePicker as DuetDatePickerCustomElement } from '@duetds/date-picker/custom-element';
import statusNote from '../../utils/status-note';

import {
  DuetDatePickerChangeEvent,
  DuetDatePickerDirection,
  DuetDatePickerFocusEvent,
  DuetDatePicker,
} from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
import classNames from 'classnames';
import { DuetLocalizedText } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-localization';
import { emitEvent, generateUniqueId } from '../../utils/utils';

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
  duetInput: DuetDatePicker & HTMLElement;

  @Element() hostElement: HTMLElement;
  /**
   * Name of the date picker input.
   */
  @Prop() name: string = 'date';

  /** @deprecated in v3 in favor of localization.calendarHeading */
  @Prop() popupTitle: string = 'Pick a date';

  /**
   * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
   */
  @Prop({ mutable: true }) identifier: string;

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
  @Prop({ reflect: true, mutable: true }) value: string = '';

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
  @Prop() localization?: DuetLocalizedText & {
    today: string;
  };

  /**
   * Date adapter, for custom parsing/formatting.
   * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
   * and a `format` function which accepts a `Date` and returns a `string`.
   * Default is IS0-8601 parsing and formatting.
   */
  @Prop() dateAdapter?: any;

  /** (optional) Helper text */
  @Prop() helperText?: string = '';

  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';

  /** (optional) invalid status */
  @Prop() invalid?: boolean;

  /** (optional) Label */
  @Prop() label: string = '';

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** @deprecated */
  @Prop() size?: string;

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
  @Event({ eventName: 'scale-change' })
  scaleChange: EventEmitter<DuetDatePickerChangeEvent>;

  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy: EventEmitter<DuetDatePickerChangeEvent>;

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event({ eventName: 'scale-blur' })
  scaleBlur: EventEmitter<DuetDatePickerFocusEvent>;

  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleBlur' })
  scaleBlurLegacy: EventEmitter<DuetDatePickerFocusEvent>;

  /**
   * Event emitted the date picker input is focused.
   */
  @Event({ eventName: 'scale-focus' })
  scaleFocus: EventEmitter<DuetDatePickerFocusEvent>;

  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleFocus' })
  scaleFocusLegacy: EventEmitter<DuetDatePickerFocusEvent>;

  private readonly internalId = i++;

  private mo: MutationObserver;

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

  /**
   * Watch `value` property for changes and update `hasValue` based on that.
   */
  @Watch('value')
  onValueChange() {
    this.hasValue = this.value != null && this.value !== '';
    // @ts-ignore
    this.duetInput.querySelector('.duet-date__input').value = this.value;
  }

  componentWillLoad() {
    if (this.popupTitle !== 'Pick a date') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "popupTitle" is deprecate in favor of localization.calendarHeading.',
        type: 'warn',
        source: this.hostElement,
      });
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (this.identifier == null) {
      this.identifier = 'scale-date-picker-' + i++;
    }
  }

  componentDidLoad() {
    const calendarIcon = this.duetInput.querySelector(
      '.duet-date__toggle-icon'
    );

    if (calendarIcon) {
      calendarIcon.replaceWith(
        document.createElement('scale-icon-content-calendar')
      );
    }

    const navLeftIcon = this.duetInput.querySelector('.duet-date__prev svg');

    if (navLeftIcon) {
      navLeftIcon.replaceWith(
        document.createElement('scale-icon-navigation-left')
      );
    }

    const navRightIcon = this.duetInput.querySelector('.duet-date__next svg');

    if (navRightIcon) {
      navRightIcon.replaceWith(
        document.createElement('scale-icon-navigation-right')
      );
    }

    const selectIcon = this.duetInput.querySelectorAll(
      '.duet-date__select-label svg'
    );

    if (selectIcon) {
      Array.from(selectIcon).forEach((icon: SVGElement) =>
        icon.replaceWith(
          document.createElement('scale-icon-navigation-collapse-down')
        )
      );
    }

    const input = this.duetInput.querySelector('.duet-date__input');

    if (input) {
      input.addEventListener('keyup', this.handleKeyPress);
    }

    if (input && this.helperText) {
      input.setAttribute(
        'aria-describedby',
        `helper-message-${this.internalId}`
      );
    }

    if (input && (this.status === 'error' || this.invalid)) {
      input.setAttribute('aria-invalid', 'true');
    }

    // Remove existing <h2> with `{Month} {Year}` text
    const dialog = this.hostElement.querySelector('.duet-date__dialog');
    let duetHeadingId: string = '';
    if (dialog) {
      duetHeadingId = dialog.getAttribute('aria-labelledby');
      if (duetHeadingId) {
        const duetHeading = this.hostElement.querySelector(`#${duetHeadingId}`);
        if (duetHeading) {
          duetHeading.parentElement.removeChild(duetHeading);
        }
      }
    }

    // Add custom <h2> heading
    const dialogContent = this.hostElement.querySelector(
      '.duet-date__dialog-content'
    );
    if (dialogContent) {
      const calendarHeading =
        this.localization?.calendarHeading || this.popupTitle || 'Pick a date';
      const heading = document.createElement('h2');
      heading.id = duetHeadingId; // link to .duet-date__dialog[aria-labelledby]
      heading.className = 'scale-date-picker__popup-heading';
      heading.innerHTML = calendarHeading;
      dialogContent.insertBefore(heading, dialogContent.firstChild);
    }

    // truncate table headings to a single character
    const tableHeadings = this.hostElement.querySelectorAll(
      '.duet-date__table-header span[aria-hidden="true"]'
    );
    if (tableHeadings) {
      Array.from(tableHeadings).forEach(
        (item) => (item.innerHTML = item.innerHTML[0])
      );
    }

    const today = this.hostElement.querySelector(
      '.duet-date__day.is-today span.duet-date__vhidden'
    );
    if (today) {
      today.innerHTML = `${today.innerHTML}, ${
        this.localization?.today || 'today'
      }`;
    }

    this.adjustButtonsLabelsForA11y();
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
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrite!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  /**
   * Fix JAWS reading the day twice, e.g. "19 19. August"
   * It'd probably make sense to open a PR in duetds/date-picker
   * https://github.com/duetds/date-picker/blob/master/src/components/duet-date-picker/date-picker-day.tsx#L61
   */
  adjustButtonsLabelsForA11y = () => {
    const table = this.hostElement.querySelector('.duet-date__table');
    const options = { subtree: true, childList: true, attributes: true };
    const callback = () => {
      this.mo.disconnect(); // avoid a feedback loop
      const buttons = Array.from(
        this.hostElement.querySelectorAll('.duet-date__day')
      );
      buttons.forEach((button) => {
        const span = button.querySelector('.duet-date__vhidden');
        const text = span.textContent;
        button.setAttribute('aria-label', text);
        span.setAttribute('hidden', 'hidden');
      });
      this.mo.observe(table, options);
    };
    this.mo = new MutationObserver(callback);
    callback();
  };

  disconnectedCallback() {
    const input = this.duetInput.querySelector('.duet-date__input');

    if (input) {
      input.removeEventListener('keyup', this.handleKeyPress);
    }

    if (this.mo) {
      this.mo.disconnect();
    }
  }

  handleKeyPress(e) {
    this.hasValue = e.target.value != null && e.target.value !== '';
  }

  render() {
    const helperTextId = `helper-message-${generateUniqueId()}`;
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          class={classNames(
            'scale-date-picker',
            this.status && `scale-date-picker--status-${this.status}`,
            this.invalid && `scale-date-picker--status-error`,
            this.hasFocus && 'scale-date-picker--focus',
            this.disabled && 'scale-date-picker--disabled',
            this.hasValue && 'animated'
          )}
        >
          <label class="date-picker__label" htmlFor={this.identifier}>
            {this.label}
          </label>
          <duet-date-picker
            onDuetChange={(e) => {
              emitEvent(this, 'scaleChange', e.detail);
              this.handleKeyPress(e);
            }}
            onDuetFocus={(e) => {
              emitEvent(this, 'scaleFocus', e.detail);
              this.hasFocus = true;
            }}
            onDuetBlur={(e) => {
              emitEvent(this, 'scaleBlur', e.detail);
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
            ref={(element: HTMLElement & DuetDatePicker) =>
              (this.duetInput = element)
            }
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
      </Host>
    );
  }
}
