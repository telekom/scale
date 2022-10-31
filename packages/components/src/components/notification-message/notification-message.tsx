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

import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Method,
  Event,
  EventEmitter,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { emitEvent } from '../../utils/utils';

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
  /** Fires when the notification message has been dismissed */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<void>;

  hasSlotText: boolean;

  componentWillLoad() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
  }

  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }

  componentDidUpdate() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
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
              color="#187431"
              aria-hidden="true"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-message__icon-information"
              aria-hidden="true"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-message__icon-error"
              aria-hidden="true"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-warning
              class="notification-message__icon-information"
              color="#AE461C"
              aria-hidden="true"
            />
          );
      }
    }
    return;
  }

  close = () => {
    this.opened = false;
    emitEvent(this, 'scaleClose');
  };

  render() {
    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <div
          role="alert"
          style={{ display: `${this.opened ? '' : 'none'}` }}
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          tabindex="0"
        >
          <div part="container" class="notification-message__container">
            {this.handleIcons()}
            <div part="heading" class="notification-message__heading">
              <slot>&emsp;</slot>

              {this.dismissible && (
                <button
                  part="button-dismissable"
                  type="button"
                  class="notification-message__icon-close"
                  onClick={() => this.close()}
                  tabindex={0}
                  aria-label="close"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      this.close();
                    }
                  }}
                >
                  <scale-icon-action-circle-close />
                </button>
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
