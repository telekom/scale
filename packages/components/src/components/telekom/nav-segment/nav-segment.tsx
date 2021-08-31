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

import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-nav-segment',
  styleUrl: './nav-segment.css',
})
export class NavSegment {
  /** (optional) if this item is active */
  // DEPRECATED - active should replace isActive
  @Prop() isActive: boolean;
  @Prop() active: boolean;
  /** (optional) href value */
  @Prop() href?: string = 'javascript:void(0);';

  render() {
    return (
      <li class={this.getCssClassMap()}>
        <a
          class={classNames(
            'segment-navigation__item-link',
            (this.active || this.isActive) && 'active'
          )}
          href={this.href}
          onFocus={() => {
            window.scrollTo({ top: 0 });
          }}
          aria-current={this.active || this.isActive ? 'true' : 'false'}
        >
          <slot></slot>
          {(this.active || this.isActive) && (
            <span class="sr-only">active</span>
          )}
        </a>
      </li>
    );
  }

  getCssClassMap() {
    return classNames('segment-navigation__item');
  }
}
