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

import { Component, h, Prop, Host, Watch, Element } from '@stencil/core';
import classNames from 'classnames';

const SR_ACTIVE_TEXT = ' Zurzeit aktiv';

const isActive = (current) => {
  try {
    return !!JSON.parse(current);
  } catch (e) {
    if (typeof current === 'string') {
      return true;
    }
    return !!current;
  }
};

const getScreenReaderText = (current) => {
  let text;
  try {
    text = JSON.parse(current);
  } catch (e) {
    text = current;
  }

  return typeof text === 'string' && text.length > 0
    ? ` ${text}`
    : SR_ACTIVE_TEXT;
};

@Component({
  tag: 'scale-sidebar-nav-item',
  styleUrl: 'sidebar-nav-item.css',
  shadow: true,
})
export class SidebarNavItem {
  srOnlyElement: HTMLElement;

  @Element() el: HTMLElement;

  /** Used normally for third level items, remove the bottom border */
  @Prop() condensed: boolean = false;
  /** Bold text */
  @Prop() bold: boolean = false;
  /** Text gets the active color */
  @Prop({ mutable: true, reflect: true }) active: boolean = false;
  /**
   * Mark the child link as "current" with `aria-current=page`.
   * Provide the text hint if needed, default is: "Zurzeit aktiv"
   */
  @Prop() current: string | null | boolean = null;
  /** Nesting level within the <scale-sidebar-nav> parent, gets set automatically */
  @Prop() nestingLevel: number;
  /** (optional) Extra styles */
  @Prop() styles?: string;

  @Watch('nestingLevel')
  nestingLevelChanged(newValue: number) {
    if (newValue === 1) {
      this.bold = true;
    }
  }

  @Watch('current')
  currentChanged(newValue) {
    this.handleAriaCurrentInSlottedA(newValue);
    this.syncActiveToCurrent(newValue);
  }

  componentDidLoad() {
    this.handleAriaCurrentInSlottedA(this.current);
    if (this.current) {
      this.syncActiveToCurrent(this.current);
    }
  }

  /**
   * If an item is `current`, it should be `active` as well
   */
  syncActiveToCurrent(newValue) {
    this.active = isActive(newValue);
  }

  /**
   * When `current` is set, this will:
   * - set the aria-current=page attribute on the link
   * - append a text-only hint for screen readers
   * so we end up with something like this:
   * <a href="..." aria-current="page">
   *    Example<span style="...visible to SR only..."> Active link</span>
   * </a>
   * @param current this.current
   */
  handleAriaCurrentInSlottedA(current) {
    const a = this.el.querySelector('a');

    if (this.srOnlyElement != null) {
      a.removeChild(this.srOnlyElement);
      this.srOnlyElement = null;
    }
    if (a != null) {
      a.removeAttribute('aria-current');
    }
    if (isActive(current) && a != null) {
      this.srOnlyElement = this.createScreenReaderOnlySpan();
      a.appendChild(this.srOnlyElement);
      a.setAttribute('aria-current', 'page');
    }
  }

  createScreenReaderOnlySpan() {
    const text = getScreenReaderText(this.current);
    const span = document.createElement('span');
    // .sr-only but inline
    Object.assign(span.style, {
      position: 'absolute',
      left: '-10000px',
      overflow: 'hidden',
    });
    span.textContent = text;

    return span;
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <li
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          role="listitem"
        >
          <slot />
        </li>
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
    const component = 'sidebar-nav-item';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.bold && `${prefix}bold`,
      this.condensed && `${prefix}condensed`,
      this.active && `${prefix}active`
    );
  }
}
