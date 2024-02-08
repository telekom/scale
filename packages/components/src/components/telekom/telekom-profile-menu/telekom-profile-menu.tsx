/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 */

import {
  Component,
  Prop,
  h,
  Host,
  Element,
  State,
  Listen,
} from '@stencil/core';

const LOGIN_DEFAULT = 'https://www.telekom.de';
const LOGIN_HELP_DEFAULT = 'https://www.telekom.de';
const REGISTER_DEFAULT = 'https://www.telekom.de';

const LOGIN_SETTINGS_DEFAULT =
  'https://account.idm.telekom.com/account-manager/';
const LOGOUT_DEFAULT =
  'https://accounts.login.idm.telekom.com/sessionmessage/logout';

const readData = (data) => {
  let parsedData;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    // console.error("Error parsing data! error: " + error);
    // console.error("data: " + data);
    parsedData = data;
  }

  return parsedData;
};

@Component({
  tag: 'scale-telekom-profile-menu',
  styleUrl: 'telekom-profile-menu.css',
  shadow: true,
})
export class TelekomProfileMenu {
  @Element() hostElement: HTMLElement;

  userMenuDesktopTrigger?: HTMLSpanElement;

  @Prop() label: string;
  @Prop() accessibilityLabel?: string;

  @Prop() closeMenuAccessibilityLabel: string;

  @Prop() appName: string;
  @Prop() serviceName: string;
  @Prop() serviceDescription: string;
  @Prop() loggedIn: boolean;

  @Prop() loginUrl?: string;
  @Prop() loginLabel: string;

  @Prop() loginHelpUrl?: string;
  @Prop() loginHelpLabel: string;

  @Prop() registerHeadline: string;
  @Prop() registerUrl?: string;
  @Prop() registerLabel: string;

  @Prop() userInfo: any;
  @Prop() serviceLinks: any;

  @Prop() loginSettingsLabel?: string;
  @Prop() loginSettingsUrl?: string;
  @Prop() hideLoginSettings: boolean;

  @Prop() logoutLabel: string;
  @Prop() logoutUrl?: string;

  @State()
  menuOpen = false;

  @Listen('keydown')
  onKeydown(event: KeyboardEvent) {
    if (this.menuOpen && 'Escape' === event.key) {
      this.userMenuDesktopTrigger.click();
    }
  }

  openMenu(event: any) {
    if (event.target.id === 'user-menu-desktop') {
      this.menuOpen = true;
    }
  }

  closeMenu(event: any) {
    if (event.target.id === 'user-menu-desktop') {
      this.menuOpen = false;
    }
  }

