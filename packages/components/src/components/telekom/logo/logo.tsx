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

import { Component, h, Prop, Host, Element } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-logo',
  styleUrl: './logo.css',
  shadow: true,
})
export class Logo {
  @Element() hostElement: HTMLElement;
  /** (optional) Variant/color of the logo text and logo */
  @Prop() variant: 'magenta' | 'white' = 'magenta';
  /** (optional) Set transparent background */
  @Prop() transparent: boolean = false;
  /** (optional) Language of the logo text/ claimOff showes just the T Logo */
  @Prop() language:
    | 'de'
    | 'en'
    | 'cz'
    | 'hr'
    | 'hu'
    | 'me'
    | 'mk_lat'
    | 'mk_kyr'
    | 'ro'
    | 'sk'
    | string = 'en';
  /** (optional) The height in pixels */
  @Prop() size?: number = 36;
  /** (optional) Set a link */
  @Prop() href?: string = 'javascript:void(0);';
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  @Prop() accessibilityTitle?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @Prop() focusable: boolean = true;
  @Prop() scrollIntoViewOnFocus: boolean = false;
  @Prop() logoTitle?: string = 'Telekom Logo';
  @Prop() logoAriaDescribedBy?: string;

  render() {
    return (
      <Host>
        <style>
          {this.size ? `:host { --logo-size: ${this.size}px; }` : ''}
          {this.styles}
        </style>
        <a
          href={this.href}
          class={this.getCssClassMap()}
          tabIndex={this.focusable === false ? -1 : 0}
          onFocus={() => {
            if (this.scrollIntoViewOnFocus === true) {
              window.scrollTo({ top: 0 });
            }
          }}
          title={this.logoTitle}
          aria-describedby={this.logoAriaDescribedBy}
        >
          <scale-logo-svg
            language={this.language}
            color={this.variant}
            accessibilityTitle={this.accessibilityTitle}
            role="link"
          ></scale-logo-svg>
        </a>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      `logo`,
      this.variant && `logo--variant-${this.variant}`,
      this.transparent && `logo--transparent`
    );
  }
}
