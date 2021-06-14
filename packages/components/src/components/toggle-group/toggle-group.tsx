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
  Prop,
  h,
  Host,
  Element,
  State,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-toggle-group',
  styleUrl: 'toggle-group.css',
  shadow: true,
})
export class ToggleGroup {
  @Element() hostElement: HTMLElement;
  /** state */
  @State() status = [];
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
  /** (optional) more than one button selected possible */
  @Prop() multi: boolean = false;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** Emitted when button is clicked */
  @Event() scaleClick!: EventEmitter;

  @Listen('scaleClick')
  scaleCickHandler(ev) {
    const tempState = [...this.status];
    tempState.forEach((button) => {
      if (!ev.detail.selected) {
        if (button.id === ev.detail.id) {
          button.selected = false;
        }
      } else {
        if (this.multi) {
          if (button.id === ev.detail.id) { 
            button.selected = true;
          }
        } else {
          if (button.id === ev.detail.id) { 
            button.selected = true;
          } else {
            button.selected = false;
          }
        }
      }
    });
    // console.log('tempState', tempState)
  }

  componentDidLoad() {
    const tempState = [];
    const children = Array.from(this.hostElement.children);
    children.forEach((child) => {
      const button = child.shadowRoot.querySelector('button');
      tempState.push({
        id: button.getAttribute('id'),
        selected: child.hasAttribute('selected'),
      });
    });
    this.status = tempState;
    // console.log(this.status)
  }

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
