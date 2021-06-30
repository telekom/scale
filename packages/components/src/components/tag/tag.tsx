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

import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
@Component({
  tag: 'scale-tag',
  styleUrl: './tag.css',
  shadow: true,
})
export class Tag {
  /** (optional) Tag size */
  @Prop() size?: 'small';
  /** (optional) Tag variant */
  @Prop() variant?: 'secondary';
  /** (optional) Tag href */
  @Prop() href?: string = '';
  /** (optional) Tag target */
  @Prop() target?: string = '_self';
  /** (optional) Tag dismissable */
  @Prop() dismissable?: boolean = false;
  /** (optional) Tag disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) Dismiss label */
  @Prop() dismissText?: string = 'dismiss';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optional) Close icon click event */
  @Event() scaleClose: EventEmitter<MouseEvent>;

  componentWillUpdate() {}
  disconnectedCallback() {}

  handleClose(event) {
    event.preventDefault();
    event.stopPropagation();
    this.scaleClose.emit(event);
  }

  render() {
    const Element = !!this.href && !this.disabled ? 'a' : 'span';
    const linkProps = !!this.href
      ? {
          href: this.href,
          target: this.target,
        }
      : {};
    const iconProps = !this.disabled
      ? {
          onClick: (event) => this.handleClose(event),
        }
      : {};

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <Element
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          {...linkProps}
        >
          <slot />

          {this.dismissable && (
            <button
              part="button-dismissable"
              disabled={this.disabled}
              aria-label={this.dismissText}
            >
              <scale-icon-action-close
                part="icon-dismissable"
                size={this.size === 'small' ? 20 : 24}
                {...iconProps}
              />
            </button>
          )}
        </Element>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'tag';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      mode === 'basePart' ? 'base' : component,
      this.size && `${prefix}size-${this.size}`,
      this.variant && `${prefix}variant-${this.variant}`,
      !!this.href && `${prefix}link`,
      !!this.dismissable && `${prefix}dismissable`,
      !!this.disabled && `${prefix}disabled`
    );
  }
}