  printSignInMenu() {
    return (
      <div class="profile-menu-login">
        <strong>{this.serviceName}</strong>
        <p>{this.serviceDescription}</p>

        <scale-button href={this.loginUrl || LOGIN_DEFAULT}>
          {this.loginLabel}
        </scale-button>
        <div class="footer">
          <p>
            <scale-link
              omit-underline="true"
              href={this.loginHelpUrl || LOGIN_HELP_DEFAULT}
            >
              {this.loginHelpLabel}
            </scale-link>
          </p>
          <div id="signUp">
            <p>{this.registerHeadline}</p>
            <p>
              <scale-link
                omit-underline="true"
                href={this.registerUrl || REGISTER_DEFAULT}
              >
                {this.registerLabel}
              </scale-link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  printProfileTrigger() {
    if (!this.loggedIn) {
      return (
        <scale-icon-user-file-user
          selected={this.menuOpen}
        ></scale-icon-user-file-user>
      );
    }

    // logged in
    return (
      <scale-badge no-dot="true">
        <scale-icon-user-file-user
          selected={this.menuOpen}
        ></scale-icon-user-file-user>
        <div slot="dot" class="mydot">
          <scale-icon-action-checkmark></scale-icon-action-checkmark>
        </div>
      </scale-badge>
    );
  }

  buildUserNavigation() {
    const divider = [{ type: 'divider' }];

    const userInfo = readData(this.userInfo);
    if (!userInfo) {
      // console.error("userInfo missing");
    }
    userInfo.type = 'userInfo';

    let serviceLinks = readData(this.serviceLinks);
    if (!serviceLinks) {
      // console.error("serviceLinks missing");
      serviceLinks = [];
    }

    for (const el of serviceLinks) {
      el.type = 'item';
    }

    const loginSettings = {
      type: 'item',
      name: this.loginSettingsLabel || 'Login-Settings',
      href: this.loginSettingsUrl || LOGIN_SETTINGS_DEFAULT,
      icon: 'service-settings',
    };

    const logout = {
      type: 'button',
      name: this.logoutLabel,
      href: this.logoutUrl || LOGOUT_DEFAULT,
      variant: 'secondary',
    };

    let menu = [];

    menu = menu.concat(userInfo);

    if (!this.serviceLinksEmpty()) {
      menu = menu.concat(divider);
    }

    menu = menu.concat(serviceLinks);

    if (!this.hideLoginSettings) {
      menu = menu.concat(loginSettings);
    }
    if (!this.serviceLinksEmpty()) {
      menu = menu.concat(divider);
    }

    menu = menu.concat(logout);

    return menu;
  }

  serviceLinksEmpty() {
    return (this.hideLoginSettings && this.serviceLinks.length < 1) === true;
  }

  buildDesktopMenuStyles() {
    let style =
      '.app-navigation-user-menu { padding: 12px 24px 4px 24px; box-sizing: border-box; }';
    style +=
      '.scale-icon { width: 20px; height: 20px; display: flex; align-self: center; }';

    if (this.serviceLinksEmpty()) {
      style += 'scale-button { margin-top: 32px !important; }';
    }

    return style;
  }

  buildMobileMenuStyles() {
    let style =
      '.app-navigation-user-menu__user-info--name { margin-bottom: 0 !important; }';
    style += '.scale-icon { width: 20px; height: 20px; }';

    if (this.serviceLinksEmpty()) {
      style += 'scale-button { margin-top: 32px !important; }';
    }

    return style;
  }

  printLabel() {
    if (!this.accessibilityLabel) {
      return <span class="flyout-label">{this.label}</span>;
    }

    return (
      <div class="flyout-label">
        <span aria-hidden="true">{this.label}</span>
        <span class="visually-hidden">{this.accessibilityLabel}</span>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <scale-telekom-nav-item class="user-menu-desktop">
          <scale-menu-flyout
            direction="bottom-left"
            onScale-open={(event: any) => this.openMenu(event)}
            onScale-close={(event: any) => this.closeMenu(event)}
            triggerHasPopup={false}
          >
            <a
              href="javascript:void(0);"
              slot="trigger"
              role="button"
              aria-controls="user-menu-desktop"
            >
              {this.printProfileTrigger()}
              {this.printLabel()}
            </a>

            <scale-menu-flyout-list
              id="user-menu-desktop"
              preventFlipVertical={true}
              role="none"
            >
              {this.loggedIn && [
                <app-navigation-user-menu
                  hide={() => {
                    this.userMenuDesktopTrigger.click();
                  }}
                  navigation={this.buildUserNavigation()}
                  styles={this.buildDesktopMenuStyles()}
                ></app-navigation-user-menu>,
              ]}

              {!this.loggedIn && [
                <app-navigation-user-menu navigation={[]}>
                  {this.printSignInMenu()}
                </app-navigation-user-menu>,
              ]}
            </scale-menu-flyout-list>
            <div
              slot="trigger"
              class="user-menu-trigger"
              ref={(el) => (this.userMenuDesktopTrigger = el)}
            ></div>
          </scale-menu-flyout>
        </scale-telekom-nav-item>

        <scale-telekom-nav-item class="user-menu-mobile">
          <button>
            {this.printProfileTrigger()}
            {this.printLabel()}
          </button>

          <scale-telekom-nav-flyout variant="mobile">
            <scale-telekom-mobile-flyout-canvas
              appName={this.appName}
              closeButtonLabel={this.closeMenuAccessibilityLabel}
            >
              {this.loggedIn && [
                <app-navigation-user-menu
                  slot="mobile-main-nav"
                  navigation={this.buildUserNavigation()}
                  styles={this.buildMobileMenuStyles()}
                ></app-navigation-user-menu>,
              ]}

              {!this.loggedIn && [
                <app-navigation-user-menu
                  slot="mobile-main-nav"
                  navigation={[]}
                >
                  {this.printSignInMenu()}
                </app-navigation-user-menu>,
              ]}
            </scale-telekom-mobile-flyout-canvas>
          </scale-telekom-nav-flyout>
        </scale-telekom-nav-item>
      </Host>
    );
  }
}
