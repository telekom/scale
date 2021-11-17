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
import { formatDistance, subSeconds } from 'date-fns';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-notification-toast',
  styleUrl: './notification-toast.css',
  shadow: true,
})
export class NotificationToast {
  /** (optional) Toast size */
  @Prop() size?: string = '';
  /** (optional) Toast variant */
  @Prop() variant?: string = '';
  /** (optional) Toast opened */
  @Prop({ reflect: true }) opened?: boolean;
  /** (optional) Toast autohide time */
  @Prop() autoHide?: boolean | number = false;
  /** (optional) Animated toast */
  @Prop() animated?: boolean = true;
  /** (optional) Toast time */
  @Prop() time?: number;
  /** (optional) Toast position at the top */
  @Prop() positionTop?: number = 12;
  /** (optional) Toast position right */
  @Prop() positionRight?: number = 12;
  /** (optional) Toast fade duration */
  @Prop() fadeDuration?: number = 500;
  /** (optional) Injected CSS styles */
  @Prop({ reflect: true }) styles?: string;

  /** (optional) Toast state progress */
  @State() progress: number = 0;
  /** (optional) Toast state height with offset */
  @State() toastHeightWithOffset: number = 0;

  @Element() element: HTMLElement;

  @State() hasText: boolean;

  hideToast: boolean = false;
  timerId = null;

  connectedCallback() {
    statusNote({ source: this.element, type: 'warn' });
  }

  componentDidRender() {
    if (this.element.querySelectorAll('[slot=text]').length !== 0) {
      this.hasText = true;
    }
  }

  disconnectedCallback() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }
  }

  close = () => {
    clearInterval(this.timerId);
    this.hideToast = true;
    setTimeout(() => {
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }, this.fadeDuration);
  };

  getTime = () => {
    const formattedTime =
      this.time &&
      formatDistance(subSeconds(this.time, 3), new Date(), { addSuffix: true });
    return formattedTime;
  };

  setToastTimeout = () => {
    if (this.opened && this.autoHide !== false && !this.timerId) {
      this.timerId = setInterval(() => {
        this.progress += 1 / (this.getAutoHide() / 1000);
        if (this.progress >= 100) {
          this.close();
        }
      }, 10);
    }
  };

  /** Toast method: open() */
  @Method()
  async open() {
    this.opened = true;
    this.hideToast = false;
  }

  render() {
    this.setToastTimeout();
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <style>{this.transitions(this.toastHeightWithOffset)}</style>
        <style>{this.animationStyle(this.toastHeightWithOffset)}</style>

        <div class={this.getCssClassMap()} part={this.getBasePartMap()}>
          <div class="notification-toast__icon-container">
            <scale-icon-action-circle-close
              tabindex="0"
              class="notification-toast__icon"
              size={20}
            />
          </div>
          <div class="notification-toast__text-container">
            <slot name="header" />
            <slot name="body" />
            <scale-link>
              <slot name="link" />
            </scale-link>
          </div>

          <small>{this.getTime()}</small>
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

  transitions = (offset) => `
      @keyframes fadeIn {
        from {
          opacity: 0;
          top: -${offset}px;
        }
        to {
          opacity: 1;
          top: ${this.positionTop}px;
        }
      }
  
      @keyframes fadeOut {
        from {
          opacity: 1;
          top: ${this.positionTop}px;
        }
        to {
          opacity: 0;
          top: -${offset}px;
        }
      }
    `;

  animationStyle = (offset) => {
    return `
        .notification-toast--show {
          right: ${this.positionRight}px;
          animation: fadeIn ${this.fadeDuration / 1000}s ease-in-out;
          top: ${this.positionTop}px;
          opacity: 1;
        },
        .notification-toast--show {
          right: ${this.positionRight}px;
          animation: fadeOut ${this.fadeDuration / 1000}s ease-in-out;
          top: -${offset}px;
          opacity: 0;
        }
      `;
  };

  getToastHeightWithOffset() {
    const toastHeight = this.element.shadowRoot.querySelector('.toast')
      .scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionTop;
  }

  getAutoHide() {
    if (
      typeof this.autoHide === 'number' ||
      typeof this.autoHide === 'string'
    ) {
      return Number(this.autoHide);
    } else {
      return 0;
    }
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
      this.size && `${prefix}--size-${this.size}`,
      this.variant && `${prefix}--variant-${this.variant}`,
      !!this.opened && `${prefix}--opened`,
      !!!this.hideToast && `${prefix}--show`,
      !!this.hideToast && `${prefix}--hide`
    );
  }
}
