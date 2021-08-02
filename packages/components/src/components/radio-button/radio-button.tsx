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

import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

let i = 0;

@Component({
  tag: 'scale-radio-button',
  styleUrl: './radio-button.css',
  shadow: false,
})
export class RadioButton {
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input checked */
  @Prop({ reflect: true }) checked?: boolean = false;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string | number | null = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @Event() scaleChange!: EventEmitter<InputChangeEventDetail>;

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-' + i++;
    }
  }

  handleCheckedChange = (event: any) => {
    this.checked = event.target.checked;
    // I don't think this is ever going to be `false` but well...
    if (this.checked) {
      this.uncheckSiblings();
    }
    this.scaleChange.emit({
      value: this.value == null ? this.value : this.value.toString(),
    });
  };

  // Prevent click event being fired twice when the target is the label.
  handleLabelClick = (event: any) => {
    event.stopPropagation();
  };

  // We manually set `checked` to false on sibling <scale-radio-button> elements,
  // otherwise they stayed `checked` after being clicked once, forever.
  uncheckSiblings() {
    this.getSiblingRadios().forEach((radio: HTMLScaleRadioButtonElement) => {
      radio.checked = false;
    });
  }

  getSiblingRadios(): HTMLElement[] {
    return Array.from(
      document.querySelectorAll(`scale-radio-button[name="${this.name}"]`)
    ).filter(
      (radio: HTMLScaleRadioButtonElement) => radio.inputId !== this.inputId
    ) as HTMLScaleRadioButtonElement[];
  }

  render() {
    const ariaInvalidAttr =
      this.status === 'error' ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${i}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <input
            type="radio"
            name={this.name}
            id={this.inputId}
            onChange={this.handleCheckedChange}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            {...ariaInvalidAttr}
            {...(this.helperText ? ariaDescribedByAttr : {})}
          />
          <label htmlFor={this.inputId} onClick={this.handleLabelClick}>
            {this.label}
          </label>
          {!!this.helperText && (
            <div
              class="radio-button__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              <div class="radio-button__helper-text">{this.helperText}</div>
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'radio-button',
      this.checked && `radio-button--checked`,
      this.disabled && `radio-button--disabled`,
      this.status && `radio-button--status-${this.status}`
    );
  }
}
