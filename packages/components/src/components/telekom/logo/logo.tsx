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
import statusNote from '../../../utils/status-note';

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
  /** @deprecated; (optional) Language of the logo text/ claimOff showes just the T Logo */
  @Prop() language?:
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
    | string;
  /** (optional) The height in pixels */
  @Prop() size?: number = 38;
  /** (optional) Set a link */
  @Prop() href?: string = 'javascript:void(0);';
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  @Prop() accessibilityTitle?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @Prop() focusable: boolean = true;
  @Prop() scrollIntoViewOnFocus: boolean = false;
  /** (optional) set logo specific title */
  @Prop() logoTitle?: string = 'Telekom Logo';
  /** (optional) Hide all logo related titles */
  @Prop() logoHideTitle?: boolean;
  /** FIXME is this actually working? probably not because of shadow DOM? */
  @Prop() logoAriaDescribedBy?: string;
  /** FIXME this is also probably not working properly, see below (it needs a string value) */
  @Prop() logoAriaHidden?: boolean = false;

  componentDidRender() {
    if (this.accessibilityTitle) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "accessibilityTitle" is deprecated. Please use the "logoTitle" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.language) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "language" is deprecated. Localized brand claim is not shown anymore.',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  render() {
    return (
      <Host exportparts="logo-svg">
        <style>
          {this.size ? `:host { --logo-size: ${this.size}px; }` : ''}
          {this.styles}
        </style>
        <a
          href={this.href}
          part={this.getCssClassMap()}
          tabindex={this.focusable === false ? '-1' : '0'}
          onFocus={() => {
            if (this.scrollIntoViewOnFocus === true) {
              window.scrollTo({ top: 0 });
            }
          }}
          title={this.logoHideTitle ? undefined : this.logoTitle}
          aria-describedby={this.logoAriaDescribedBy}
          aria-hidden={this.logoAriaHidden}
        >
          <scale-logo-svg
            part="icon"
            color={this.variant}
            logoTitle={this.logoTitle}
            logoHideTitle={this.logoHideTitle}
          ></scale-logo-svg>
        </a>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      `logo`,
      this.variant && `variant-${this.variant}`,
      this.transparent && `transparent`
    );
  }
}
