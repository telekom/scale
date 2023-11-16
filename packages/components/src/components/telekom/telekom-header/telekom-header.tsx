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
  @Prop() logoHref?: string;
  @Prop() logoTitle?: string;
  @Prop() logoHideTitle?: boolean;
  @Prop() type?: string = '';
  @Prop() metaNavAriaLabel?: string = 'Meta navigation';
  @Prop() metaNavExternalAriaLabel?: string = 'External meta navigation';
  @Prop() langSwitcherAriaLabel?: string = 'Language switcher';
  @Prop() mainNavAriaLabel?: string = 'Main navigation';

  @State() scrolled: boolean;
  @State() scrolledBack: boolean = false;
  @State() pageYOffset: number = 0;

  @Listen('scroll', { target: 'document' })
  onScroll() {
    // 48px is the height of the header, set scrolled when the user scrolls past it
    // todo: calculate this value dynamically (for slim header, smaller viewports, etc)
    this.scrolled = window.pageYOffset > 48;
    this.scrolledBack =
      this.pageYOffset !== window.pageYOffset && window.pageYOffset <= 0;
    this.pageYOffset = pageYOffset;
  }

  render() {
    return (
      <Host
        scrolled={this.type !== 'subtle' && this.scrolled}
        scrolled-back={this.type !== 'subtle' && this.scrolledBack}
      >
        <header
          part={cx('base', this.type, {
            scrolled: this.type !== 'subtle' && this.scrolled,
            'scrolled-back': this.type !== 'subtle' && this.scrolledBack,
          })}
        >
          <div part="fixed-wrapper">
            <div part="container">
              <slot name="logo">
                <scale-logo
                  part="app-logo"
                  variant="white"
                  href={this.logoHref}
                  tabindex={this.logoHref ? '0' : '-1'}
                  logoTitle={this.logoTitle}
                  logoHideTitle={this.logoHideTitle}
                ></scale-logo>
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
                    <nav
                      part="meta-nav-external"
                      aria-label={this.metaNavExternalAriaLabel}
                    >
                      <slot name="meta-nav-external"></slot>
                    </nav>
                    <nav part="meta-nav" aria-label={this.metaNavAriaLabel}>
                      <slot name="meta-nav"></slot>
                    </nav>
                    <nav
                      part="lang-switcher"
                      aria-label={this.langSwitcherAriaLabel}
                    >
                      <slot name="lang-switcher"></slot>
                    </nav>
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
                    <nav part="main-nav" aria-label={this.mainNavAriaLabel}>
                      <slot name="main-nav"></slot>
                    </nav>
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
