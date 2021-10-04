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

import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'scale-alertbox-svg',
})
export class AlertboxSvg {
  @Element() hostElement: HTMLElement;
  /** (optional) The width and height in pixels */
  @Prop({ reflect: true }) size?: number = 24;
  /** (optional) If `true`, the icon changes visually */
  @Prop({ reflect: true }) selected?: boolean = false;
  /** (optional) If `true` the SVG element will get `aria-hidden="true"` */
  @Prop() decorative?: boolean = false;
  /** (optional) When using the icon standalone, make it meaningful for accessibility */
  @Prop() accessibilityTitle?: string;

  connectedCallback() {
    if (!this.hostElement.hasAttribute('styles')) {
      this.hostElement.style.display = 'inline-flex';
    }
  }

  render() {
    const ariaHidden = this.decorative ? { 'aria-hidden': 'true' } : {};

    return (
      <Host>
        <svg
          class="scale-icon"
          xmlns="http://www.w3.org/2000/svg"
          width={this.size}
          height={this.size}
          {...ariaHidden}
        >
          {this.accessibilityTitle && <title>{this.accessibilityTitle}</title>}
          {this.selected ? (
            <g fill="#187431" fill-rule="nonzero">
              <path d="M10 .833a9.167 9.167 0 1 0 0 18.334A9.167 9.167 0 0 0 10 .833Zm0 17.084c-4.365 0-7.917-3.552-7.917-7.917S5.635 2.083 10 2.083 17.917 5.635 17.917 10 14.365 17.917 10 17.917Z" />
              <path d="M13.725 6.863 8.889 11.7 6.275 9.086a.625.625 0 1 0-.883.884l3.497 3.497 5.72-5.72a.625.625 0 1 0-.884-.884Z" />
            </g>
          ) : (
            <g fill="#187431" fill-rule="nonzero">
              <path d="M10 .833a9.167 9.167 0 1 0 0 18.334A9.167 9.167 0 0 0 10 .833Zm0 17.084c-4.365 0-7.917-3.552-7.917-7.917S5.635 2.083 10 2.083 17.917 5.635 17.917 10 14.365 17.917 10 17.917Z" />
              <path d="M13.725 6.863 8.889 11.7 6.275 9.086a.625.625 0 1 0-.883.884l3.497 3.497 5.72-5.72a.625.625 0 1 0-.884-.884Z" />
            </g>
          )}
        </svg>
      </Host>
    );
  }
}
