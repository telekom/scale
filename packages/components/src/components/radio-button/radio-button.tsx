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
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';

interface InputChangeEventDetail {
  value: string | number | boolean | undefined | null;
}

@Component({
  tag: 'scale-radio-button',
  styleUrl: './radio-button.css',
  shadow: false,
})
export class RadioButton {
  @Element() hostElement: HTMLElement;
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
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

  @Event({ eventName: 'scale-change' })
  scaleChange!: EventEmitter<InputChangeEventDetail>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy!: EventEmitter<InputChangeEventDetail>;

  private readonly internalId = generateUniqueId();

  componentWillLoad() {
    if (this.inputId == null) {
      this.inputId = 'input-' + this.internalId;
    }
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
  }

  handleCheckedChange = (event: any) => {
    if (!this.disabled) {
      this.checked = event.target.checked;
      // I don't think this is ever going to be `false` but well...
      if (this.checked) {
        this.uncheckSiblings();
      }
      emitEvent(this, 'scaleChange', {
        value: this.value == null ? this.value : this.value.toString(),
      });
    }
  };

  // Prevent click event being fired twice when the target is the label.
  handleClick = (event: any) => {
    event.stopPropagation();
    if (!this.disabled) {
      this.checked = true;
      this.uncheckSiblings();
    }
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

  renderHelperIcon() {
    if (this.helperText && !this.invalid) {
      return (
        <scale-icon-alert-information size={11}></scale-icon-alert-information>
      );
    }
    if (this.invalid) {
      return <scale-icon-alert-error size={11}></scale-icon-alert-error>;
    }
  }

  render() {
    const ariaInvalidAttr =
      this.status === 'error' || this.invalid ? { 'aria-invalid': true } : {};
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

    return (
      <Host>
        <label class={this.getCssClassMap()} onClick={this.handleClick}>
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
            {this.label}
        </label>
          {!!this.helperText && (
            <div
              class="radio-button__meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              {this.renderHelperIcon()}
              <div class="radio-button__helper-text">{this.helperText}</div>
            </div>
          )}
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'radio-button',
      this.checked && `radio-button--checked`,
      this.disabled && `radio-button--disabled`,
      this.status && `radio-button--status-${this.status}`,
      this.invalid && `radio-button--status-error`
    );
  }
}
