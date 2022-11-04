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

import { Component, h, Prop, Host, State, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-app-shell',
  styleUrl: 'app-shell.css',
  shadow: true,
})
export class Shell {
  @Element() hostElement: HTMLStencilElement;
  @Prop() portalName?: string = '';
  @Prop() claimLang?: string = 'de';
  @Prop() logoHref?: string;
  @Prop() logoTitle?: string;
  @Prop() logoHideTitle?: boolean;
  @Prop() logoClick?: any;
  @Prop() logoAriaDescribedBy?: string;
  @Prop() mainNavigation?: any = [];
  @Prop() iconNavigation?: any = [];
  @Prop() userNavigation?: any = [];
  @Prop() sectorNavigation?: any = [];
  @Prop() addonNavigation?: any = [];
  @Prop() activeRouteId?: string = '';
  @Prop() activeSectorId?: string = '';
  @Prop() sticky?: boolean = false;
  @State() scrolled: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  hasSlotHeader: boolean;

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part="base" class="shell">
          {this.hasSlotHeader ? (
            <slot name="header"></slot>
          ) : (
            <scale-app-header
              logoClick={this.logoClick}
              logoAriaDescribedBy={this.logoAriaDescribedBy}
              logoHref={this.logoHref}
              logoTitle={this.logoTitle}
              logoHideTitle={this.logoHideTitle}
              portalName={this.portalName}
              mainNavigation={this.mainNavigation}
              iconNavigation={this.iconNavigation}
              userNavigation={this.userNavigation}
              sectorNavigation={this.sectorNavigation}
              addonNavigation={this.addonNavigation}
              activeRouteId={this.activeRouteId}
              activeSectorId={this.activeSectorId}
              claimLang={this.claimLang}
              sticky={this.sticky}
            ></scale-app-header>
          )}
          <main class="content">
            <slot></slot>
          </main>
          <slot name="footer"></slot>
        </div>
      </Host>
    );
  }
}
