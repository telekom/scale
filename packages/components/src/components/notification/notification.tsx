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

import { Component, Prop, h, Element, Host } from '@stencil/core';
// import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-notification',
  styleUrl: './notification.css',
  shadow: true,
})
export class Notification {
  @Element() hostElement: HTMLElement;

  /** Heading */
  @Prop() heading: string;
  /** (optional) Variant */
  @Prop() variant?: 'error' | 'warning' | 'success' | 'informational' =
    'informational';
  /** (optional) Toast opened */
  @Prop({ reflect: true }) opened?: boolean;
  /** (optional) Injected styles */
  @Prop() styles?: string;

  connectedCallback() {
    // statusNote({ source: this.element, type: 'warn' });
  }

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-icon-alert-success
              class="notification-toast__icon"
              size={20}
              color="#ffffff"
              selected
              aria-hidden="true"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              aria-hidden="true"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              aria-hidden="true"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-warning
              class="notification-toast__icon"
              color="#ffff"
              size={20}
              selected
              aria-hidden="true"
            />
          );
      }
    }
    return;
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div role="alert">{this.heading}</div>
      </Host>
    );
  }
}
