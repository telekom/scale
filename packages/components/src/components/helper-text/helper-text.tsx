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

import { Component, h, Prop, Host } from '@stencil/core';

const ICON_SIZE = 11;

/**
 * This is a superset of the default anchor `<a>` element.
 * @part anchor - the native achor element wrapping all contents
 * @part content - a wrapper around the default slot with the underline
 *
 * @slot default - here goes the actual text of the
 * @slot icon - a slot that will not be underlined and which position can be changed
 */
@Component({
  tag: 'scale-helper-text',
  styleUrl: './helper-text.css',
  shadow: true,
})
export class HelperText {
  /** (optional) Helper text */
  @Prop() helperText?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) Injected CSS styles */
  @Prop() variant?:
    | 'neutral'
    | 'informational'
    | 'warning'
    | 'danger'
    | 'success' = 'informational';

  renderHelperIcon() {
    const variant = this.variant;
    if (variant === 'informational' || variant === 'warning') {
      return (
        <scale-icon-alert-information
          size={ICON_SIZE}
        ></scale-icon-alert-information>
      );
    }
    if (variant === 'danger') {
      return (
        <scale-icon-alert-error
          size={ICON_SIZE}
        ></scale-icon-alert-error>
      );
    }
    if (variant === 'success') {
      return (
        <scale-icon-alert-success
          size={ICON_SIZE}
        ></scale-icon-alert-success>
      );
    }
  }

  render() {
    return (
      <Host>
        <div
            class={{
              'helper-text': true,
              'helper-text--informational': this.variant === 'informational',
              'helper-text--warning': this.variant === 'warning',
              'helper-text--danger': this.variant === 'danger',
              'helper-text--success': this.variant === 'success',
              'helper-text--neutral': this.variant === 'neutral',
            }}        
        >
          <span><slot></slot></span>
          {this.renderHelperIcon()}
        </div>
        {this.styles && <style>{this.styles}</style>}

      </Host>
    );
  }
}
