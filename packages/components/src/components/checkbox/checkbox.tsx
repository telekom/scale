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
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';

export interface CheckboxInterface extends HTMLElement {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  value: string;
  label: string;
  ariaLabelCheckbox?: string;
}

@Component({
  tag: 'scale-checkbox',
  styleUrl: './checkbox.css',
  shadow: false,
})
export class Checkbox {
  @Element() host: HTMLElement;
  /** (optional) Input name */
  @Prop() name?: string;
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input label output */
  @Prop() ariaLabelCheckbox?: string;
  /** (optional) Hides the specified label visually */
  @Prop() hideLabel?: boolean = false;
  /** (optional) Input helper text */
  @Prop() helperText?: string;
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Input disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;
  /** (optional) Active switch */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false;
  /** (optional) indeterminate */
  @Prop({ mutable: true, reflect: true }) indeterminate?: boolean = false;
  /** (optional) Input value */
  @Prop() value?: string = '';
  /** (optional) Input checkbox id */
  @Prop({ mutable: true }) inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) id or space separated list of ids of elements that provide or link to additional related information. */
  @Prop() ariaDetailsId?: string;

  /** (optional) data-qa attribute for e2e testing */
  @Prop() dataQa?: string;

  /** Emitted when the value has changed. */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter;

  private readonly internalId = generateUniqueId();

  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.host.hasAttribute('aria-label')) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "ariaLabel" is deprecated. Please use the "ariaLabelCheckbox" property!',
        type: 'warn',
        source: this.host,
      });
    }
  }

  handleChange = (ev) => {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
      ev.target.checked = true;
    } else {
      this.checked = ev.target.checked;
    }

    const { checked, indeterminate, value, disabled } = this;

    emitEvent(this, 'scaleChange', { checked, indeterminate, value, disabled });
  };

  connectedCallback() {
    if (!this.inputId) {
      this.inputId = 'input-checkbox-' + this.internalId;
    }
  }

  /* Accessibility: rendering the icon *only* when checked, otherwise is always visible in HCM */
  renderIcon() {
    if (this.indeterminate) {
      return (
        <scale-icon-action-minus
          part="icon"
          decorative
        ></scale-icon-action-minus>
      );
    }

    if (this.checked) {
      return (
        <scale-icon-action-checkmark
          part="icon"
          decorative
        ></scale-icon-action-checkmark>
      );
    }
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

  renderHelperText(text) {
    if (this.helperText && this.helperText !== '') {
      return (
        <div
          part="helper-text"
          id={text.id}
          aria-live="polite"
          aria-relevant="additions removals"
        >
          {this.renderHelperIcon()}
          {text.content}
        </div>
      );
    }
  }

  render() {
    const helperText = {
      id: this.helperText ? `helper-message-${this.internalId}` : null,
      content: this.helperText,
    };

    return (
      <Host
        class={{
          checked: this.checked,
          indeterminate: this.indeterminate,
          disabled: this.disabled,
          error: this.status === 'error' || this.invalid,
          hideLabel: this.hideLabel,
        }}
      >
        <input
          type="checkbox"
          part="input"
          name={this.name || null}
          id={this.inputId}
          value={this.value}
          checked={this.checked}
          indeterminate={this.indeterminate}
          aria-label={this.ariaLabelCheckbox}
          aria-checked={this.indeterminate ? 'mixed' : false}
          aria-invalid={this.status === 'error' || this.invalid ? 'true' : null}
          aria-describedBy={helperText ? helperText.id : this.ariaDetailsId}
          aria-details={this.ariaDetailsId}
          disabled={this.disabled}
          required={this.required}
          onChange={this.handleChange}
          {...(this.dataQa ? { 'data-qa': this.dataQa } : {})}
        />
        <label part="container" htmlFor={this.inputId}>
          <span part="checkbox">{this.renderIcon()}</span>
          {/* TODO: discuss deprecation of the slot (move closer so W3C spec) */}
          <span part="label">{this.label || <slot></slot>}</span>
        </label>
        {this.renderHelperText(helperText)}
      </Host>
    );
  }
}
