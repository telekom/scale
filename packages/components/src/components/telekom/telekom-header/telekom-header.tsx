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
  Element,
  Prop,
  Listen,
  State,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import cx from 'classnames';

@Component({
  tag: 'scale-telekom-header',
  styleUrl: 'telekom-header.css',
  shadow: true,
})
export class TelekomHeader {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true }) appName?: string;
  @Prop() appNameLink?: string;
  @Prop() appNameClick?: any;

  @State() scrolled: boolean;
  @State() scrolledBack: boolean = false;
  @State() pageYOffset: number = 0;

  @Listen('scroll', { target: 'document' })
  onScroll() {
    this.scrolled = window.pageYOffset > 2;
    this.scrolledBack =
      this.pageYOffset !== window.pageYOffset && window.pageYOffset <= 0;
    this.pageYOffset = pageYOffset;
  }

  render() {
    return (
      <Host scrolled={this.scrolled} scrolled-back={this.scrolledBack}>
        <header
          part={cx('base', {
            scrolled: this.scrolled,
            'scrolled-back': this.scrolledBack,
          })}
        >
          <div part="fixed-wrapper">
            <div part="container">
              <slot name="logo">
                <scale-logo part="app-logo" variant="white"></scale-logo>
              </slot>

              <div part="body">
                <div part="top-bar">
                  {this.appName ? (
                    <div part="top-app-name">
                      {this.appNameLink ? (
                        <a
                          part="app-name-text"
                          onClick={this.appNameClick}
                          href={this.appNameLink}
                        >
                          {this.appName}
                        </a>
                      ) : (
                        <span part="app-name-text">{this.appName}</span>
                      )}
                    </div>
                  ) : null}

                  <div part="top-body">
                    <slot name="meta-nav-external"></slot>
                    <slot name="meta-nav"></slot>
                    <slot name="lang-switcher"></slot>
                  </div>
                </div>

                <div part="bottom-bar">
                  {this.appName ? (
                    <div part="bottom-app-name">
                      {this.appNameLink ? (
                        <a
                          part="app-name-text"
                          onClick={this.appNameClick}
                          href={this.appNameLink}
                        >
                          {this.appName}
                        </a>
                      ) : (
                        <span part="app-name-text">{this.appName}</span>
                      )}
                    </div>
                  ) : null}
                  <div part="bottom-body">
                    <slot name="main-nav"></slot>
                    <slot name="functions"></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}
