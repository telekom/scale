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

import { DuetDatePicker as DuetDatePickerCustomElement } from '@duetds/date-picker/custom-element';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import statusNote from '../../utils/status-note';

import { DuetLocalizedText } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-localization';
import {
  DuetDatePicker,
  DuetDatePickerChangeEvent,
  DuetDatePickerDirection,
  DuetDatePickerFocusEvent,
} from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
import classNames from 'classnames';
import { emitEvent, generateUniqueId, type ScaleIcon } from '../../utils/utils';

if (
  typeof window !== 'undefined' &&
  typeof window.Audio !== 'undefined' &&
  !customElements.get('duet-date-picker')
) {
  customElements.define('duet-date-picker', DuetDatePickerCustomElement);
}

const DEFAULT_ICON_SIZE = 20;

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
  @Prop() innerRole: string;

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

  /** (optional) Input place holder */
  @Prop() placeholder?: string = '';

  /** @deprecated */
  @Prop() size?: string;

  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';

  /** (optional) id or space separated list of ids of elements that provide or link to additional related information. */
  @Prop() ariaDetailsId?: string;

  /** (optional) to avoid displaying the label */
  @Prop() hideLabelVisually?: boolean = false;

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

  /**
   * Event emitted the date picker input is blurred.
   */
  @Event({ eventName: 'scale-blur' })
  scaleBlur: EventEmitter<DuetDatePickerFocusEvent>;

  /**
   * Event emitted the date picker input is focused.
   */
  @Event({ eventName: 'scale-focus' })
  scaleFocus: EventEmitter<DuetDatePickerFocusEvent>;

  private readonly internalId = generateUniqueId();

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
    this.hasValue = this.value !== null && this.value !== '';
    const input = this.duetInput.querySelector('.duet-date__input');
    if (input) {
      // @ts-ignore
      input.value = this.value;
    }
  }

  /**
   * Watch `placeholder` property for changes and update `placeholder` based on that.
   */
  @Watch('placeholder')
  onPlaceholderChange(newValue: string) {
    const input = this.duetInput.querySelector('.duet-date__input');
    if (input && this.placeholder) {
      input.setAttribute('placeholder', newValue);
    }
  }
  /**
   * Watch `localization` for changes and refresh all DOM bits we set manually
   * (buttonLabel/title, custom heading, weekday abbreviations, "today" suffix, etc.).
   */
  @Watch('localization')
  onLocalizationChange() {
    if (this.duetInput && this.localization) {
      (this.duetInput as any).localization = this.localization;
    }
    this.updateDomOnLocalizationChange();
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
      this.identifier = 'scale-date-picker-' + this.internalId;
    }
  }

  componentDidLoad() {
    const calendarIcon = this.duetInput.querySelector(
      '.duet-date__toggle-icon'
    );

    if (calendarIcon) {
      const icon = document.createElement(
        'scale-icon-content-calendar'
      ) as ScaleIcon;
      icon.size = DEFAULT_ICON_SIZE;
      calendarIcon.replaceWith(icon);
    }

    const navLeftIcon = this.duetInput.querySelector('.duet-date__prev svg');

    if (navLeftIcon) {
      const scaleNavLeftIcon = document.createElement(
        'scale-icon-navigation-left'
      ) as ScaleIcon;
      scaleNavLeftIcon.size = 16;
      navLeftIcon.replaceWith(scaleNavLeftIcon);
    }

    const navRightIcon = this.duetInput.querySelector('.duet-date__next svg');

    if (navRightIcon) {
      const scaleNavRightIcon = document.createElement(
        'scale-icon-navigation-right'
      ) as ScaleIcon;
      scaleNavRightIcon.size = 16;
      navRightIcon.replaceWith(scaleNavRightIcon);
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

    if (input && (this.helperText || this.ariaDetailsId)) {
      const describedBy = this.helperText
        ? `helper-message-${this.internalId}`
        : this.ariaDetailsId;
      input.setAttribute('aria-describedby', describedBy);
    }

    if (input && this.ariaDetailsId) {
      input.setAttribute('aria-details', this.ariaDetailsId);
    }

    if (input && this.placeholder) {
      input.setAttribute('placeholder', this.placeholder);
    }

    if (input && (this.status === 'error' || this.invalid)) {
      input.setAttribute('aria-invalid', 'true');
    }

    this.adjustButtonsLabelsForA11y();

    // Initialize all localized bits
    this.updateDomOnLocalizationChange();
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
    if (!table) {
      // The node we need does not exist yet. Wait and try again.
      setTimeout(this.adjustButtonsLabelsForA11y);
      return;
    }
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
    if (this.duetInput) {
      const input = this.duetInput.querySelector('.duet-date__input');

      if (input) {
        input.removeEventListener('keyup', this.handleKeyPress);
      }
    }

    if (this.mo) {
      this.mo.disconnect();
    }
  }

  handleKeyPress(e) {
    this.hasValue = e.target.value != null && e.target.value !== '';
  }

  render() {
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
            this.hasValue && 'animated',
            this.helperText && 'has-helper-text',
            this.hideLabelVisually && 'scale-date-picker--hide-label'
          )}
        >
          <label class="date-picker__label" htmlFor={this.identifier}>
            {this.label}
          </label>
          <duet-date-picker
            onDuetChange={(e) => {
              emitEvent(this, 'scale-change', e.detail);
              this.handleKeyPress(e);
            }}
            onDuetFocus={(e) => {
              emitEvent(this, 'scale-focus', e.detail);
              this.hasFocus = true;
            }}
            onDuetBlur={(e) => {
              emitEvent(this, 'scale-blur', e.detail);
              this.hasFocus = false;
            }}
            name={this.name}
            identifier={this.identifier}
            role={this.innerRole}
            direction={this.direction}
            required={this.required}
            min={this.min}
            max={this.max}
            firstDayOfWeek={this.firstDayOfWeek}
            localization={this.localization}
            dateAdapter={this.dateAdapter}
            disabled={this.disabled}
            value={this.value}
            ref={(element: HTMLDuetDatePickerElement & DuetDatePicker) =>
              (this.duetInput = element)
            }
          ></duet-date-picker>
          {this.helperText && (
            <scale-helper-text
              helperText={this.helperText}
              variant={this.invalid ? 'danger' : this.variant}
            ></scale-helper-text>
          )}
        </div>
      </Host>
    );
  }
  private updateDomOnLocalizationChange = () => {
    // Remove Duet’s default <h2> and ensure our custom heading exists/updates
    const dialog = this.hostElement.querySelector('.duet-date__dialog');
    const dialogContent = this.hostElement.querySelector(
      '.duet-date__dialog-content'
    );
    if (dialog && dialogContent) {
      const duetHeadingId = dialog.getAttribute('aria-labelledby') || '';
      if (duetHeadingId) {
        const duetHeading = this.hostElement.querySelector<HTMLElement>(
          '#' + duetHeadingId
        );
        if (duetHeading && duetHeading.parentElement) {
          duetHeading.parentElement.removeChild(duetHeading);
        }
      }
      const calendarHeading =
        this.localization?.calendarHeading || this.popupTitle || 'Pick a date';
      let heading = this.hostElement.querySelector<HTMLElement>(
        '.scale-date-picker__popup-heading'
      );
      if (!heading) {
        heading = document.createElement('h2');
        if (duetHeadingId) {
          heading.id = duetHeadingId;
          heading.className = 'scale-date-picker__popup-heading';
          dialogContent.insertBefore(heading, dialogContent.firstChild);
        }
      }
      heading.textContent = calendarHeading;
    }

    // Toggle button (buttonLabel / title / aria-label)
    const toggleBtn =
      this.hostElement.querySelector<HTMLButtonElement>('.duet-date__toggle');
    const btnLabel = (this.localization as any)?.buttonLabel;
    if (toggleBtn && btnLabel) {
      toggleBtn.setAttribute('title', btnLabel);
      toggleBtn.setAttribute('aria-label', btnLabel);
    }

    // Truncate weekday headings to one character
    // Update weekday headings based on current localization
    const short =
      (this.localization as any)?.weekdays?.shorthand || // Duet format
      (this.localization as any)?.dayNamesShort || // alternative
      (this.localization as any)?.dayNames?.map((d: string) => d.slice(0, 1)) ||
      [];

    // Adjust for firstDayOfWeek (Duet default = Monday = 1)
    const start = Number.isInteger(this.firstDayOfWeek)
      ? Number(this.firstDayOfWeek)
      : 1;

    const ordered =
      short.length === 7
        ? [...short.slice(start), ...short.slice(0, start)]
        : short;

    // Apply the correct short labels to the DOM
    const tableHeadings = Array.from(
      this.hostElement.querySelectorAll<HTMLElement>(
        '.duet-date__table-header span[aria-hidden="true"]'
      )
    );

    tableHeadings.forEach((el, i) => {
      const label = ordered[i];
      // Use the first character if full names are provided
      el.textContent = label ? label[0] : (el.textContent || '').slice(0, 1);
    });

    // "today" visually hidden text
    const today = this.hostElement.querySelector(
      '.duet-date__day.is-today span.duet-date__vhidden'
    );
    if (today) {
      today.innerHTML = `${today.innerHTML}, ${
        this.localization?.today || 'today'
      }`;
    }
  };
}
