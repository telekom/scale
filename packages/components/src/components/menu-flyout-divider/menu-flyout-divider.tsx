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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import classNames from 'classnames';

const name = 'menu-divider';
@Component({
  tag: 'scale-menu-flyout-divider',
  styleUrl: 'menu-flyout-divider.css',
  shadow: true,
})
export class MenuFlyoutDivider {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */

  /* 3. Public Properties (alphabetical) */
  /** (optional) Injected styles */
  @Prop() styles?: string;

  /* 4. Events (alphabetical) */

  /* 5. Private Properties (alphabetical) */

  /* 6. Lifecycle Events (call order) */
  constructor() {}
  connectedCallback() {}
  componentWillLoad() {}
  componentWillUpdate() {}
  componentDidRender() {}
  componentDidLoad() {}
  componentDidUpdate() {}
  disconnectedCallback() {}

  /* 7. Listeners */

  /* 8. Public Methods */

  /* 9. Local Methods */
  getCssClassMap() {
    return classNames(name);
  }

  /* 10. Render */
  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          part="base"
          role="separator"
          aria-hidden="true"
        ></div>
      </Host>
    );
  }
}
