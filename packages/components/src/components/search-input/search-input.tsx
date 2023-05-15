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

@Component({
  tag: 'scale-search-input',
  styleUrl: './search-input.css',
  shadow: true,
})
export class SearchInput {
  @Element() hostElement: HTMLElement;

  /** (optional) Input name */
  @Prop() name?: string = 'search';

  /** (optional) Input label */
  @Prop() label?: string = 'Search';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Input text string max length */
  @Prop() maxLength?: number;
  /** (optional) Input text string min length */
  @Prop() minLength?: number;
  /** (optional) Input placeHolder */
  @Prop() placeholder?: string = 'Search';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input value */
  @Prop({ mutable: true, reflect: true }) value?: string | null = '';
  /** (optional) the input should automatically get focus when the page loads. */
  @Prop() inputAutofocus?: boolean;
  /** (optional) custom value for autocomplete HTML attribute */
  /** (optional) id or space separated list of ids of elements that provide or link to additional related information. */
  @Prop() ariaDetailedId?: string;

  /** (optional)) Makes type `input` behave as a controlled component in React */
  @Prop() experimentalControlled?: boolean = false;
  @Prop() innerAriaExpanded: string;
  @Prop({ mutable: true, reflect: true }) inputId: string;
  /** Emitted when the input has focus. */
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  /** Emitted when the input loses focus. */
  @Event({ eventName: 'scale-blur' }) scaleBlur!: EventEmitter<void>;
  /** Emitted on keydown. */
  @Event({ eventName: 'scale-keydown' })
  scaleKeyDown!: EventEmitter<KeyboardEvent>;
  /** Emitted on interactive icon click */
  @Event({ eventName: 'scale-interactive-icon-click' })
  scaleInteractiveIconClick!: EventEmitter<KeyboardEvent>;

  /** Whether the input element has focus */
  @State() hasFocus: boolean = false;

  /** "forceUpdate" hack, set it to trigger and re-render */
  @State() forceUpdate: string;

  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Variant */
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';

  private readonly internalId = generateUniqueId();
  private inputElement: HTMLInputElement;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-search-' + this.internalId;
    }
  }

  componentDidRender() {
    // // When `experimentalControlled` is true,
    // // make sure the <input> is always in sync with the value.
    // const value = this.value == null ? '' : this.value.toString();
    // const input = this.hostElement.querySelector('input');
    // if (this.experimentalControlled && input.value.toString() !== value) {
    //   input.value = value;
    // }
  }

  handleFocus = () => {
    this.hasFocus = true;
    emitEvent(this, 'scaleFocus');
  };

  emitBlur = () => {
    this.hasFocus = false;
    emitEvent(this, 'scaleBlur');
  };

  emitKeyDown = (event: KeyboardEvent) => {
    setTimeout(() => {
      this.value = this.inputElement?.value;
    });
    emitEvent(this, 'scaleKeyDown', event);
  };

  emitInteractiveIconClick = (event: MouseEvent) => {
    emitEvent(this, 'scaleInteractiveIconClick', event);
  };

  getClearIconButton() {
    return (
      <scale-icon-button
        size="medium"
        part="clear-icon-button"
        onClick={() => (this.inputElement.value = '')}
      >
        <scale-icon-action-close
          part="clear-icon"
          accessibility-title="close"
          size={24}
        />
      </scale-icon-button>
    );
  }

  render() {
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    const ariaDetailedById = { 'aria-details': this.ariaDetailedId };
    const ariaInvalidAttr = this.invalid ? { 'aria-invalid': true } : {};

    const basePart = classNames(
      'base',
      this.hasFocus && 'focus',
      this.disabled && 'disabled'
    );
    return (
      <Host>
        <div part={basePart}>
          <slot name="prefix-icon" />
          <label id={`${this.inputId}-label`} part="label">
            {this.label}
          </label>
          <input
            ref={(ref) => (this.inputElement = ref)}
            aria-owns={`${this.inputId}-listbox`}
            aria-expanded={this.innerAriaExpanded}
            aria-labelledby={`${this.inputId}-label`}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            type="search"
            inputMode="search"
            part="input"
            role="combobox"
            placeholder={this.placeholder}
            value={this.value}
            {...(!!this.name ? { name: this.name } : {})}
            {...(!!this.inputAutofocus ? { autofocus: 'true' } : {})}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            id={this.inputId}
            onFocus={this.handleFocus}
            onKeyDown={this.emitKeyDown}
            onBlur={this.emitBlur}
            disabled={this.disabled}
            autocomplete="off"
            {...ariaDetailedById}
            {...ariaInvalidAttr}
            {...(this.helperText ? ariaDescribedByAttr : {})}
          ></input>
          {this.inputElement?.value ? (
            this.getClearIconButton()
          ) : (
            <div
              part="interactive-icon"
              onClick={this.emitInteractiveIconClick}
            >
              <slot name="suffix-icon" />
            </div>
          )}
        </div>
        {this.helperText && (
          <scale-helper-text
            id={helperTextId}
            helperText={this.helperText}
            variant={this.invalid ? 'danger' : this.variant}
          ></scale-helper-text>
        )}
      </Host>
    );
  }
}
