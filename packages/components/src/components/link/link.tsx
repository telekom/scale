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

import { Component, h, Prop, Host, Method } from '@stencil/core';

/**
 * This is a superset of the default anchor `<a>` element.
 * @part anchor - the native achor element wrapping all contents
 * @part content - a wrapper around the default slot with the underline
 *
 * @slot default - here goes the actual text of the
 * @slot icon - a slot that will not be underlined and which position can be changed
 */
@Component({
  tag: 'scale-link',
  styleUrl: './link.css',
  shadow: true,
})
export class Link {
  /** (optional) Disabled link */
  @Prop() disabled?: boolean = false;
  /** (optional) Remove the initial line from the text (can also be achieved via `--line-thickness-initial: 0`)
   * Remove the line for every state with `--line-thickness: 0`
   */
  @Prop() omitUnderline?: boolean = false;
  /** (optional) Link href */
  @Prop() href: string;
  /** (optional) Download declaration */
  @Prop() download?: string;
  /** (optional) Chnage icon/content slot order */
  @Prop() iconPosition?: 'before' | 'after' = 'after';
  /** (optional) */
  @Prop() hreflang?: string;
  /** (optional) */
  @Prop() ping?: string;
  /** (optional) */
  @Prop() referrerpolicy?: ReferrerPolicy;
  /** (optional) */
  @Prop() rel?: string;
  /** (optional) */
  @Prop() target?: '_self' | '_blank' | '_parent' | '_top';
  /** (optional) */
  @Prop() type?: string;
  /** (optional) Set `tabindex` in the inner button or link element */
  @Prop() innerTabindex?: number;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  private focusableElement: HTMLElement;

  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  getAnchorProps() {
    const props = {
      href: this.href || null,
      tabIndex: this.disabled ? -1 : this.innerTabindex,
      'aria-disabled': `${this.disabled}`,
      download: this.download || null,
      hreflang: this.hreflang || null,
      ping: this.ping || null,
      referrerpolicy: this.referrerpolicy || null,
      rel: this.rel || null,
      target: this.target || null,
      type: this.type || null,
    };
    return { ...props };
  }

  render() {
    return (
      <Host
        class={{
          disabled: this.disabled,
          reverse: this.iconPosition === 'before',
          'no-underline': this.omitUnderline,
        }}
      >
        {this.styles && <style>{this.styles}</style>}
        <a
          part="anchor"
          ref={(el) => (this.focusableElement = el)}
          {...this.getAnchorProps()}
        >
          <div part="content">
            <slot />
          </div>
          <slot name="icon" />
        </a>
      </Host>
    );
  }
}
