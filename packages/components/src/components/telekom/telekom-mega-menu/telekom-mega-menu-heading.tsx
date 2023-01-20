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

import { Component, h, Host, Element, Prop } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-mega-menu-heading',
  styleUrl: 'telekom-mega-menu-heading.css',
  shadow: true,
})
export class TelekomMegaMenuHeading {
  @Element() hostElement: HTMLStencilElement;

  @Prop() href: string; 

  render() {
    return (
      <Host>
        <h2 part="base">
            { this.href ?
              <a href={this.href} part="link">
                <div part="custom-icon">
                  <slot name="custom-icon"></slot>
                </div>
                <slot></slot>
                <scale-icon-navigation-right
                  size={10}
                  selected
                  part="scale-icon-navigation-right"
                />
              </a>
            :
            <div part="heading">
              <div part="custom-icon">
                <slot name="custom-icon"></slot>
              </div>
              <slot></slot>
              <scale-icon-navigation-right
                size={10}
                selected
                part="scale-icon-navigation-right"
              />  
            </div>
            }
        </h2>
      </Host>
    );
  }
}
