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
  Prop,
  Method,
  h,
  State,
  Element,
  Host,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-notification-toast',
  styleUrl: './notification-toast.css',
  shadow: true,
})
export class NotificationToast {
  /** (optional) Toast variant */
  @Prop() variant?: 'error' | 'warning' | 'success' | 'informational' =
    'informational';
  /** (optional) Toast opened */
  @Prop({ reflect: true }) opened?: boolean;
  /** (optional) Animated toast */
  @Prop() animated?: boolean = true;
  /** (optional) Alignment choose for top and bottom*/
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
  /** (do not use) it is a helper prop for storybook*/
  @Prop() story?: boolean;
  /** (optional) Toast state height with offset */
  @State() toastHeightWithOffset: number = 0;

  @Element() element: HTMLElement;

  hideToast: boolean = false;
  alignmentVertical: string;
  alignmentHorizontal: string;

  connectedCallback() {
    statusNote({ source: this.element, type: 'warn' });
  }

  componentWillLoad() {
    const alignmentParts = this.alignment.split('-');
    this.alignmentVertical = alignmentParts[0];
    this.alignmentHorizontal = alignmentParts[1];
  }

  close = () => {
    this.hideToast = true;
    setTimeout(() => {
      this.opened = false;
    }, this.fadeDuration);
  };

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-notification-message-svg
              class="notification-toast__icon"
              size={20}
              color="#ffffff"
              selected
              accessibility-title="success"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              accessibility-title="information"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              accessibility-title="error"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-error
              class="notification-toast__icon"
              color="#ffff"
              size={20}
              selected
              accessibility-title="information"
            />
          );
      }
    }
    return;
  }

  /** Toast method: open() */
  @Method()
  async open() {
    this.opened = true;
    this.hideToast = false;
  }

  render() {
    if (this.opened) {
      return (
        <Host>
          {this.styles && <style>{this.styles}</style>}
          <style>{this.transitions(this.toastHeightWithOffset)}</style>
          <style>{this.animationStyle(this.toastHeightWithOffset)}</style>

          <div class={this.getCssClassMap()} part={this.getBasePartMap()}>
            <div class="notification-toast__icon-container">
              {this.handleIcons()}
            </div>
            <div class="notification-toast__text-container">
              <slot name="header" />
              <slot name="body" />
              <scale-link>
                <slot name="link" />
              </scale-link>
            </div>

            <scale-icon-action-circle-close
              tabindex="0"
              class="notification-message__icon-close"
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
    const toastHeight = this.element.shadowRoot.querySelector('.toast')
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
    const component = 'notification-toast';
    const prefix = mode === 'basePart' ? '' : `${component}`;

    return classNames(
      mode === 'basePart' ? 'base' : component,
      this.variant && `${prefix}--variant-${this.variant}`,
      !!this.opened && `${prefix}--opened`,
      !!!this.hideToast && `${prefix}--show`,
      !!this.hideToast && `${prefix}--hide`,
      this.story && `${prefix}--story`
    );
  }
}
