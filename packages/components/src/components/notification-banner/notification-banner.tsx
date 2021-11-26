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
  State,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-notification-banner',
  styleUrl: 'notification-banner.css',
  shadow: true,
})
export class NotificationBanner {
  @Element() hostElement: HTMLElement;

  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  @Prop() dismissible?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() autoHide?: boolean = false;
  @Prop() autoHideDuration?: number = 3000;
  @Prop() href: string;

  @State() hasText?: boolean;
  @State() hasLink?: boolean;

  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
    if (this.hostElement.querySelectorAll('[slot=text]').length !== 0) {
      this.hasText = true;
    }
    if (this.hostElement.querySelectorAll('[slot=link]').length !== 0) {
      this.hasLink = true;
    }
  }

  componentDidLoad() {}

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
            <scale-notification-banner-svg
              class="notification-banner__icon-success"
              accessibility-title="success"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-banner__icon-information"
              accessibility-title="information"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-banner__icon-error"
              accessibility-title="error"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-error
              class="notification-banner__icon-information"
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
          <div part="container" class="notification-banner__container">
            {this.handleIcons()}
            <div part="heading" class="notification-banner__heading">
              <slot>&emsp;</slot>

              {this.dismissible && (
                <scale-icon-action-circle-close
                  tabindex="0"
                  class="notification-banner__icon-close"
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
              {this.hasText ? (
                <div part="text" class="notification-banner__text">
                  <slot name="text" />
                </div>
              ) : null}
              {this.hasLink ? (
                <scale-link href={this.href} class="notification-banner__link">
                  <slot name="link" />
                </scale-link>
              ) : null}
            </div>
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
    const name = 'notification-banner';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.variant && `${prefix}variant-${this.variant}`,
      this.hasText && `${prefix}has-text`,
      !this.hasText && `${prefix}has-no-text`
    );
  }
}
