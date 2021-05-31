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

import { Component, h, Prop, Host } from '@stencil/core';
import classNames from 'classnames';
import { renderIcon } from '../../../utils/render-icon';

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
  @Prop() claimLang: string;
  @Prop() footerNavigation?: any = [];
  @Prop() variant?: string = 'standard';
  @Prop() copyright?: string = '© Deutsche Telekom AG';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  footerMenu() {
    return (
      <ul>
        {readData(this.footerNavigation).map((item) => (
          <li class="footer-navigation__item">
            <a
              class="footer-navigation__item-link"
              href={item.href || 'javascript:void(0);'}
              onClick={(event) => {
                if (typeof item.onClick === 'function') {
                  item.onClick(event);
                }
              }}
            >
              {item.icon &&
                renderIcon({
                  tag: `scale-icon-${item.icon}`,
                  attributes: { class: 'footer-navigation__item-link' },
                })}
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
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
                <app-logo claim claimLang={this.claimLang}></app-logo>
              </div>
              <div class="footer-copyright">{this.copyright}</div>
              <nav aria-label="bottom" class="footer-navigation">
                {this.footerMenu()}
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
