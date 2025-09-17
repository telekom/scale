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

import { Component, Element, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-notification-badge',
  styleUrl: './notification-badge.css',
  shadow: true,
})
export class NotificationBadge {
  @Element() hostElement: HTMLElement;
  /** (optional) Text that is displayed in the badge */
  @Prop() label: number;
  /** (optional) Maximal number of characters displayed in the badge */
  @Prop() maxCharacters: number = 3;
  /** (optional) Setting/Slotcontent in which the badge is used */
  @Prop() type: 'icon' | 'text' | 'nav-icon' = 'icon';
  /** (optional) Handle click on the badge and surroundet slot elements */
  @Prop() clickHandler: any;

  getBadgeLabel() {
    if (this.label) {
      if (!isNaN(this.label)) {
        let labelNumber = '' + this.label;
        if (labelNumber.length > this.maxCharacters) {
          const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
          const tier = Math.floor(Math.log10(Number(this.label)) / 3) || 0;
          if (tier > 0) {
            const scaled = Number(this.label) / Math.pow(10, tier * 3);
            labelNumber = scaled.toFixed(1).replace('.0', '') + SI_SYMBOL[tier];
          }
        }
        return labelNumber;
      }
      return this.label;
    }
  }

  getRender() {
    return (
      <div class={this.getCssClassMap()}>
        <span class="notification-badge__wrapper">
          <slot />
          <span class="notification-badge__circle">{this.getBadgeLabel()}</span>
        </span>
        <slot name="after-badge"></slot>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.type !== 'nav-icon' ? (
          <div
            class="notification-badge-border"
            tabIndex={0}
            onClick={this.clickHandler}
          >
            {this.getRender()}
          </div>
        ) : (
          this.getRender()
        )}
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      `notification-badge`,
      this.label && `notification-badge--label`,
      this.type && `notification-badge--${this.type}`
    );
  }
}
