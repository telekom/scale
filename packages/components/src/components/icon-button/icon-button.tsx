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

import { Component, Prop, h, Host, Element, Method } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-icon-button',
  styleUrl: 'icon-button.css',
  shadow: true,
})
export class IconButton {
  @Element() hostElement: HTMLElement;

  /** (optional) The size of the element */
  @Prop() size?: 'small' | 'medium' = 'medium';
  /** (optional) Button type */
  @Prop() type?: 'reset' | 'submit' | 'button';
  /** (optional) The name of the button, submitted as a pair with the button's `value` as part of the form data */
  @Prop() name?: string;
  /** (optional) Defines the value associated with the button's `name` */
  @Prop() value?: string;
  /** (optional) Name of a file to be downloaded */
  @Prop() download?: string;
  /** (optional) Set `tabindex` in the inner button or link element */
  @Prop() innerTabindex?: number;
  /** (optional) Set the element to active state  */
  @Prop() active?: boolean;

  private focusableElement: HTMLElement;

  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  render() {
    const basePart = classNames(
      'base',
      this.size && `size-${this.size}`,
      this.active && `active`
    );

    return (
      <Host>
        <button
          ref={(el) => (this.focusableElement = el)}
          type={this.type}
          part={basePart}
          tabIndex={this.innerTabindex}
          name={this.name}
          value={this.value}
          aria-pressed={this.active ? 'true' : 'false'}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
