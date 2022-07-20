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

import { Component, h, Prop, Host, Watch, State, Element } from '@stencil/core';
import classNames from 'classnames';
import { ScaleIcon, isScaleIcon } from '../../utils/utils';
import statusNote from '../../utils/status-note';

const DEFAULT_ICON_SIZE = 24;
const PER_SPEC_ICON_SIZE = 16;

let i = 0;

@Component({
  tag: 'scale-tab-header',
  styleUrl: './tab-header.css',
  shadow: true,
})
export class TabHeader {
  generatedId: number = i++;
  container: HTMLElement;

  @Element() hostElement: HTMLElement;

  /** True for a disabled Tabnavigation */
  @Prop() disabled?: boolean = false;
  /** True for smaller height and font size */
  /** @deprecated - css overwrites should replace small */
  @Prop() small?: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @Prop() selected: boolean;

  @State() hasFocus: boolean = false;

  @Watch('selected')
  selectedChanged(newValue: boolean) {
    if (!this.disabled) {
      if (newValue === true) {
        // Having focus on the host element, and not on inner elements,
        // is required because screen readers.
        this.hostElement.focus();
      }
      this.updateSlottedIcon();
    }
  }

  componentDidLoad() {
    this.setChildrenIconSize();
  }

  componentDidRender() {
    if (this.small !== false) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "small" is deprecated. Please use css overwrites.',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  /**
   * Find slotted icons, and if any, add the `selected` attribute accordingly.
   */
  updateSlottedIcon() {
    const slot = this.container.querySelector('slot') as HTMLSlotElement;
    if (slot === null) {
      return;
    }
    const children = Array.from(slot.assignedNodes())
      .filter((node) => node.nodeType === 1)
      .filter((node) => node.nodeName.toUpperCase().indexOf('ICON') > -1);
    if (children.length === 0) {
      return;
    }
    const action = this.selected ? 'setAttribute' : 'removeAttribute';
    children.forEach((child) => child[action]('selected', ''));
  }

  /**
   * Set any children icon's size according the button size.
   */
  setChildrenIconSize() {
    const icons: ScaleIcon[] = Array.from(this.hostElement.children).filter(
      isScaleIcon
    );
    icons.forEach((icon) => {
      // This is meh people might actually want 24
      if (icon.size === DEFAULT_ICON_SIZE) {
        icon.size = PER_SPEC_ICON_SIZE;
      }
    });
  }

  render() {
    return (
      <Host
        id={`scale-tab-header-${this.generatedId}`}
        role={this.disabled ? false : 'tab'}
        aria-selected={this.selected ? 'true' : 'false'}
        tabindex={this.disabled ? false : this.selected ? '0' : '-1'}
        onFocus={() => (this.hasFocus = true)}
        onBlur={() => (this.hasFocus = false)}
      >
        {this.styles && <style>{this.styles}</style>}

        <span
          part={this.getBasePartMap()}
          ref={(el) => (this.container = el)}
          class={this.getCssClassMap()}
        >
          <slot />
        </span>
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
    const component = 'tab-header';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.selected && `${prefix}selected`,
      this.hasFocus && `${prefix}has-focus`,
      this.disabled && `${prefix}disabled`
    );
  }
}
