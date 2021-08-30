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

let i = 0;
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
  /** (optional) Input helper text */
  @Prop() helperText?: string;
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input disabled */
  @Prop({ reflect: true }) disabled?: boolean = false;
  /** (optional) Active switch */
  @Prop({ mutable: true, reflect: true }) checked?: boolean = false;
  /** (optional) indeterminate */
  @Prop({ mutable: true, reflect: true }) indeterminate?: boolean = false;
  /** (optional) Input value */
  @Prop() value?: string = '';
  /** (optional) Input checkbox id */
  @Prop() inputId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Emitted when the value has changed. */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter;

  private id = i++;

  getAriaCheckedState() {
    if (this.indeterminate) {
      return 'mixed';
    }

    return this.checked;
  }

  handleChange = (ev) => {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
      ev.target.checked = true;
    } else {
      this.checked = ev.target.checked;
    }

    const { checked, indeterminate, value } = this;

    this.scaleChange.emit({ checked, indeterminate, value });
  };

  connectedCallback() {
    if (!this.inputId) {
      this.inputId = 'input-checkbox-' + this.id;
    }
  }

  /* Accessibility: rendering the icon *only* when checked, otherwise is always visible in HCM */
  renderIcon() {
    if (this.indeterminate) {
      return (
        <scale-icon-action-indeterminate
          part="icon"
          decorative
        ></scale-icon-action-indeterminate>
      );
    }

    if (this.checked) {
      return (
        <scale-icon-action-success
          part="icon"
          decorative
        ></scale-icon-action-success>
      );
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
          {text.content}
        </div>
      );
    }
  }

  render() {
    const helperText = {
      id: this.helperText ? `helper-text-${this.id}` : null,
      content: this.helperText,
    };

    return (
      <Host
        class={{
          error: this.status === 'error',
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
          aria-checked={this.getAriaCheckedState()}
          aria-invalid={this.status === 'error'}
          aria-describedBy={helperText.id}
          disabled={this.disabled}
          onChange={this.handleChange}
        />
        <label part="container" htmlFor={this.inputId}>
          <div part="checkbox">{this.renderIcon()}</div>
          <div part="label">{this.label || <slot></slot>}</div>
        </label>
        {this.renderHelperText(helperText)}
      </Host>
    );
  }
}
