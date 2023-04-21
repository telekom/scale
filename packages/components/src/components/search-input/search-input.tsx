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

interface InputChangeEventDetail {
  value: string | undefined | null;
}

@Component({
  tag: 'scale-search-input',
  styleUrl: './search-input.css',
  shadow: true,
})
export class SearchInput {
  @Element() hostElement: HTMLElement;
  /** (optional) Input name */
  @Prop() name?: string = 'Search';
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
  @Prop({ mutable: true }) value?: string | null = '';
  /** (optional) Input id */
  @Prop() inputId?: string;
  /** (optional) input background transparent */
  @Prop() transparent?: boolean;
  /** (optional) the input should automatically get focus when the page loads. */
  @Prop() inputAutofocus?: boolean;
  @Prop() dismissable?: boolean;
  @Prop() variant?: string = 'onHover' || 'alwaysOn';
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
  /** Emitted when the input has focus. */
  @Event({ eventName: 'scale-focus-out' }) scaleFocusout!: EventEmitter<void>;
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

  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-search-' + this.internalId;
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
  }

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
    if (this.experimentalControlled) {
      this.hostElement.querySelector('input').value = String(this.value);
      this.forceUpdate = String(Date.now());
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
    this.hasFocus = true;
    emitEvent(this, 'scaleFocus');
  };

  handleFocusout = () => {
    this.hasFocus = false;
    emitEvent(this, 'scaleFocusout');
  };

  emitChange() {
    emitEvent(this, 'scaleChange', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  emitBlur = () => {
    emitEvent(this, 'scaleBlur');
  };

  emitKeyDown = (event: KeyboardEvent) => {
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
        onClick={() => (this.value = '')}
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
    const ariaDetailedById = { 'aria-details': this.ariaDetailedId };
    const basePart = classNames(
      'base',
      this.hasFocus && 'focus',
      this.disabled && 'disabled',
      this.variant == 'onHover' && 'onHover'
    );
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part={basePart}>
          <slot name="prefix-icon" />
          <input
            type="search"
            inputMode="search"
            part="input"
            placeholder={this.placeholder}
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
            onFocusout={this.handleFocusout}
            onKeyDown={this.emitKeyDown}
            onBlur={this.emitBlur}
            disabled={this.disabled}
            autocomplete={this.inputAutocomplete}
            {...ariaDetailedById}
          ></input>
          {this.dismissable ? (
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
      </Host>
    );
  }
}
