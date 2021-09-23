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

import { Component, Prop, h, Host } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-menu-flyout-divider',
  styleUrl: 'menu-flyout-divider.css',
  shadow: true,
})
export class MenuFlyoutDivider {
  /** (optional) Injected styles */
  @Prop() styles?: string;

  getCssClassMap() {
    return classNames('menu-flyout-divider');
  }

  render() {
    return (
      <Host role="separator">
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()} part="base" aria-hidden="true"></div>
      </Host>
    );
  }
}
