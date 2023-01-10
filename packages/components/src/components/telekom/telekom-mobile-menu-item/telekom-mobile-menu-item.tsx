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

import { Component, h, Host, Element, Prop, State, Event } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import cx from 'classnames';
import { emitEvent } from '../../../utils/utils';

@Component({
  tag: 'scale-telekom-mobile-menu-item',
  styleUrl: 'telekom-mobile-menu-item.css',
  shadow: true,
})
export class TelekomMobileMenuItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop() open?: boolean = false;
  @Prop() hideHeader?: boolean = false;
  @Prop() active?: boolean = false;
  @Prop() level?: string = '0';

  @State() hasChildren?: boolean = false;

  @Event({ eventName: 'scale-click-menu-item' }) scaleClickMenuItem;

  componentWillRender() {
    this.hasChildren = !!this.hostElement.querySelector('[slot="children"]');
  }

  render() {
    return (
      <Host
        onClick={(e) => {
          e.stopImmediatePropagation();
          emitEvent(this, 'scaleClickMenuItem', e.detail);
        }}
      >
        <nav
          part={cx('base', `level-${this.level}`, {
            open: this.open,
            active: !this.open && this.active,
          })}
        >
          <div
            part={cx('header', {
              hidden: this.hideHeader,
            })}
          >
            <div part={cx('icon-left-container', {})}>
              {this.open && (
                <scale-icon-navigation-left></scale-icon-navigation-left>
              )}
            </div>

            <slot></slot>
            <div part="icon-right-container">
              {this.hasChildren && !this.open && (
                <scale-icon-navigation-right></scale-icon-navigation-right>
              )}
            </div>
          </div>
          {<slot name="children"></slot>}
        </nav>
      </Host>
    );
  }
}
