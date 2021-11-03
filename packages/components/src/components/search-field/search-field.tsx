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

  /** (optional) Array of data, where will be search in */
  @Prop() dictionary?: Array<string>;

  /** (optional) Callback function to get array of found matches in dictionary */
  @Prop() foundMatches?: Function;

  /** (optional) Input value */
  @State() value?: string;

  /** (optional) Array of search results */
  @State() listMatches?: Array<string>;

  searchHandler = () => {
    this.listMatches = this.value
      ? this.dictionary.filter((element) => element.includes(this.value))
      : [];
    this.foundMatches(this.listMatches);
  };

  handleClear = () => {
    this.value = '';
    this.listMatches = null;
  };

  handleChange = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement | null;
    this.value = target.value;
    this.searchHandler();
  };

  testHandle = (event: Event) => {
    const target = event.target as HTMLLIElement | null;
    this.value = target.textContent;
  }

  render() {
    /** Showcase  */
    this.dictionary = ['cool', 'test', 'angular', 'react', 'web-components', 'network']; 
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          <input
            type="text"
            value={this.value}
            onInput={this.handleChange}
            placeholder="Type anything..."
            id="search"
            disabled={this.disabled}
          />
          {this.listMatches && this.listMatches.length > 0 && (
            <div class="search-suggestions">
              {' '}
              {this.listMatches.map((word) => (
                <scale-search-suggestion-item onClick={this.testHandle}>
                  {word}
                </scale-search-suggestion-item>
              ))}
            </div>
          )}
          <scale-icon-action-search class="search-icon" />
          <scale-icon-action-close
            onClick={this.handleClear}
            class="search-cancel-button"
          />
          <slot />
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('search', this.disabled && 'search--disabled');
  }
}