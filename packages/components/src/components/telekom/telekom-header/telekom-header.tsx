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
import { findRootNode, findSelected } from '../../../utils/menu-utils';
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
  tag: 'scale-telekom-header',
  styleUrl: 'telekom-header.css',
  shadow: true,
})
export class TelekomHeader {
  @Element() hostElement: HTMLStencilElement;

  @Prop() mainNavigation: any;
  @Prop() iconNavigation: any;
  @Prop() addonNavigation: any;
  @Prop() sectorNavigation: any;
  @Prop() activeRouteId: string;
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
                  <slot name="meta-nav-external">
                    {!readData(this.addonNavigation) ? null : (
                      <scale-telekom-nav-list
                        variant="meta-nav-external"
                        alignment="left"
                      >
                        {readData(this.addonNavigation).map((item) => {
                          return (
                            <scale-telekom-nav-item>
                              <a
                                href={item.href || 'javascript:void(0);'}
                                onClick={(event) => {
                                  if (typeof item.onClick === 'function') {
                                    item.onClick(event);
                                  }
                                }}
                              >
                                {item.name}
                              </a>
                            </scale-telekom-nav-item>
                          );
                        })}
                      </scale-telekom-nav-list>
                    )}
                  </slot>
                  <slot name="meta-nav">
                    {!readData(this.sectorNavigation) ? null : (
                      <scale-telekom-nav-list
                        variant="meta-nav"
                        slot="meta-nav"
                        alignment="right"
                      >
                        {readData(this.sectorNavigation).map((item) => {
                          return (
                            <scale-telekom-nav-item>
                              <a
                                href={item.href || 'javascript:void(0);'}
                                onClick={(event) => {
                                  if (typeof item.onClick === 'function') {
                                    item.onClick(event);
                                  }
                                }}
                              >
                                {item.name}
                              </a>
                            </scale-telekom-nav-item>
                          );
                        })}
                      </scale-telekom-nav-list>
                    )}
                  </slot>
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
                  <slot name="main-nav">
                    {!readData(this.mainNavigation) ? null : (
                      <scale-telekom-nav-list variant="main-nav">
                        {readData(this.mainNavigation).map((item) => {
                          const { selected } = findSelected(
                            readData(this.mainNavigation),
                            this.activeRouteId
                          );
                          const rootNode =
                            selected &&
                            findRootNode(
                              readData(this.mainNavigation),
                              selected.id
                            );
                          const isActive = (itemId) =>
                            rootNode && rootNode.id === itemId;

                          return (
                            <scale-telekom-nav-item active={isActive(item.id)}>
                              <a
                                href={item.href || 'javascript:void(0);'}
                                onClick={(event) => {
                                  if (typeof item.onClick === 'function') {
                                    item.onClick(event);
                                  }
                                }}
                              >
                                <span>{item.name}</span>
                              </a>
                              {!item.children ? null : (
                                <scale-telekom-nav-flyout hover>
                                  <scale-telekom-mega-menu>
                                    {item.children.map((child) => {
                                      return (
                                        <scale-telekom-mega-menu-column>
                                          <a
                                            href={
                                              child.href ||
                                              'javascript:void(0);'
                                            }
                                            onClick={(event) => {
                                              if (
                                                typeof child.onClick ===
                                                'function'
                                              ) {
                                                child.onClick(event);
                                              }
                                            }}
                                            slot="heading"
                                          >
                                            {child.name}
                                          </a>
                                          {!child.children ? null : (
                                            <ul>
                                              {child.children.map(
                                                (grandChild) => {
                                                  return (
                                                    <li>
                                                      <a
                                                        href={
                                                          grandChild.href ||
                                                          'javascript:void(0);'
                                                        }
                                                        onClick={(event) => {
                                                          if (
                                                            typeof grandChild.onClick ===
                                                            'function'
                                                          ) {
                                                            grandChild.onClick(
                                                              event
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        {grandChild.name}
                                                      </a>
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          )}
                                        </scale-telekom-mega-menu-column>
                                      );
                                    })}
                                  </scale-telekom-mega-menu>
                                </scale-telekom-nav-flyout>
                              )}
                            </scale-telekom-nav-item>
                          );
                        })}
                      </scale-telekom-nav-list>
                    )}
                  </slot>
                  <slot name="functions">
                    {!readData(this.iconNavigation) ? null : (
                      <scale-telekom-nav-list
                        variant="functions"
                        slot="functions"
                        alignment="right"
                      >
                        {readData(this.iconNavigation)
                          .filter(({ id }) => id !== 'menu')
                          .map((item) => {
                            return (
                              <scale-telekom-nav-item>
                                <a
                                  href={item.href || 'javascript:void(0);'}
                                  onClick={(event) => {
                                    if (typeof item.onClick === 'function') {
                                      item.onClick(event);
                                    }
                                  }}
                                >
                                  {item.badgeLabel ? (
                                    <scale-badge
                                      count={item.badgeCount}
                                      label={item.badgeLabel}
                                      label-visually-hidden
                                    >
                                      {renderIcon({
                                        tag: `scale-icon-${item.icon}`,
                                        attributes: {},
                                      })}
                                    </scale-badge>
                                  ) : (
                                    renderIcon({
                                      tag: `scale-icon-${item.icon}`,
                                      attributes: {},
                                    })
                                  )}
                                </a>
                              </scale-telekom-nav-item>
                            );
                          })}
                        <button class="mobile-menu-trigger">
                          <scale-icon-action-menu></scale-icon-action-menu>
                        </button>

                        <scale-telekom-nav-flyout class="mobile-menu-flyout">
                          <scale-telekom-mobile-flyout-canvas
                            app-name={this.appName}
                            app-name-link={
                              this.appNameLink || 'javascript:void(0);'
                            }
                            app-name-click={(event) => {
                              if (typeof this.appNameClick === 'function') {
                                this.appNameClick(event);
                              }
                            }}
                          >
                            {!readData(this.mainNavigation) ? null : (
                              <scale-telekom-mobile-menu slot="mobile-main-nav">
                                {readData(this.mainNavigation).map((item) => {
                                  return (
                                    <scale-telekom-mobile-menu-item>
                                      <a
                                        href={
                                          item.href || 'javascript:void(0);'
                                        }
                                        onClick={(event) => {
                                          if (
                                            typeof item.onClick === 'function'
                                          ) {
                                            item.onClick(event);
                                          }
                                        }}
                                      >
                                        {item.name}
                                      </a>
                                      {!item.children
                                        ? null
                                        : item.children.map((child) => (
                                            <scale-telekom-mobile-menu-item slot="children">
                                              <a
                                                href={
                                                  child.href ||
                                                  'javascript:void(0);'
                                                }
                                                onClick={(event) => {
                                                  if (
                                                    typeof child.onClick ===
                                                    'function'
                                                  ) {
                                                    child.onClick(event);
                                                  }
                                                }}
                                              >
                                                {child.name}
                                              </a>
                                              {!child.children
                                                ? null
                                                : child.children.map(
                                                    (grandChild) => (
                                                      <scale-telekom-mobile-menu-item slot="children">
                                                        <a
                                                          href={
                                                            grandChild.href ||
                                                            'javascript:void(0);'
                                                          }
                                                          onClick={(event) => {
                                                            if (
                                                              typeof grandChild.onClick ===
                                                              'function'
                                                            ) {
                                                              grandChild.onClick(
                                                                event
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          {grandChild.name}
                                                        </a>
                                                      </scale-telekom-mobile-menu-item>
                                                    )
                                                  )}
                                            </scale-telekom-mobile-menu-item>
                                          ))}
                                    </scale-telekom-mobile-menu-item>
                                  );
                                })}
                              </scale-telekom-mobile-menu>
                            )}

                            {!readData(this.addonNavigation) ? null : (
                              <scale-telekom-nav-list
                                variant="meta-nav"
                                slot="mobile-meta-nav-external"
                                alignment="left"
                              >
                                {readData(this.addonNavigation).map((item) => {
                                  return (
                                    <scale-telekom-nav-item>
                                      <a
                                        href={
                                          item.href || 'javascript:void(0);'
                                        }
                                        onClick={(event) => {
                                          if (
                                            typeof item.onClick === 'function'
                                          ) {
                                            item.onClick(event);
                                          }
                                        }}
                                      >
                                        {item.name}
                                      </a>
                                    </scale-telekom-nav-item>
                                  );
                                })}
                              </scale-telekom-nav-list>
                            )}
                            {!readData(this.sectorNavigation) ? null : (
                              <scale-telekom-nav-list
                                variant="meta-nav"
                                slot="mobile-meta-nav"
                                alignment="left"
                              >
                                {readData(this.sectorNavigation).map((item) => {
                                  return (
                                    <scale-telekom-nav-item>
                                      <a
                                        href={
                                          item.href || 'javascript:void(0);'
                                        }
                                        onClick={(event) => {
                                          if (
                                            typeof item.onClick === 'function'
                                          ) {
                                            item.onClick(event);
                                          }
                                        }}
                                      >
                                        {item.name}
                                      </a>
                                    </scale-telekom-nav-item>
                                  );
                                })}
                              </scale-telekom-nav-list>
                            )}
                          </scale-telekom-mobile-flyout-canvas>
                        </scale-telekom-nav-flyout>
                      </scale-telekom-nav-list>
                    )}
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}
