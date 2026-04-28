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
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

@Component({
  tag: 'scale-tag',
  styleUrl: './tag.css',
  shadow: true,
})
export class Tag {
  @Element() hostElement!: HTMLElement;

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

  /** (optional) Close icon click event */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<MouseEvent>;

  componentDidLoad() {
    this.initializeRovingTabindex();
  }

  componentWillUpdate() {}
  disconnectedCallback() {}

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    emitEvent(this, 'scale-close', event);
  };

  render() {
    const element = !!this.href && !this.disabled ? 'a' : 'span';
    const linkProps = !!this.href
      ? {
          href: this.href,
          target: this.target,
        }
      : {};

    return (
      <Host
        role="option"
        aria-selected="false"
        tabindex={0}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
      >
        {this.styles && <style>{this.styles}</style>}

        <element
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
              onClick={this.handleClose}
            >
              <scale-icon-action-close part="icon-dismissable" size={16} />
            </button>
          )}
        </element>
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

  private initializeRovingTabindex() {
    // Find all sibling scale-tag elements
    const siblings = this.getSiblingTags();
    if (siblings.length === 0) {
      return;
    }

    // Set first tag as focusable, others as not focusable
    siblings.forEach((tag, index) => {
      if (index === 0) {
        tag.setAttribute('tabindex', '0');
      } else {
        tag.setAttribute('tabindex', '-1');
      }
      // Set ARIA attributes for accessibility
      tag.setAttribute('role', 'option');
      tag.setAttribute('aria-selected', 'false');
    });
  }

  private getSiblingTags(): HTMLElement[] {
    if (!this.hostElement.parentElement) {
      return [];
    }

    const allTags = Array.from(
      this.hostElement.parentElement.querySelectorAll('scale-tag')
    ) as HTMLElement[];
    return allTags;
  }

  private updateRoving(newFocusedTag: HTMLElement) {
    const siblings = this.getSiblingTags();
    siblings.forEach((tag) => {
      if (tag === newFocusedTag) {
        tag.setAttribute('tabindex', '0');
      } else {
        tag.setAttribute('tabindex', '-1');
      }
    });
    // Focus the new tag
    newFocusedTag.focus();
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const keyCode = event.key;
    if (
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(keyCode)
    ) {
      return;
    }

    event.preventDefault();
    const siblings = this.getSiblingTags();
    const currentIndex = siblings.indexOf(this.hostElement);

    let nextIndex = currentIndex;

    if (keyCode === 'ArrowRight' || keyCode === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % siblings.length;
    } else if (keyCode === 'ArrowLeft' || keyCode === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + siblings.length) % siblings.length;
    }

    this.updateRoving(siblings[nextIndex]);
  };

  private handleFocus = (event: FocusEvent) => {
    const siblings = this.getSiblingTags();
    siblings.forEach((tag) => {
      if (tag === this.hostElement) {
        tag.setAttribute('tabindex', '0');
      } else {
        tag.setAttribute('tabindex', '-1');
      }
    });
  };
}
