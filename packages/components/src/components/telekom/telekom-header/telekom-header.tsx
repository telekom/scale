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

  @Prop() mainNavigation: any;
  @Prop() appName?: string;
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
      <Host>
        <header
          part={cx('base', {
            scrolled: this.scrolled,
            'scrolled-back': this.scrolledBack,
          })}
        >
          <div part="container">
            <slot name="app-logo">
              <scale-logo part="app-logo" variant="white"></scale-logo>
            </slot>

            <div part="horizontal-menus">
              <div part="extended-menu">
                <div part="extended-menu-left">
                  {this.appName ? (
                    <div part="app-name-extended">
                      <scale-telekom-app-name>
                        {this.appNameLink ? (
                          <a
                            onClick={this.appNameClick}
                            href={this.appNameLink}
                          >
                            {this.appName}
                          </a>
                        ) : (
                          <span>{this.appName}</span>
                        )}
                      </scale-telekom-app-name>
                    </div>
                  ) : null}

                  <slot name="meta-nav-ext"></slot>
                </div>
                <div part="extended-menu-right">
                  <slot name="meta-nav"></slot>
                  <slot name="language-switch"></slot>
                </div>
              </div>

              <div part="app-name-and-base-menu">
                {this.appName ? (
                  <div part="app-name">
                    <scale-telekom-app-name>
                      {this.appNameLink ? (
                        <a onClick={this.appNameClick} href={this.appNameLink}>
                          {this.appName}
                        </a>
                      ) : (
                        <span>{this.appName}</span>
                      )}
                    </scale-telekom-app-name>
                  </div>
                ) : null}
                <div part="base-menu">
                  <slot name="main-nav"></slot>
                  <slot name="functions"></slot>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}
