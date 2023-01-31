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
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-app-shell',
  styleUrl: 'telekom-app-shell.css',
  shadow: true,
})
export class Shell {
  @Element() hostElement: HTMLStencilElement;

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part="base">
          <slot name="header"></slot>
          <main part="content">
            <slot></slot>
          </main>
          <slot name="footer"></slot>
        </div>
      </Host>
    );
  }
}
