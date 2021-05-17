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

import { Component, h, Prop, Host } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-link',
  styleUrl: './link.css',
  shadow: true,
})
export class Link {
  /** (optional) Link href */
  @Prop() href: string;
  /** (optional) Disabled link */
  @Prop() disabled?: boolean = false;
  /** (optional) Block link */
  @Prop() block?: boolean = false;
  /** (optional) Link underline */
  // @Prop() underline?: boolean = true;
  /** (optional) Link open a new tag */
  @Prop() target?: string = '_self';
  /** (optional) Link variant */
  @Prop() variant?: string = '';

  render() {
    return (
      <Host>
        <a
          class={this.getCssClassMap()}
          part={classNames('base', this.disabled && 'disabled')}
          href={this.disabled ? 'javascript:void(0)' : this.href}
          {...(!this.disabled ? { target: this.target } : {})}
          aria-disabled={this.disabled}
        >
          <span class="link__wrapper" part="wrapper">
            <slot />
            <slot name="icon" />
          </span>
        </a>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'link',
      this.disabled && 'link--disabled',
      this.block && 'link--block'
    );
  }
}
