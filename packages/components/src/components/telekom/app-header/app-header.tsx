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
  Host,
  State,
  Listen,
  Watch,
  Element,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import classNames from 'classnames';
import { findRootNode } from '../../../utils/menu-utils';
import statusNote from '../../../utils/status-note';

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
  tag: 'scale-app-header',
  styleUrl: 'app-header.css',
})
export class Header {
  @Element() hostElement: HTMLStencilElement;
  mobileMenuToggle?: HTMLAnchorElement;
  @Prop() logoHref?: string;
  @Prop() logoTitle?: string;
  @Prop() logoClick?: any;
  @Prop() claimLang: string;
  @Prop() portalName?: string = '';
  @Prop() mainNavigation?: any = [];
  @Prop() iconNavigation?: any = [];
  @Prop() sectorNavigation?: any = [];
  @Prop() addonNavigation?: any = [];
  @Prop() activeRouteId: string;
  @Prop() activeSectorId?: string;
  // DEPRECATED - megaMenuVisible should replace isMegaMenuVisible
  @Prop() isMegaMenuVisible?: boolean = false;
  @Prop() megaMenuVisible?: boolean = false;
  // DEPRECATED - mobileMenuVisible should replace isMobileMenuVisible
  @Prop() isMobileMenuVisible?: boolean = false;
  @Prop() mobileMenuVisible?: boolean = false;
  @State() activeSegment: any =
    readData(this.sectorNavigation).find(
      ({ id }) => id === this.activeSectorId
    ) || readData(this.sectorNavigation)[0];
  @State() mobileMenu: boolean = false;
  @State() visibleMegaMenu: string = '';
  @State() scrolled: boolean = false;

  hasSlotMenuMain: boolean;
  hasSlotMenuIcon: boolean;
  hasSlotMenuSector: boolean;
  hasSlotMenuAddon: boolean;
  hasSlotMenuMobile: boolean;
  hasSlotLogo: boolean;

  @Watch('megaMenuVisible')
  megaMenuVisibleChange(isVisible) {
    this.visibleMegaMenu = isVisible;
  }
  // DEPRECATED - megaMenuVisible should replace isMegaMenuVisible
  @Watch('isMegaMenuVisible')
  isMegaMenuVisibleChange(isVisible) {
    this.visibleMegaMenu = isVisible;
  }

  @Listen('scroll', { target: 'window' })
  onScroll() {
    this.scrolled = window.pageYOffset > 2;
  }

  @Listen('closeMenu')
  handleCloseMenu() {
    if (this.mobileMenu) {
      this.mobileMenuToggle.focus();
    }
    this.mobileMenu = false;
  }

  @Watch('activeSectorId')
  handleActiveSegment(newValue) {
    this.activeSegment =
      readData(this.sectorNavigation).find(({ id }) => id === newValue) || {};
  }

  componentWillLoad() {
    this.hasSlotMenuMain = !!this.hostElement.querySelector(
      '[slot="menu-main"]'
    );

    this.hasSlotMenuIcon = !!this.hostElement.querySelector(
      '[slot="menu-icon"]'
    );
    this.hasSlotMenuSector = !!this.hostElement.querySelector(
      '[slot="menu-sector"]'
    );
    this.hasSlotMenuAddon = !!this.hostElement.querySelector(
      '[slot="menu-addon"]'
    );
    this.hasSlotMenuMobile = !!this.hostElement.querySelector(
      '[slot="menu-mobile"]'
    );
    this.hasSlotLogo = !!this.hostElement.querySelector('[slot="logo"]');
  }

