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
  tag: 'scale-search',
  styleUrl: './search.css',
  shadow: true,
})
export class Search {
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
  /** Emitted when the input has focus. */
  @Event({ eventName: 'scale-focus-out' }) scaleFocusout!: EventEmitter<void>;
  /** Emitted on keydown. */
  @Event({ eventName: 'scale-keydown' })
  scaleKeyDown!: EventEmitter<KeyboardEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleKeydown' })
  scaleKeyDownLegacy!: EventEmitter<KeyboardEvent>;

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

  emitChange() {
    emitEvent(this, 'scaleChange', {
      value: this.value == null ? this.value : this.value.toString(),
    });
  }

  handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (this.experimentalControlled) {
      this.hostElement.querySelector('input').value = String(this.value);
      this.forceUpdate = String(Date.now());
    }
    if (target) {
      this.value = target.value || '';
      this.emitChange();
    }
    emitEvent(this, 'scaleInput', event as KeyboardEvent);
  };

  handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      console.log(target.value);
      this.value = target.value || '';
      this.emitChange();
    }
  };

  handleFocus = () => {
    emitEvent(this, 'scaleFocus');
    this.hasFocus = true;
  };

  handleFocusout = () => {
    emitEvent(this, 'scaleFocusout');
    this.hasFocus = false;
  };

  handleBlur = () => {
    emitEvent(this, 'scaleBlur');
  };

  handleKeyDown = (event: KeyboardEvent) => {
    emitEvent(this, 'scaleKeyDown', event);
  };

  render() {
    const ariaDetailedById = { 'aria-details': this.ariaDetailedId };

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          <slot name="search__front-icon" />
          <input
            type="search"
            tabindex="0"
            inputMode="search"
            class="search__input"
            placeholder={this.placeholder}
            value=""
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
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            disabled={this.disabled}
            autocomplete={this.inputAutocomplete}
            {...ariaDetailedById}
          ></input>
          <slot name="search__back-icon" />
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'search',
      this.hasFocus && 'search--has-focus',
      this.disabled && `search--disabled`,
      this.transparent && 'search--transparent'
    );
  }
}
