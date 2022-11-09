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

import { Component, h, Host, Listen, Element, Prop } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { readMaybeJSONData } from '../../../utils/utils';

@Component({
  tag: 'scale-telekom-header',
  styleUrl: 'telekom-header.css',
  shadow: true,
})
export class TelekomHeader {
  @Element() hostElement: HTMLStencilElement;

  @Prop() mainNavigation: any;
  @Prop() mainNavigationLabel: string = 'Main Navigation';

  @Listen('scale-telekom-main-nav-item-mouseenter')
  handleMouseEnter(event) {
    event.path[0].setAttribute('expanded', true);
  }
  @Listen('scale-telekom-main-nav-item-mouseleave')
  handleMouseLeave(event) {
    event.path[0].setAttribute('expanded', false);
  }
  @Listen('scale-telekom-main-nav-item-click')
  handleMouseClick(event) {
    const slot = this.hostElement.shadowRoot.querySelector(
      'slot[name="main-nav"]'
    ) as HTMLSlotElement;
    Array.from(slot.assignedElements()[0].children).forEach((child) => {
      child.setAttribute('current', 'false');
    });

    event.path[0].setAttribute('current', true);
  }

  handleSlotchange() {
    const slot = this.hostElement.shadowRoot.querySelector(
      'slot[name="main-nav"]'
    ) as HTMLSlotElement;
    const slottedUL = slot
      .assignedElements()
      .find(({ nodeName }) => nodeName === 'UL');
    slottedUL.setAttribute('role', 'menubar');
    slottedUL.setAttribute('aria-label', this.mainNavigationLabel);
  }

  render() {
    return (
      <Host>
        <header part="base">
          <scale-logo></scale-logo>
          <div part="portal-name">portalName</div>
        </header>
        <nav aria-label={this.mainNavigationLabel} part="main-nav">
          <slot name="main-nav" onSlotchange={() => this.handleSlotchange()}>
            <ul role="menubar" aria-label={this.mainNavigationLabel}>
              {readMaybeJSONData(this.mainNavigation).map(
                ({ name, href, children = [] }) => (
                  <scale-telekom-main-nav-item label={name} to={href}>
                    <ul slot="mega-menu">
                      {children.map((child) => (
                        <li role="none">
                          <a
                            role="menuitem"
                            aria-current="false"
                            href={child.href || 'javascript:void(0);'}
                          >
                            {child.name}
                            <span class="sr-only">active</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </scale-telekom-main-nav-item>
                )
              )}
            </ul>
          </slot>
        </nav>
      </Host>
    );
  }
}