  componentDidUpdate() {
    this.hasSlotMenuMain = !!this.hostElement.querySelector(
      '[slot="menu-main"]'
    );

    this.hasSlotMenuIcon = !!this.hostElement.querySelector(
      '[slot="menu-icon"]'
    );
    this.hasSlotMenuSector = !!this.hostElement.querySelector(
      '[slot="menu-sector"]'
    );
    this.hasSlotMenuAddon = !!this.hostElement.querySelector(
      '[slot="menu-addon"]'
    );
    this.hasSlotMenuMobile = !!this.hostElement.querySelector(
      '[slot="menu-mobile"]'
    );
    this.hasSlotLogo = !!this.hostElement.querySelector('[slot="logo"]');
  }

  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.isMegaMenuVisible !== false) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isMegaMenuVisible" is deprecated. Please use the "megaMenuVisible" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.isMobileMenuVisible !== false) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "isMobileMenuVisible" is deprecated. Please use the "mobileMenuVisible" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  handleMobileMenu(event?: KeyboardEvent | MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (event && 'key' in event) {
      if (!['Escape', 'Enter'].includes(event.key)) {
        return;
      }
      if (event.key === 'Escape' && !this.mobileMenu) {
        return;
      }
      if (event.key === 'Enter' && this.mobileMenu) {
        return;
      }
    }
    this.mobileMenu = !this.mobileMenu;
  }

  handleSelectedSegment(event, item) {
    this.activeSegment = item;
    if (typeof item.onClick === 'function') {
      item.onClick(event);
    }
  }

  menuMain() {
    const rootNode = findRootNode(
      readData(this.mainNavigation),
      this.activeRouteId
    );
    const isActive = (item) =>
      rootNode &&
      rootNode.id === item.id &&
      !this.visibleMegaMenu &&
      this.visibleMegaMenu !== null;
    return (
      <ul
        class="main-navigation"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            this.visibleMegaMenu = '';
          }
        }}
      >
        {this.hasSlotMenuMain ? (
          <slot name="menu-main"></slot>
        ) : (
          readData(this.mainNavigation).map((item) => (
            <scale-nav-main
              href={item.href}
              active={isActive(item)}
              megaMenuVisible={this.visibleMegaMenu === item.id}
              onMouseEnter={() => {
                this.visibleMegaMenu = item.children ? item.id : null;
              }}
              onMouseLeave={() => {
                this.visibleMegaMenu = '';
              }}
              clickLink={(event) => {
                if (item.href) {
                  this.visibleMegaMenu = '';
                }

                if (typeof item.onClick === 'function') {
                  item.onClick(event);
                }
                this.visibleMegaMenu = item.children ? item.id : null;
              }}
              name={item.name}
            >
              {item.children && item.children.length > 0 && (
                <app-mega-menu
                  navigation={item.children}
                  hide={() => {
                    this.visibleMegaMenu = '';
                  }}
                  activeRouteId={this.activeRouteId}
                  active={this.visibleMegaMenu === item.id}
                ></app-mega-menu>
              )}
            </scale-nav-main>
          ))
        )}
      </ul>
    );
  }

  menuIcon() {
    const { defaultName, openedName } = readData(this.iconNavigation).find(
      ({ id }) => id === 'menu'
    ) || { defaultName: 'Menu', openedName: 'Close' };
    return (
      <ul class="meta-navigation">
        {this.hasSlotMenuIcon ? (
          <slot name="menu-icon"></slot>
        ) : (
          readData(this.iconNavigation)
            .filter(({ id }) => id !== 'menu')
            .map((item) => (
              <scale-nav-icon
                icon={item.icon}
                href={item.href}
                clickLink={(event) => {
                  if (typeof item.onClick === 'function') {
                    item.onClick(event);
                  }
                }}
              >
                {item.name}
              </scale-nav-icon>
            ))
        )}
        {(readData(this.mainNavigation).length > 0 ||
          this.hasSlotMenuMobile) && (
          <scale-nav-icon
            mobileMenuOpen={this.mobileMenu}
            icon={this.mobileMenu ? 'action-circle-close' : 'action-menu'}
            clickLink={(event) => this.handleMobileMenu(event)}
            refMobileMenuToggle={(el) => (this.mobileMenuToggle = el)}
          >
            {this.mobileMenu ? openedName : defaultName}
          </scale-nav-icon>
        )}
      </ul>
    );
  }

  menuSector() {
    return (
      <ul class="sector-navigation">
        {this.hasSlotMenuSector ? (
          <slot name="menu-sector"></slot>
        ) : this.portalName ? (
          <li class="sector-navigation__portal-name">{this.portalName}</li>
        ) : (
          readData(this.sectorNavigation).map((item) => (
            <scale-nav-segment
              active={this.activeSegment.id === item.id}
              href={item.href}
              onClick={(event) => this.handleSelectedSegment(event, item)}
              onFocus={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              {item.name}
            </scale-nav-segment>
          ))
        )}
      </ul>
    );
  }

  menuAddon() {
    return (
      <ul class="addon-navigation">
        {this.hasSlotMenuAddon ? (
          <slot name="menu-addon"></slot>
        ) : (
          readData(this.addonNavigation).map((item) => (
            <scale-nav-segment
              href={item.href}
              onClick={(event) => {
                if (typeof item.onClick === 'function') {
                  item.onClick(event);
                }
              }}
              onFocus={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              {item.name}
            </scale-nav-segment>
          ))
        )}
      </ul>
    );
  }

  render() {
    return (
      <Host>
        <header class="header__container">
          <div class={this.getCssClassMap()}>
            <div class="header__brand">
              <span class="header__brand-before"></span>
              <span class="header__brand-after"></span>
              <div class="header__brand-content">
                <div class="header__brand-branding">
                  {this.hasSlotLogo ? (
                    <slot name="logo"></slot>
                  ) : (
                    <app-logo
                      claim
                      claimLang={this.claimLang}
                      href={this.logoHref}
                      logoTitle={this.logoTitle}
                      onClick={this.logoClick}
                    ></app-logo>
                  )}
                </div>
                <div class="header__brand-sector">{this.menuSector()}</div>
                <div class="header__brand-meta">{this.menuAddon()}</div>
              </div>
            </div>
            <nav class="header__nav" aria-label="top">
              <span class="header__nav-before"></span>
              <span class="header__nav-after"></span>
              <div class="header__nav-content">
                <div class="header__nav-logo">
                  <app-logo
                    color="#e20074"
                    href={this.logoHref}
                    logoTitle={this.logoTitle}
                    onClick={this.logoClick}
                    focusable={this.scrolled}
                  ></app-logo>
                </div>
                <div class="header__nav-menu-wrapper">
                  <div class="header__nav-menu-main">{this.menuMain()}</div>
                  <div class="header__nav-menu-icon">{this.menuIcon()}</div>
                </div>
              </div>
            </nav>
            <nav
              class={`header__nav__mobile-menu${
                this.mobileMenu ? ' header__nav__mobile-menu--opened' : ''
              }`}
              aria-label="main"
            >
              {this.hasSlotMenuMobile ? (
                <slot name="menu-mobile"></slot>
              ) : (
                <div>
                  <app-navigation-sector-mobile
                    navigation={readData(this.sectorNavigation)}
                    activeSectorId={this.activeSectorId}
                    hide={() => {
                      this.handleMobileMenu();
                      this.mobileMenuToggle.focus();
                    }}
                  ></app-navigation-sector-mobile>
                  <app-navigation-main-mobile
                    navigation={readData(this.mainNavigation)}
                    activeRouteId={this.activeRouteId}
                    hide={() => {
                      this.handleMobileMenu();
                      this.mobileMenuToggle.focus();
                    }}
                  ></app-navigation-main-mobile>
                </div>
              )}
            </nav>
          </div>
        </header>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'header',
      this.scrolled && 'header--sticky',
      (this.visibleMegaMenu || this.mobileMenu) && 'menu--open'
    );
  }
}
