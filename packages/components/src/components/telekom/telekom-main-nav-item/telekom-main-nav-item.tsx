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
  Prop,
  Event,
  // @ts-ignore
  EventEmitter,
  Element,
  State,
} from '@stencil/core';
import { emitEvent } from '../../../utils/utils';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'scale-telekom-main-nav-item',
  styleUrl: 'telekom-main-nav-item.css',
  shadow: true,
})
export class TelekomMainNavItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop() expanded?: boolean;
  @Prop() current?: boolean;
  @Prop() to?: string = 'javascript:void(0);';
  @Prop() label: string;

  @State() hasPopup = false;

  @Event({
    eventName: 'scale-telekom-main-nav-item-mouseenter',
  })
  scaleTelekomMainNavItemMouseEnter: EventEmitter;
  @Event({ eventName: 'scale-telekom-main-nav-item-mouseleave' })
  scaleTelekomMainNavItemMouseLeave: EventEmitter;
  @Event({ eventName: 'scale-telekom-main-nav-item-click' })
  scaleTelekomMainNavItemClick: EventEmitter;
  @Event({ eventName: 'scale-telekom-main-nav-item-focus' })
  scaleTelekomMainNavItemFocus: EventEmitter;

  handleSlotchange() {
    const slot = this.hostElement.shadowRoot.querySelector(
      'slot[name="mega-menu"]'
    ) as HTMLSlotElement;
    this.hasPopup = !!slot.assignedNodes().length;
    const slottedUL = slot
      .assignedElements()
      .find(({ nodeName }) => nodeName === 'UL');
    slottedUL.setAttribute('role', 'menu');
    slottedUL.setAttribute('aria-label', this.label);
  }

  render() {
    return (
      <Host>
        <li
          role="none"
          part="base"
          onMouseEnter={() => {
            emitEvent(this, 'scaleTelekomMainNavItemMouseEnter', event);
          }}
          onMouseLeave={(event) => {
            emitEvent(this, 'scaleTelekomMainNavItemMouseLeave', event);
          }}
        >
          <a
            part="link"
            role="menuitem"
            aria-haspopup={this.hasPopup ? 'true' : 'false'}
            aria-expanded={this.hasPopup && this.expanded ? 'true' : 'false'}
            aria-current={this.current ? 'true' : 'false'}
            href={this.to}
            onClick={(event) => {
              emitEvent(this, 'scaleTelekomMainNavItemClick', event);
            }}
            onFocus={(event) => {
              emitEvent(this, 'scaleTelekomMainNavItemFocus', event);
            }}
          >
            <span class="sr-only">active</span>
            {this.label}
          </a>
          <slot
            name="mega-menu"
            onSlotchange={() => this.handleSlotchange()}
          ></slot>
        </li>
      </Host>
    );
  }
}
