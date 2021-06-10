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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-toggle-group',
  styleUrl: 'toggle-group.css',
  shadow: true,
})
export class ToggleGroup {
  @Element() hostElement: HTMLElement;
  /** (optional) The size of the button */
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'large';
  /** (optional) Button variant */
  @Prop() variant?: 'inline' | 'block' = 'inline';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the group has a border */
  @Prop() border?: boolean = true;
  /** (optional) set the border-radius left, right or both */
  @Prop() radius: 'left' | 'right' | 'both' | null = null;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /* connectedCallback() {
    if (this.variant === 'block') {
      this.setButtonWidth();
    }
  } */

  componentDidLoad() {}

  componentDidRender() {
    if (this.variant === 'block') {
      this.setButtonWidth();
    }
    this.setChildrenCorners();
  }

  setButtonWidth() {
    Array.from(this.hostElement.children).forEach((child) => {
      const button = child.shadowRoot.querySelector('button');
      button.style.width = '100%';
    });
  }

  setChildrenCorners() {
    const children = Array.from(this.hostElement.children);
    for (let i = 0; i < children.length; i++) {
      if (i === 0) {
        children[i].setAttribute('radius', 'left');
      }
      if (i === children.length - 1) {
        children[i].setAttribute('radius', 'right');
      }
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()} part={this.getBasePartMap()}>
          <slot />
        </div>
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
    const prefix = mode === 'basePart' ? '' : 'toggle-group--';

    return classNames(
      'toggle-group',
      this.variant && `${prefix}${this.variant}`,
      this.border && `${prefix}border`
    );
  }
}
