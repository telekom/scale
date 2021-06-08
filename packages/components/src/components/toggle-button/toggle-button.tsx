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
  tag: 'scale-toggle-button',
  styleUrl: 'toggle-button.css',
  shadow: true,
})
export class ToggleButton {
  @Element() hostElement: HTMLElement;
  /** (optional) The size of the button */
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'large';
  /** (optional) Button variant */
  @Prop() variant?: 'primary' | 'secondary' = 'primary';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the button is selected */
  @Prop() selected?: boolean = false;
  /** (optional) Button type */
  @Prop() iconOnly?: boolean = false;
  /** (optional) Icon position related to the label */
  @Prop({ reflect: true, mutable: true }) iconPosition: 'before' | 'after' =
    'before';
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  connectedCallback() {
    this.setIconPositionProp();
  }

  handleClick() {}

  /**
   * Detect whether the last node is an element (not text).
   * If so, it's probably an icon, so we set `iconPosition` to `after`.
   */
  setIconPositionProp() {
    const nodes = Array.from(this.hostElement.childNodes);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === 3 && nodes[i].nodeValue.trim() === '') {
        nodes.splice(i, 1);
      }
    }
    if (nodes.length < 2) {
      return;
    }
    const lastNode = nodes[nodes.length - 1];
    if (lastNode != null && lastNode.nodeType === 1) {
      this.iconPosition = 'after';
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <button
          class={this.getCssClassMap()}
          onClick={this.handleClick}
          disabled={this.disabled}
          type="button"
          aria-label={this.ariaLabel}
          part={this.getBasePartMap()}
        >
          <slot />
        </button>
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
    const prefix = mode === 'basePart' ? '' : 'toggle-button--';

    return classNames(
      'toggle-button',
      this.size && `${prefix}${this.size}`,
      this.variant && `${prefix}${this.variant}`,
      !this.iconOnly &&
        this.iconPosition &&
        `toggle-button--icon-${this.iconPosition}`,
      this.iconOnly && `${prefix}icon-only`
    );
  }
}
