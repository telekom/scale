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
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import { HTMLStencilElement } from '@stencil/core/internal';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

let i = 0;

@Component({
  tag: 'scale-dropdown',
  styleUrl: './dropdown.css',
  shadow: false,
})
export class Dropdown {
  selectElement: HTMLSelectElement;
  mutationObserver: MutationObserver;

  @Element() hostElement: HTMLStencilElement;
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
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
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

  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;

  hasSlotIcon: boolean;

  componentWillLoad() {
    this.hasSlotIcon = !!this.hostElement.querySelector('[slot="icon"]');

    if (this.inputId == null) {
      this.inputId = 'input-dropdown' + i++;
    }
  }

  componentDidLoad() {
    // Keep this.value up-to-date for type="select".
    // This is important also for React, where `value` is used to control the element state.
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
    // This is a workaroud to prevent a bug in Stencil:
    // when using slots without Shadow DOM (possible only with Stencil)
    // sometimes an update in the Light DOM does not trigger a re-render
    // thus causing unexpected results.
    // https://gitlab.com/scale-ds/scale-telekom/-/issues/16
    if (this.selectElement) {
      this.mutationObserver = new MutationObserver(() => {
        this.forceUpdate = String(Date.now());
      });
      this.mutationObserver.observe(this.hostElement, {
        childList: true,
        subtree: true,
      });
    }
  }

  componentDidUpdate() {
    this.hasSlotIcon = !!this.hostElement.querySelector('[slot="icon"]');
  }
  componentDidRender() {
    // When type `select` and `controlled` is true,
    // make sure the <select> is always in sync with the value.
    const value = this.value == null ? '' : this.value.toString();
    if (this.controlled && this.selectElement.value.toString() !== value) {
      this.selectElement.value = value;
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
    this.scaleChange.emit({
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  // Handle change on <select> independently
  // so we can allow "controlled" (React) behavior,
  // in which only the `value` changing does update
  // the actual <select> value, not the user's input.
  handleSelectChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;

    if (this.controlled) {
      this.scaleChange.emit({ value: target.value });
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
  };

  handleBlur = () => {
    this.scaleBlur.emit();
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
        <div class={this.getCssClassMap()}>
          {/* Accessibility: label should be always *before* the actual input */}
          <label class="input__label" htmlFor={this.inputId}>
            {this.label}
          </label>
          <div class="input__dropdown-wrapper">
            <select
              ref={(el) => (this.selectElement = el)}
              class="input__dropdown"
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
            >
              <slot />
            </select>
            <div class="input__dropdown-icon">
              {this.hasSlotIcon ? (
                <slot name="icon" />
              ) : (
                <scale-icon-navigation-collapse-down decorative />
              )}
            </div>
          </div>

          {!!this.helperText && (
            <div
              class="input__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {!!this.helperText && (
                <div class="input__helper-text">{this.helperText}</div>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'dropdown',
      this.disabled && `dropdown--disabled`,
      this.transparent && 'dropdown--transparent',
      this.status && `dropdown--status-${this.status}`,
      this.size && `dropdown--size-${this.size}`,
      this.value != null && this.value !== '' && 'animated'
    );
  }
}
