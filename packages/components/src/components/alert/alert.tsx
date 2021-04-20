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

import { Component, Prop, h, Method, Element, Host } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
@Component({
  tag: 'scale-alert',
  styleUrl: './alert.css',
  shadow: true,
})
export class Alert {
  @Element() hostElement: HTMLStencilElement;
  /** (optional) Alert size */
  @Prop() size?: string = '';
  /** (optional) Alert variant */
  @Prop() variant?: string = '';
  /** (optional) Alert title */
  @Prop({ reflect: true }) headline: string;
  /** (optional) Alert opened */
  @Prop({ reflect: true }) opened: boolean;
  /** (optional) Alert timeout */
  @Prop() timeout?: boolean | number = false;
  /** (optional) Alert icon */
  @Prop() icon?: string = '';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  defaultTimeout = 2000;
  hasSlotClose: boolean;

  componentWillLoad() {
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
  }

  close = () => {
    this.opened = false;
  };

  /** Alert method: open() */
  @Method()
  async open() {
    this.opened = true;
  }

  onCloseAlertWithTimeout = () => {
    if (this.timeout !== false) {
      if (typeof this.timeout === 'number') {
        setTimeout(this.close, this.timeout);
      } else {
        setTimeout(this.close, this.defaultTimeout);
      }
    } else {
      return null;
    }
  };

  render() {
    this.onCloseAlertWithTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div class={this.getCssClassMap()}>
          <div class="alert__body">
            <div class="alert__icon">{this.icon}</div>
            <div class="alert__content">
              <div class="alert__headline">{this.headline}</div>
              <slot />
            </div>
          </div>

          <a class="alert__close" onClick={this.close}>
            {this.hasSlotClose ? (
              <div class="alert__close-icon">
                <slot name="close" />
              </div>
            ) : (
              'x'
            )}
          </a>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'alert',
      this.size && `alert--size-${this.size}`,
      this.variant && `alert--variant-${this.variant}`
    );
  }
}
