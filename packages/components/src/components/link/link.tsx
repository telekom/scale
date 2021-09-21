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
  /** (optional) Download declaration */
  @Prop() download?: boolean = false;
  /** (optional) Block link */
  @Prop() block?: boolean = false;
  /** (optional) Link open a new tag */
  @Prop() target?: string;
  /** (optional) Remove the `text-decoration` from the text (can also be achieved via `--text-decoration: none`)  */
  @Prop() omitUnderline?: boolean = false;
  /** (optional) Chnage icon/content slot order */
  @Prop() iconPosition: 'before' | 'after' = 'after';
  /** (optional) attatch additional anchor tag attributes (`hreflang`, `ping`, `referrerpolicy`, `rel`, `type`) */
  @Prop() anchorAttributes;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  renderSlots() {
    const slots = [<slot />, <slot name="icon" />];

    // if (this.iconPosition === 'before') slots.reverse();

    return slots;
  }

  getAnchorProps() {
    const props = {
      download: this.download || null,
      tabIndex: this.disabled ? -1 : null,
      target: this.target || null,
      href: this.href || null,
      'aria-disabled': this.disabled,
    };
    return { ...props, ...this.anchorAttributes };
  }

  render() {
    return (
      <Host
        class={{
          disabled: this.disabled,
          block: this.block,
          // underlined: !this.omitUnderline,
          reverse: this.iconPosition === 'before',
        }}
      >
        {this.omitUnderline && (
          <style>{`
            :host{
              --text-decoration: none;
            }
        `}</style>
        )}
        {this.styles && <style>{this.styles}</style>}
        <a part="anchor" {...this.getAnchorProps()}>
          <span part="wrapper">{this.renderSlots()}</span>
        </a>
      </Host>
    );
  }
}
