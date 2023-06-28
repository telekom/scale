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

import { Component, h, Prop, Host, Element } from '@stencil/core';
import classNames from 'classnames';
import { renderIcon } from '../../../utils/render-icon';
import { HTMLStencilElement } from '@stencil/core/internal';
import { FooterNavigation } from '../app-interfaces';

const readData = (data) => {
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    parsedData = data;
  }
  return parsedData;
};

@Component({
  tag: 'scale-app-footer',
  styleUrl: 'app-footer.css',
  shadow: true,
})
export class AppFooter {
  @Element() hostElement: HTMLStencilElement;
  @Prop() footerNavigation?: FooterNavigation[] = [];
  @Prop() variant?: string = 'standard';
  @Prop() copyright?: string = '© Deutsche Telekom AG';
  @Prop() logoHref?: string;
  @Prop() logoTitle?: string;
  @Prop() logoClick?: any;
  @Prop() logoAriaDescribedBy?: string;
  @Prop() claimLang: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  hasSlotLogo: boolean;
  hasSlotNavigation: boolean;

  componentWillLoad() {
    this.hasSlotLogo = !!this.hostElement.querySelector('[slot="logo"]');
    this.hasSlotNavigation = !!this.hostElement.querySelector(
      '[slot="navigation"]'
    );
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div class={this.getCssClassMap()}>
          <div class="footer-mask"></div>
          <footer class="footer">
            <div class="footer-content">
              <div class="footer-branding">
                {this.hasSlotLogo ? (
                  <slot name="logo"></slot>
                ) : (
                  <scale-logo
                    transparent
                    variant="white"
                    language={this.claimLang}
                    size={24}
                    href={this.logoHref}
                    logoTitle={this.logoTitle}
                    onClick={this.logoClick}
                    logoAriaDescribedBy={this.logoAriaDescribedBy}
                  ></scale-logo>
                )}
              </div>
              <div class="footer-copyright">{this.copyright}</div>
              <nav aria-label="bottom" class="footer-navigation">
                {this.hasSlotNavigation ? (
                  <slot name="navigation"></slot>
                ) : (
                  <ul>
                    {readData(this.footerNavigation).map((item) => (
                      <li class="footer-navigation__item">
                        <a
                          class="footer-navigation__item-link"
                          href={item.href || 'javascript:void(0);'}
                          target={item.target || '_self'}
                          onClick={(event) => {
                            if (typeof item.onClick === 'function') {
                              item.onClick(event);
                            }
                          }}
                        >
                          {item.icon &&
                            renderIcon({
                              tag: `scale-icon-${item.icon}`,
                              attributes: {
                                class: 'footer-navigation__item-link',
                              },
                            })}
                          <span>{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </nav>
            </div>
          </footer>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'footer-container',
      this.variant && `footer--variant-${this.variant}`
    );
  }
}
