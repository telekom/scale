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

import { Component, h, Host, Prop, Element, Method } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-notification-message',
  styleUrl: 'notification-message.css',
  shadow: true,
})
export class NotificationMessage {
  @Element() hostElement: HTMLElement;

  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  @Prop() dismissible?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() autoHide?: boolean = false;
  @Prop() autoHideDuration?: number = 3000;

  hasSlotText: boolean;

  componentDidLoad() {
    this.hasSlotText = !!this.hostElement.querySelector("p[slot='text']");
  }

  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
  }

  @Method()
  async open() {
    this.opened = true;
  }

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-icon-alert-success
              class="notification-message__icon-success"
              accessibility-title="success"
              color="#187431"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-message__icon-information"
              accessibility-title="information"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-message__icon-error"
              accessibility-title="error"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-error
              class="notification-message__icon-information"
              color="#AE461C"
              accessibility-title="information"
            />
          );
      }
    }
    return;
  }

  close = () => {
    this.opened = false;
  };

  render() {
    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <div
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          tabindex="0"
        >
          <div part="container" class="notification-message__container">
            {this.handleIcons()}
            <div part="heading" class="notification-message__heading">
              <slot>&emsp;</slot>

              {this.dismissible && (
                <scale-icon-action-circle-close
                  tabindex="0"
                  class="notification-message__icon-close"
                  onClick={() => {
                    this.close();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      this.close();
                    }
                  }}
                  accessibility-title="close"
                />
              )}
            </div>
            {this.hasSlotText && (
              <div part="text" class="notification-message__text">
                <slot name="text" />
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const name = 'notification-message';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(name, this.variant && `${prefix}variant-${this.variant}`);
  }
}
