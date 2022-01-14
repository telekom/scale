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
  tag: 'scale-notification',
  styleUrl: 'notification.css',
  shadow: true,
})
export class Notification {
  @Element() hostElement: HTMLElement;

  @Prop() type?: 'inline' | 'toast' | 'banner' = 'inline';

  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  @Prop() dismissible?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() autoHide?: boolean = false;
  @Prop() autoHideDuration?: number = 3000;
  @Prop() href: string;

  hasSlotText: boolean;
  hasSlotLink: boolean;

  componentWillLoad() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
    this.hasSlotLink = !!this.hostElement.querySelector('[slot=link]');
  }

  componentDidUpdate() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
    this.hasSlotLink = !!this.hostElement.querySelector('[slot=link]');
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
  }

  @Method()
  async open() {
    this.opened = true;
  }

  getIconClass(variant: string) {
    const className = `notification-${this.type.toString()}__icon-${variant}`;
    console.log(className);
    return className;
  }

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-icon-alert-success
              class={this.getIconClass('success')}
              color="#187431"
              accessibility-title="success"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class={this.getIconClass('information')}
              accessibility-title="information"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class={this.getIconClass('error')}
              accessibility-title="error"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-error
              class={this.getIconClass('information')}
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
          <div
            part="container"
            class={`notification-${this.type.toString()}__container`}
          >
            {this.handleIcons()}
            <div
              part="heading"
              class={`notification-${this.type.toString()}__heading`}
            >
              <slot></slot>
              {this.dismissible && (
                <button
                  part="button-dismissable"
                  class={`notification-${this.type.toString()}__button-close`}
                  onClick={() => this.close()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      this.close();
                    }
                  }}
                >
                  <scale-icon-action-circle-close accessibility-title="close" />
                </button>
              )}
              {this.hasSlotText ? (
                <div
                  part="text"
                  class={`notification-${this.type.toString()}__text`}
                >
                  <slot name="text" />
                </div>
              ) : null}

              {this.hasSlotLink && this.type === 'banner' && (
                <scale-link
                  href={this.href}
                  class={`notification-${this.type.toString()}__link`}
                >
                  <slot name="link" />
                </scale-link>
              )}
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
    const name = `notification-${this.type.toString()}`;
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.variant && `${prefix}variant-${this.variant}`,
      this.hasSlotText && `${prefix}has-text`,
      !this.hasSlotText && `${prefix}has-no-text`
    );
  }
}
