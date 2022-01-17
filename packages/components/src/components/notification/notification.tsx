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
  tag: 'scale-notification',
  styleUrl: 'notification.css',
  shadow: true,
})
export class Notification {
  @Element() hostElement: HTMLElement;

  @Prop() type?: 'inline' | 'toast' | 'banner' = 'inline';
  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  /** (optional) Animated toast */
  @Prop() animated?: boolean = true;
  @Prop() alignment?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left' = 'top-right';
  /** (optional) Toast position at the top */
  @Prop() positionVertical?: number = 12;
  /** (optional) Toast position right */
  @Prop() positionHorizontal?: number = 12;
  /** (optional) Toast fade duration */
  @Prop() fadeDuration?: number = 500;
  /** (optional) Injected CSS styles */
  @Prop({ reflect: true }) styles?: string;

  @Prop() dismissible?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() autoHide?: boolean = false;
  @Prop() autoHideDuration?: number = 3000;
  @Prop() href: string;

  /** (do not use) it is a helper prop for storybook */
  @Prop() toastStory?: boolean;
  /** (optional) Toast state height with offset */
  @State() toastHeightWithOffset: number = 0;

  hasSlotText: boolean;
  hasSlotLink: boolean;

  hideToast: boolean = false;
  alignmentVertical: string;
  alignmentHorizontal: string;

  componentWillLoad() {
    this.hasSlotText = !!this.hostElement.querySelector('[slot=text]');
    this.hasSlotLink = !!this.hostElement.querySelector('[slot=link]');

    /* toast */
    const alignmentParts = this.alignment.split('-');
    this.alignmentVertical = alignmentParts[0];
    this.alignmentHorizontal = alignmentParts[1];
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
    if (this.type === 'toast') {
      this.hideToast = false;
    }
  }

  getIconClass() {
    //.notification-banner__icon-success
    const className = `notification-${this.type.toString()}__icon`;
    return className;
  }

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-icon-alert-success
              class={this.getIconClass()}
              accessibility-title="success"
              selected={this.type == 'toast'}
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class={this.getIconClass()}
              accessibility-title="informational"
              selected={this.type == 'toast'}
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class={this.getIconClass()}
              accessibility-title="error"
              selected={this.type == 'toast'}
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-error
              class={this.getIconClass()}
              accessibility-title="information"
              selected={this.type == 'toast'}
            />
          );
      }
    }
    return;
  }

  close = () => {
    this.opened = false;
    if (this.type === 'toast') {
      this.hideToast = true;
      setTimeout(() => {
        this.opened = false;
      }, this.fadeDuration);
    }
  };

  render() {
    if (!this.opened) {
      return null;
    }

    return this.type == 'banner' || this.type == 'inline' ? (
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
              {this.hasSlotText && (
                <div
                  part="text"
                  class={`notification-${this.type.toString()}__text`}
                >
                  <slot name="text" />
                </div>
              )}

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
    ) : (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <style>{this.transitions(this.toastHeightWithOffset)}</style>
        <style>{this.animationStyle(this.toastHeightWithOffset)}</style>
        <div class={this.getCssClassMap()} part={this.getBasePartMap()}>
          <div class="notification-toast__icon-container">
            {this.handleIcons()}
          </div>
          <div class="notification-toast__text-container">
            <div
              part="heading"
              class={`notification-${this.type.toString()}__heading`}
            >
              <slot></slot>
            </div>
            {this.hasSlotText && (
              <div
                part="text"
                class={`notification-${this.type.toString()}__text`}
              >
                <slot name="text" />
              </div>
            )}
            {this.hasSlotLink && (
              <scale-link
                href={this.href}
                part="text"
                class={`notification-${this.type.toString()}__link`}
              >
                <slot name="link" />
              </scale-link>
            )}
          </div>

          <scale-icon-action-circle-close
            tabindex="0"
            class="notification-toast__button-close"
            size={20}
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
        </div>
      </Host>
    );
  }

  transitions = (offset) => `
  @keyframes fadeIn {
    from {
      opacity: 0;
      ${this.alignmentVertical}: -${offset}px;
    }
    to {
      opacity: 1;
      ${this.alignmentVertical}: ${this.positionVertical}px;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      ${this.alignmentVertical}: ${this.positionVertical}px;
    }
    to {
      opacity: 0;
      ${this.alignmentVertical}: -${offset}px;
    }
  }
`;

  animationStyle = (offset) => {
    if (this.animated) {
      return `
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
      animation: fadeIn ${this.fadeDuration / 1000}s ease-in-out;
      ${this.alignmentVertical}: ${this.positionVertical}px;
      opacity: 1;
    },
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
      animation: fadeOut ${this.fadeDuration / 1000}s ease-in-out;
      ${this.alignmentVertical}: -${offset}px;
      opacity: 0;
    }
  `;
    }
    return `
.notification-toast--show {
  ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
  ${this.alignmentVertical}: ${this.positionVertical}px;
  opacity: 1;
},
.notification-toast--show {
  ${this.alignmentHorizontal}: ${this.positionHorizontal}px;
  ${this.alignmentVertical}: -${offset}px;
  opacity: 0;
}
`;
  };

  getToastHeightWithOffset() {
    const toastHeight = this.hostElement.shadowRoot.querySelector('.toast')
      .scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionVertical;
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
      !this.hasSlotText && `${prefix}has-no-text`,
      this.hasSlotLink && `${prefix}has-link`,
      !this.hasSlotLink && `${prefix}has-no-link`,
      this.variant && `${prefix}variant-${this.variant}`,
      !!this.opened && `${prefix}opened`,
      !!!this.hideToast && `${prefix}show`,
      !!this.hideToast && `${prefix}hide`,
      this.toastStory && `${prefix}story`
    );
  }
}
