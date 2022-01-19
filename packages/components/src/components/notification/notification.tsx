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

  /* 
  inline, toast, banner
  */
  @Prop() type?: 'inline' | 'toast' | 'banner' = 'inline';
  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  @Prop() dismissible?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() autoHide?: boolean = false;
  @Prop() autoHideDuration?: number = 3000;
  @Prop() href: string;
  /** (optional) Injected CSS styles */
  @Prop({ reflect: true }) styles?: string;
  /*
  toast
  */
  /** (optional) Animated toast */
  @Prop() toastAnimated?: boolean = true;
  /** (optional) Alignment of toast */
  @Prop() toastAlignment?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left' = 'top-right';
  /** (optional) Toast position at the top */
  @Prop() toastPositionVertical?: number = 12;
  /** (optional) Toast position right */
  @Prop() toastPositionHorizontal?: number = 12;
  /** (optional) Toast fade duration */
  @Prop() toastFadeDuration?: number = 500;
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
    const alignmentParts = this.toastAlignment.split('-');
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
      }, this.toastFadeDuration);
    }
  };

  render() {
    if (!this.opened) {
      return null;
    }

    return this.type == 'banner' || this.type == 'inline' ? (
      <Host>
        {this.styles && <style>{this.styles}</style>}
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
                  part="link"
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
          <div class={`notification-${this.type.toString()}__icon-container`}>
            {this.handleIcons()}
          </div>
          <div class={`notification-${this.type.toString()}__text-container`}>
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
                part="link"
                href={this.href}
                class={`notification-${this.type.toString()}__link`}
              >
                <slot name="link" />
              </scale-link>
            )}
          </div>
          {this.dismissible && (
            <scale-icon-action-circle-close
              tabindex="0"
              class={`notification-${this.type.toString()}__button-close`}
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
          )}
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
      ${this.alignmentVertical}: ${this.toastPositionVertical}px;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      ${this.alignmentVertical}: ${this.toastPositionVertical}px;
    }
    to {
      opacity: 0;
      ${this.alignmentVertical}: -${offset}px;
    }
  }
`;

  animationStyle = (offset) => {
    if (this.toastAnimated) {
      return `
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.toastPositionHorizontal}px;
      animation: fadeIn ${this.toastFadeDuration / 1000}s ease-in-out;
      ${this.alignmentVertical}: ${this.toastPositionVertical}px;
      opacity: 1;
    },
    .notification-toast--show {
      ${this.alignmentHorizontal}: ${this.toastPositionHorizontal}px;
      animation: fadeOut ${this.toastFadeDuration / 1000}s ease-in-out;
      ${this.alignmentVertical}: -${offset}px;
      opacity: 0;
    }
  `;
    }
    return `
.notification-toast--show {
  ${this.alignmentHorizontal}: ${this.toastPositionHorizontal}px;
  ${this.alignmentVertical}: ${this.toastPositionVertical}px;
  opacity: 1;
},
.notification-toast--show {
  ${this.alignmentHorizontal}: ${this.toastPositionHorizontal}px;
  ${this.alignmentVertical}: -${offset}px;
  opacity: 0;
}
`;
  };

  getToastHeightWithOffset() {
    const toastHeight = this.hostElement.shadowRoot.querySelector('.toast')
      .scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.toastPositionVertical;
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
