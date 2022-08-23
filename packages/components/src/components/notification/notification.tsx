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

import { Component, Prop, h, Element, State, Host } from '@stencil/core';

const ICON_SIZE = 20;

const iconVariantNameMap = {
  informational: 'scale-icon-alert-information',
  warning: 'scale-icon-alert-warning',
  success: 'scale-icon-alert-success',
  danger: 'scale-icon-alert-error',
};

@Component({
  tag: 'scale-notification',
  styleUrl: './notification.css',
  shadow: true,
})
export class Notification {
  @Element() hostElement: HTMLElement;

  /** Heading */
  @Prop() heading: string;
  /** (optional) Type */
  @Prop() type?: 'inline' | 'banner' | 'toast' = 'inline';
  /** (optional) Variant */
  @Prop() variant?: 'danger' | 'warning' | 'success' | 'informational' =
    'informational';
  /** (optional) Visible */
  @Prop({ reflect: true, mutable: true }) opened?: boolean;
  /** (optional) Dismissible via close button */
  @Prop() dismissible?: boolean = false;
  /** (optional) Injected styles */
  @Prop() styles?: string;

  @State() role: string = 'alert';
  @State() hasTextSlot: boolean = false;
  @State() hasActionSlot: boolean = false; // unused for now

  connectedCallback() {
    // Do not use `role="alert"` if opened/visible on page load
    if (this.hostElement.hasAttribute('opened')) {
      this.role = undefined;
    }
    this.hasTextSlot = this.hostElement.querySelector('[slot="text"]') != null;
    this.hasActionSlot =
      this.hostElement.querySelector('[slot="action"]') != null;
  }

  render() {
    const IconTag = iconVariantNameMap[this.variant];

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          part="base"
          role={this.role}
          class={{
            [`variant-${this.variant}`]: true,
            [`type-${this.type}`]: true,
          }}
        >
          {this.dismissible && (
            <scale-button part="close-button" variant="ghost">
              <slot name="close-icon">
                <scale-icon-action-circle-close size={ICON_SIZE} decorative />
              </slot>
            </scale-button>
          )}
          <div part="icon" aria-hidden="true">
            <slot name="icon">
              <IconTag size={ICON_SIZE} selected={this.type === 'toast'} />
            </slot>
          </div>
          <div part="body">
            <div part="heading">{this.heading}</div>
            {this.hasTextSlot && (
              <div part="text">
                <slot name="text"></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
