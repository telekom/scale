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
import cx from 'classnames';

@Component({
  tag: 'scale-badge',
  styleUrl: './badge.css',
  shadow: true,
})
export class Badge {
  @Element() hostElement: HTMLElement;
  @Prop() count: number;
  @Prop() label: string;
  @Prop() labelVisuallyHidden: boolean;
  /** a11y text for getting meaningful value. */
  @Prop() ariaLabelTranslation = '$label - $count item';

  formatter = new Intl.NumberFormat('en', {
    // @ts-ignore
    notation: 'compact',
  });

  getAriaLabel() {
    const filledText = this.ariaLabelTranslation
      .replace(/\$count/g, `${this.count}`)
      .replace(/\$label/g, `${this.label}`);
    return filledText;
  }

  render() {
    return (
      <Host>
        <span
          part="base"
          aria-label={this.count ? this.getAriaLabel() : this.label}
        >
          <slot />
          <slot name="dot" />
          <span
            aria-hidden="true"
            part={cx(`circle`, this.count ? `has-count` : 'no-count')}
          >
            {!this.count ? '' : this.formatter.format(this.count)}
          </span>
          <span aria-hidden="true" id="raw-count" part="visually-hidden">
            {this.count}
          </span>
        </span>
        <span
          id="label"
          part={cx('label', this.labelVisuallyHidden && 'visually-hidden')}
          aria-hidden="true"
        >
          {this.label}
        </span>
      </Host>
    );
  }
}
