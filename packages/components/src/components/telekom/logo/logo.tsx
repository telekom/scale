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
    | '' = 'en';
  /** (optional) The height in pixels */
  @Prop() size: number = 36;
  /** (optional) Set a link */
  @Prop() href: string = '';
  /** (optional) Possibility for adding a onClick Event */
  @Prop() clickHandler: any;
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  @Prop() accessibilityTitle?: string;

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  styles() {
    return `:host {
        --logo-size: ${this.size}px;
      }`;
  }

  getLogoSvg(role: 'link' | 'img') {
    if (this.accessibilityTitle) {
      return (
        <scale-logo-svg
          language={this.language}
          color={this.variant}
          size={this.size}
          accessibilityTitle={this.accessibilityTitle}
          aria-label={this.accessibilityTitle}
          role={role}
        ></scale-logo-svg>
      );
    } else {
      return (
        <scale-logo-svg
          language={this.language}
          color={this.variant}
          size={this.size}
          role={role}
        ></scale-logo-svg>
      );
    }
  }

  render() {
    return (
      <Host>
        <style>{this.styles()}</style>
        {this.href === '' ? (
          <div
            class={this.getCssClassMap()}
            tabindex="1"
            onClick={this.clickHandler}
          >
            {this.getLogoSvg('img')}
          </div>
        ) : (
          <a
            href={this.href}
            class={this.getCssClassMap()}
            onClick={this.clickHandler}
            tabIndex={0}
          >
            {this.getLogoSvg('link')}
          </a>
        )}
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
