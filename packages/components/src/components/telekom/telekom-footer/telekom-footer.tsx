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

import { Component, h, Host, Element } from '@stencil/core';
import { HTMLStencilElement, Prop } from '@stencil/core/internal';
import cx from 'classnames';

@Component({
  tag: 'scale-telekom-footer',
  styleUrl: 'telekom-footer.css',
  shadow: false,
})
export class TelekomFooter {
  @Element() hostElement: HTMLStencilElement;
  @Prop({ reflect: true }) type: 'standard' | 'minimal' = 'standard';
  render() {
    return (
      <Host
        class={cx('scale-telekom-footer', {
          // slim: this.type === 'minimal',
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
