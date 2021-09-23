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

export interface AnchorAttributesInterface {
  hreflang?: string;
  ping?: string;
  referrerpolicy?: ReferrerPolicy;
  rel?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  type?: string;
}
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
  /** (optional) Remove the initial line from the text (can also be achieved via `--line-thickness-initial: 0`)
   * Remove the line for every state with `--line-thickness: 0`
   */
  @Prop() omitUnderline?: boolean = false;
  /** (optional) Chnage icon/content slot order */
  @Prop() iconPosition?: 'before' | 'after' = 'after';
  /** (optional) attatch additional anchor tag attributes (`hreflang`, `ping`, `referrerpolicy`, `rel`, `type`) */
  @Prop() anchorAttributes?: AnchorAttributesInterface;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  renderSlots() {
    const slots = [
      <div part="content">
        <slot />
        <div part="line"></div>
      </div>,
      <slot name="icon" />,
    ];

    // if (this.iconPosition === 'before') slots.reverse();

    return slots;
  }

  getAnchorProps() {
    const props = {
      download: this.download || null,
      tabIndex: this.disabled ? -1 : null,
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
          reverse: this.iconPosition === 'before',
        }}
      >
        {this.omitUnderline && (
          <style>{`
            :host{
              --line-thickness-initial: 0;
            }
        `}</style>
        )}
        {this.styles && <style>{this.styles}</style>}
        <a part="anchor" {...this.getAnchorProps()}>
          {this.renderSlots()}
        </a>
      </Host>
    );
  }
}
