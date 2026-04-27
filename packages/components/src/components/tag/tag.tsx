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

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
@Component({
  tag: 'scale-tag',
  styleUrl: './tag.css',
  shadow: true,
})
export class Tag {
  @Element() hostElement: HTMLElement;
  /** (optional) Tag size */
  @Prop() size?: 'small';
  /** (optional) Tag type */
  @Prop() type?: 'standard' | 'strong' = 'standard';
  /** (optional) Tag color */
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
    | 'dismissable'
    | 'standard' = 'standard';
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
  @State() accessibleText: string = '';

  /** (optional) Close icon click event */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<MouseEvent>;

  componentWillLoad() {
    this.syncAccessibleText();
  }

  componentWillUpdate() {}
  disconnectedCallback() {}

  syncAccessibleText(slot?: HTMLSlotElement) {
    const nodes = slot?.assignedNodes({ flatten: true }) || [
      ...this.hostElement.childNodes,
    ];
    const accessibleText = nodes
      .map((node) => node.textContent || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (accessibleText !== this.accessibleText) {
      this.accessibleText = accessibleText;
    }
  }

  handleSlotChange = (event: Event) => {
    this.syncAccessibleText(event.target as HTMLSlotElement);
  };

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scale-close', event);
  };

  render() {
    const isReadOnly = !this.href && !this.dismissable;
    const Element = !!this.href && !this.disabled ? 'a' : 'span';
    const linkProps = !!this.href
      ? {
          href: this.href,
          target: this.target,
        }
      : {};

    return (
      <Host
        role={isReadOnly ? 'text' : null}
        aria-label={
          isReadOnly && this.accessibleText ? this.accessibleText : null
        }
      >
        {this.styles && <style>{this.styles}</style>}

        <Element
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          {...linkProps}
        >
          <slot onSlotchange={this.handleSlotChange} />

          {this.dismissable && (
            <button
              part="button-dismissable"
              disabled={this.disabled}
              aria-label={this.dismissText}
              onClick={this.handleClose}
            >
              <scale-icon-action-close part="icon-dismissable" size={16} />
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
      this.type && `${prefix}type-${this.type}`,
      this.color && `${prefix}color-${this.color}`,
      !!this.href && `${prefix}link`,
      !!this.dismissable && `${prefix}dismissable`,
      !!this.disabled && `${prefix}disabled`
    );
  }
}
