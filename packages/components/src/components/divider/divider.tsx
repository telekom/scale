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
  tag: 'scale-divider',
  styleUrl: './divider.css',
  shadow: true,
})
export class Divider {
  /** (optional) Divider vertical */
  @Prop() vertical?: boolean = false;

  render() {
    return (
      <Host>
        <div
          class={this.getCssClassMap()}
          aria-hidden
          part={classNames('base', this.vertical && 'vertical')}
        >
          {!this.vertical ? (
            <hr class="divider__horizontal" part="rule-horizontal" />
          ) : (
            <span class="divider__vertical" part="rule-vertical" />
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('divider', this.vertical && `divider--vertical`);
  }
}
