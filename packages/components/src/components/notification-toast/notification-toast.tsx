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
  /** (optional) Alignment choose for top and bottom */
  @Prop() alignment?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left' = 'top-right';
  /** (optional) Toast position at the top */
  @Prop() positionVertical?: number = 12;
  /** (optional) Toast position right */
  @Prop() positionHorizontal?: number = 12;
  /** (optional) Toast auto hide */
  @Prop() autoHide?: boolean = false;
  /** (optional) Toast auto hide duration */
  @Prop() autoHideDuration?: number = 3000;
  /** (optional) Toast fade duration */
  @Prop() fadeDuration?: number = 500;
  /** (optional) Injected CSS styles */
  @Prop({ reflect: true }) styles?: string;
  /** (do not use) it is a helper prop for storybook */
  @Prop() story?: boolean;
  /** (optional) Toast state height with offset */
  @State() toastHeightWithOffset: number = 0;
  @Prop() href: string;

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

  componentDidRender() {
    if (this.autoHide === true) {
      setTimeout(this.close, this.autoHideDuration);
    }
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
            <scale-icon-alert-success
              class="notification-toast__icon"
              size={20}
              color="#ffffff"
              selected
              aria-hidden="true"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              aria-hidden="true"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="notification-toast__icon"
              size={20}
              selected
              color="#ffffff"
              aria-hidden="true"
            />
          );
        case 'warning':
          return (
            <scale-icon-alert-warning
              class="notification-toast__icon"
              color="#ffff"
              size={20}
              selected
              aria-hidden="true"
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

          <div
            role="alert"
            style={{ display: `${this.opened ? '' : 'none'}` }}
            class={this.getCssClassMap()}
            part={this.getBasePartMap()}
            tabindex="0"
          >
            <div class="notification-toast__icon-container">
              {this.handleIcons()}
            </div>
            <div class="notification-toast__text-container">
              <slot name="header" />
              <slot name="body" />
              <scale-link
                href={this.href}
                class="notification-toast__link"
                role="link"
              >
                <slot name="link" />
              </scale-link>
            </div>

            <button
              part="button-dismissable"
              type="button"
              class="notification-toast__button-close"
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
    const toastHeight =
      this.element.shadowRoot.querySelector('.toast').scrollHeight;
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
