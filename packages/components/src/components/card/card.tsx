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
  tag: 'scale-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class Card {
  /** (optional) Link card */
  @Prop() to?: string = '';
  /** (optional) Label of the card */
  @Prop() label?: string = '';
  /** (optional) Link card target */
  @Prop() target?: string = '_self';
  /** (optional) Link card rel */
  @Prop() rel?: string = '';
  /** (optional) Supports drag and drop */
  @Prop() movable?: boolean = false;

  render() {
    const Tag = !!this.to ? 'a' : 'div';

    return (
      <Host>
        <div part="border">
          <Tag
            part={classNames(
              'base',
              !!this.to && 'interactive',
              !!this.movable && 'movable'
            )}
            {...(!this.to ? { role: 'group' } : {})}
            {...(!!this.to ? { href: this.to } : {})}
            {...(!!this.target ? { target: this.target } : {})}
            {...(!!this.rel ? { rel: this.rel } : {})}
            {...(!!this.label ? { ['aria-label']: this.label } : {})}
          >
            <div part="body">
              <slot />
            </div>
          </Tag>
        </div>
      </Host>
    );
  }
}
