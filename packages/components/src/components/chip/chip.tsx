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
import { emitEvent } from '../../utils/utils';
@Component({
  tag: 'scale-chip',
  styleUrl: './chip.css',
  shadow: true,
})
export class Chip {
  /** (optional) chip type */
  @Prop() type?: 'standard' | 'strong' | 'inversed' | 'colored' = 'standard';
  /** (optional) */
  @Prop() selected?: boolean = false;
  /** (optional) chip color */
  @Prop() color?:
    | 'cyan'
    | 'yellow'
    | 'green'
    | 'orange'
    | 'red'
    | 'violet'
    | 'brown'
    | 'olive'
    | 'teal'
    | 'black'
    | 'grey';
  /** (optional) chip href */
  @Prop() href?: string = '';
  /** (optional) chip dismissible */
  @Prop() dismissible?: boolean = false;
  /** (optional) chip label */
  @Prop() label?: string;
  /** (optional) chip target */
  @Prop() target?: string = '_self';
  /** (optional) chip disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** (optional) Change icon click event */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' })
  scaleChangeLegacy: EventEmitter<MouseEvent>;
  /** (optional) Close icon click event */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<MouseEvent>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClose' })
  scaleCloseLegacy: EventEmitter<MouseEvent>;

  componentWillLoad() {
    if (this.dismissible) {
      this.selected = true;
    }
  }
  disconnectedCallback() {}

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scaleClose', event);
    console.log('close');
  };

  handleClick = (event: MouseEvent) => {
    if (this.dismissible) {
      this.handleClose(event);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scaleChange', event);
    console.log('change');
  };

  getIcon() {
    if (this.dismissible) {
      return <scale-icon-action-close accessibility-title="close" size={16} />;
    } else if (!this.dismissible) {
      return (
        <scale-icon-action-success accessibility-title="success" size={16} />
      );
    }
  }

  render() {
    const Element = !!this.href && !this.disabled ? 'a' : 'span';
    const linkProps = !!this.href
      ? {
          href: this.href,
          target: this.target,
        }
      : {};

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <Element
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          {...linkProps}
          onClick={this.handleClick}
        >
          <slot name="left-icon" />
          <p class="chip-label">{this.label}</p>
          {this.selected ? this.getIcon() : null}
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
    const component = 'chip';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      mode === 'basePart' ? 'base' : component,
      this.type && `${prefix}type-${this.type}`,
      this.color && `${prefix}color-${this.color}`,
      !!this.href && `${prefix}link`,
      !!this.disabled && `${prefix}disabled`
    );
  }
}
