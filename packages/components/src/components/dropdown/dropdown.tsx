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
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

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
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** @deprecated */
  @Prop() size?: string;
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Variant */
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';
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

  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;

  hasSlotIcon: boolean;
  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    this.hasSlotIcon = !!this.hostElement.querySelector('[slot="icon"]');

    if (this.inputId == null) {
      this.inputId = 'input-dropdown-' + this.internalId;
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
  };

  handleBlur = () => {
    emitEvent(this, 'scaleBlur');
  };

  handleKeyDown = (event: KeyboardEvent) => {
    emitEvent(this, 'scaleKeyDown', event);
  };

  render() {
    const ariaInvalidAttr =
      this.status === 'error' || this.invalid ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${this.internalId}`;
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
              {...(this.helperText ? ariaDescribedByAttr : {})}
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

  getCssClassMap() {
    return classNames(
      'dropdown',
      this.disabled && `dropdown--disabled`,
      this.transparent && 'dropdown--transparent',
      this.status && `dropdown--status-${this.status}`,
      this.helperText && 'dropdown--helper-text',
      this.variant &&
        `dropdown--variant-${this.invalid ? 'danger' : this.variant}`,
      this.value != null && this.value !== '' && 'animated',
      !this.label && 'dropdown--no-label'
    );
  }
}
