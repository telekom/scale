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

import { Component, h, Prop } from '@stencil/core';
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
  tag: 'scale-telekom-header-data-back-compat',
  styleUrl: './telekom-header-data-back-compat.css',
  shadow: false,
})
export class TelekomHeaderDataBackCompat {
  @Prop({ reflect: true }) appName?: string;
  @Prop() appNameLink?: string;
  @Prop() appNameClick?: any;
  @Prop() logoHref?: string;
  @Prop() logoTitle?: string;
  @Prop() logoHideTitle?: boolean;

  @Prop() mainNavigation: any;
  @Prop() iconNavigation: any;
  @Prop() addonNavigation: any;
  @Prop() sectorNavigation: any;
  @Prop() userNavigation: any;
  @Prop() activeRouteId: string;

  userMenuMobileTrigger?: HTMLButtonElement;
  userMenuDesktopTrigger?: HTMLSpanElement;
  userMenuDesktopLink?: HTMLAnchorElement;

  render() {
    const {
      shortName = 'Login',
      badge,
      badgeLabel,
    } = (readData(this.userNavigation) || []).find(
      ({ type }) => type === 'userInfo'
    ) || {
      shortName: 'Login',
    };

    return (
      <scale-telekom-header
        app-name={this.appName}
        app-name-link={this.appNameLink}
        app-name-click={this.appNameClick}
        logo-href={this.logoHref}
        logo-title={this.logoTitle}
        logo-hide-title={this.logoHideTitle}
      >
        {!readData(this.sectorNavigation) ? null : (
          <scale-telekom-nav-list
            slot="meta-nav-external"
            variant="meta-nav-external"
            alignment="left"
          >
            {readData(this.sectorNavigation).map((item) => {
              return (
                <scale-telekom-nav-item>
                  <a
                    href={item.href || 'javascript:void(0);'}
                    target={item.target || '_self'}
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

        {!readData(this.addonNavigation) ? null : (
          <scale-telekom-nav-list
            slot="meta-nav"
            variant="meta-nav"
            alignment="right"
          >
            {readData(this.addonNavigation).map((item) => {
              return (
                <scale-telekom-nav-item>
                  <a
                    href={item.href || 'javascript:void(0);'}
                    target={item.target || '_self'}
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

        {!readData(this.mainNavigation) ? null : (
          <scale-telekom-nav-list variant="main-nav" slot="main-nav">
            {readData(this.mainNavigation).map((item) => {
              const { selected } = findSelected(
                readData(this.mainNavigation),
                this.activeRouteId
              );
              const rootNode =
                selected &&
                findRootNode(readData(this.mainNavigation), selected.id);
              const isActive = (itemId) => rootNode && rootNode.id === itemId;

              return (
                <scale-telekom-nav-item active={isActive(item.id)}>
                  <a
                    href={item.href || 'javascript:void(0);'}
                    target={item.target || '_self'}
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
                                href={child.href || 'javascript:void(0);'}
                                target={child.target || '_self'}
                                onClick={(event) => {
                                  if (typeof child.onClick === 'function') {
                                    child.onClick(event);
                                  }
                                }}
                                slot="heading"
                              >
                                {child.name}
                              </a>
                              {!child.children ? null : (
                                <ul>
                                  {child.children.map((grandChild) => {
                                    return (
                                      <li>
                                        <a
                                          href={
                                            grandChild.href ||
                                            'javascript:void(0);'
                                          }
                                          target={grandChild.target || '_self'}
                                          onClick={(event) => {
                                            if (
                                              typeof grandChild.onClick ===
                                              'function'
                                            ) {
                                              grandChild.onClick(event);
                                            }
                                          }}
                                        >
                                          {grandChild.name}
                                        </a>
                                      </li>
                                    );
                                  })}
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

        {!readData(this.iconNavigation) &&
        !readData(this.userNavigation) ? null : (
          <scale-telekom-nav-list
            variant="functions"
            slot="functions"
            alignment="right"
          >
            {readData(this.userNavigation).length > 0 && (
              <scale-telekom-nav-item class="user-menu-desktop">
                <a
                  href="javascript:void(0);"
                  ref={(el) => (this.userMenuDesktopLink = el)}
                  onKeyDown={(e) => {
                    if ([' ', 'Enter', 'Escape'].includes(e.key)) {
                      e.preventDefault();
                      this.userMenuDesktopTrigger.click();
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.userMenuDesktopTrigger.click();
                  }}
                >
                  <scale-menu-flyout direction="bottom-left">
                    {badge ? (
                      <scale-badge
                        count={badgeLabel}
                        label={shortName}
                        label-visually-hidden
                      >
                        <scale-icon-user-file-user> </scale-icon-user-file-user>
                      </scale-badge>
                    ) : (
                      <scale-icon-user-file-user> </scale-icon-user-file-user>
                    )}

                    <scale-menu-flyout-list>
                      <app-navigation-user-menu
                        hide={() => {
                          this.userMenuDesktopTrigger.click();
                          this.userMenuDesktopLink.focus();
                        }}
                        navigation={readData(this.userNavigation)}
                      ></app-navigation-user-menu>
                    </scale-menu-flyout-list>
                    <div
                      slot="trigger"
                      class="user-menu-trigger"
                      ref={(el) => (this.userMenuDesktopTrigger = el)}
                    ></div>
                  </scale-menu-flyout>
                </a>
              </scale-telekom-nav-item>
            )}

            {readData(this.userNavigation).length > 0 && (
              <scale-telekom-nav-item class="user-menu-mobile">
                <button
                  ref={(el) => {
                    this.userMenuMobileTrigger = el;
                  }}
                >
                  <scale-badge
                    count={badgeLabel}
                    label={shortName}
                    label-visually-hidden
                  >
                    <scale-icon-user-file-user> </scale-icon-user-file-user>
                  </scale-badge>
                </button>
                <scale-telekom-nav-flyout variant="mobile">
                  <scale-telekom-mobile-flyout-canvas>
                    <app-navigation-user-menu
                      slot="mobile-main-nav"
                      hide={() => {
                        this.userMenuMobileTrigger.click();
                        this.userMenuMobileTrigger.focus();
                      }}
                      navigation={readData(this.userNavigation)}
                    ></app-navigation-user-menu>
                  </scale-telekom-mobile-flyout-canvas>
                </scale-telekom-nav-flyout>
              </scale-telekom-nav-item>
            )}

            {(readData(this.iconNavigation) || [])
              .filter(({ id }) => id !== 'menu')
              .map((item) => {
                return (
                  <scale-telekom-nav-item>
                    <a
                      href={item.href || 'javascript:void(0);'}
                      target={item.target || '_self'}
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
                          label-visually-hidden={item.labelVisuallyHidden}
                          aria-label-translation={item.ariaLabelTranslation}
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

            {!readData(this.mainNavigation) &&
            !readData(this.sectorNavigation) &&
            !readData(this.addonNavigation) ? null : (
              <scale-telekom-nav-item hide-on-desktop>
                <button>
                  <scale-badge>
                    <scale-icon-action-menu></scale-icon-action-menu>
                  </scale-badge>
                </button>
                <scale-telekom-nav-flyout variant="mobile">
                  <scale-telekom-mobile-flyout-canvas
                    app-name={this.appName}
                    app-name-link={this.appNameLink || 'javascript:void(0);'}
                    app-name-click={(event) => {
                      if (typeof this.appNameClick === 'function') {
                        this.appNameClick(event);
                      }
                    }}
                  >
                    {!readData(this.mainNavigation) ? null : (
                      <scale-telekom-mobile-menu slot="mobile-main-nav">
                        {readData(this.mainNavigation).map((item) => {
                          const { selected, parent } = findSelected(
                            readData(this.mainNavigation),
                            this.activeRouteId
                          );
                          const rootNode =
                            selected &&
                            findRootNode(
                              readData(this.mainNavigation),
                              selected.id
                            );
                          const isRootOpen = (itemId) =>
                            rootNode &&
                            rootNode.id === itemId &&
                            itemId !== this.activeRouteId;
                          const isActive = (itemId) =>
                            itemId === this.activeRouteId;

                          return (
                            <scale-telekom-mobile-menu-item
                              open={isRootOpen(item.id)}
                              active={isActive(item.id)}
                            >
                              <a
                                href={item.href || 'javascript:void(0);'}
                                target={item.target || '_self'}
                                onClick={(event) => {
                                  if (typeof item.onClick === 'function') {
                                    item.onClick(event);
                                  }
                                }}
                              >
                                {item.name}
                              </a>
                              {!item.children
                                ? null
                                : item.children.map((child) => {
                                    return (
                                      <scale-telekom-mobile-menu-item
                                        slot="children"
                                        active={isActive(child.id)}
                                        open={parent && parent.id === child.id}
                                      >
                                        <a
                                          href={
                                            child.href || 'javascript:void(0);'
                                          }
                                          target={child.target || '_self'}
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
                                          : child.children.map((grandChild) => (
                                              <scale-telekom-mobile-menu-item
                                                slot="children"
                                                active={isActive(grandChild.id)}
                                              >
                                                <a
                                                  href={
                                                    grandChild.href ||
                                                    'javascript:void(0);'
                                                  }
                                                  target={
                                                    grandChild.target || '_self'
                                                  }
                                                  onClick={(event) => {
                                                    if (
                                                      typeof grandChild.onClick ===
                                                      'function'
                                                    ) {
                                                      grandChild.onClick(event);
                                                    }
                                                  }}
                                                >
                                                  {grandChild.name}
                                                </a>
                                              </scale-telekom-mobile-menu-item>
                                            ))}
                                      </scale-telekom-mobile-menu-item>
                                    );
                                  })}
                            </scale-telekom-mobile-menu-item>
                          );
                        })}
                      </scale-telekom-mobile-menu>
                    )}

                    {!readData(this.sectorNavigation) ? null : (
                      <scale-telekom-nav-list
                        variant="meta-nav"
                        slot="mobile-meta-nav-external"
                        alignment="left"
                      >
                        {readData(this.sectorNavigation).map((item) => {
                          return (
                            <scale-telekom-nav-item>
                              <a
                                href={item.href || 'javascript:void(0);'}
                                target={item.target || '_self'}
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
                    {!readData(this.addonNavigation) ? null : (
                      <scale-telekom-nav-list
                        variant="meta-nav"
                        slot="mobile-meta-nav"
                        alignment="left"
                      >
                        {readData(this.addonNavigation).map((item) => {
                          return (
                            <scale-telekom-nav-item>
                              <a
                                href={item.href || 'javascript:void(0);'}
                                target={item.target || '_self'}
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
                  </scale-telekom-mobile-flyout-canvas>
                </scale-telekom-nav-flyout>
              </scale-telekom-nav-item>
            )}
          </scale-telekom-nav-list>
        )}
      </scale-telekom-header>
    );
  }
}
