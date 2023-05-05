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
  Prop,
  Event,
  EventEmitter,
  Host,
  Element,
} from '@stencil/core';
import { renderIcon } from '../../../utils/render-icon';

@Component({
  tag: 'app-navigation-user-menu',
  styleUrl: 'app-navigation-user-menu.css',
  shadow: true,
})
export class AppNavigationUserMenu {
  @Element() hostElement: HTMLElement;
  @Prop() hide: () => void;
  @Prop() navigation: any;
  @Event({
    eventName: 'closeMenu',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  closeMenu: EventEmitter;

  render() {
    return (
      <Host>
        <div class="app-navigation-user-menu">
          {this.navigation.map((item) => {
            if (item.type === 'divider') {
              return (
                <hr
                  class="app-navigation-user-menu__divider"
                  part="rule-horizontal"
                />
              );
            }

            if (item.type === 'userInfo') {
              return (
                <div class="app-navigation-user-menu__user-info">
                  <div class="app-navigation-user-menu__user-info--name scl-font-variant-heading-4">
                    {item.name}
                  </div>
                  <div class="app-navigation-user-menu__user-info--email">
                    {item.email}
                  </div>
                </div>
              );
            }

            if (item.type === 'item') {
              return (
                <a
                  href={item.href || 'javascript:void(0);'}
                  target={item.target || '_self'}
                  tabindex={0}
                  class="app-navigation-user-menu__item"
                  onClick={(e) => {
                    e.stopImmediatePropagation();
                    if (item.onClick) {
                      item.onClick(e);
                    }
                    this.hide();
                  }}
                  onKeyDown={(e) => {
                    if ([' ', 'Enter'].includes(e.key)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();

                      if (item.onClick) {
                        item.onClick(e);
                      }
                      this.hide();
                    }
                  }}
                >
                  {item.icon &&
                  (!item.iconPosition || item.iconPosition === 'prefix')
                    ? renderIcon({
                        tag: `scale-icon-${item.icon}`,
                        attributes: {
                          class: `app-navigation-user-menu__item--icon-prefix`,
                        },
                      })
                    : null}

                  {item.name}
                  {item.icon && item.iconPosition === 'suffix'
                    ? renderIcon({
                        tag: `scale-icon-${item.icon}`,
                        attributes: {
                          class: `app-navigation-user-menu__item--icon-suffix`,
                        },
                      })
                    : null}
                </a>
              );
            }

            if (item.type === 'button') {
              return (
                <scale-button
                  class="app-navigation-user-menu__button"
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick(e);
                    }
                    this.hide();
                  }}
                  onKeyDown={(e) => {
                    if ([' ', 'Enter'].includes(e.key)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();

                      if (item.onClick) {
                        item.onClick(e);
                      }
                      this.hide();
                    }
                  }}
                  href={item.href}
                  variant={item.variant || 'primary'}
                >
                  {item.icon &&
                  (!item.iconPosition || item.iconPosition === 'prefix')
                    ? renderIcon({
                        tag: `scale-icon-${item.icon}`,
                        attributes: {},
                      })
                    : null}

                  {item.name}

                  {item.icon && item.iconPosition === 'suffix'
                    ? renderIcon({
                        tag: `scale-icon-${item.icon}`,
                        attributes: {},
                      })
                    : null}
                </scale-button>
              );
            }
          })}
        </div>
      </Host>
    );
  }
}
