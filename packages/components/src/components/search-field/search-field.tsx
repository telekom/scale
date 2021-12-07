/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Component, Prop, h, Host, Element, State } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-search-field',
  styleUrl: 'search-field.css',
  shadow: true,
})
export class SearchField {
  @Element() hostElement: HTMLElement;

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optiomal) Disable search-field */
  @Prop() disabled?: boolean;

  /** (optional) Placeholder text */
  @Prop() placeholder?: string;

  /** (optional) Enable frameless mode */
  @Prop() frameless?: boolean;

  /** (optional) Input value */
  @State() value?: string;

  handleClear = () => {
    this.value = '';
  };

  handleChange = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement | null;
    this.value = target.value;
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()} part="base">
          <scale-icon-action-search class="search-icon" part="lookup icon" />
          <input
            type="text"
            value={this.value}
            onInput={this.handleChange}
            placeholder={this.placeholder}
            id="search"
            disabled={this.disabled}
            part="inner input"
          />
          <button
            disabled={!Boolean(this.value)}
            class="search-cancel-button"
            onClick={this.handleClear}
            part="clear button"
          >
            <scale-icon-action-close part="clear icon" />
          </button>
          <slot />
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'search',
      this.disabled && 'search--disabled',
      this.frameless && 'search--frameless'
    );
  }
}
