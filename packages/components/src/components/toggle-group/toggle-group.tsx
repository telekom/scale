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

interface ButtonStatus {
  id: string;
  selected: boolean;
}

@Component({
  tag: 'scale-toggle-group',
  styleUrl: 'toggle-group.css',
  shadow: true,
})
export class ToggleGroup {
  @Element() hostElement: HTMLElement;
  /** state */
  @State() status: ButtonStatus[] = [];
  /** (optional) The size of the button */
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'large';
  /** (optional) Button Group variant */
  @Prop() variant?: 'primary' | 'secondary' = 'primary';
  /** (optional) inline or block element */
  @Prop() boxType?: 'inline' | 'block' = 'inline';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the group has a border */
  @Prop() border?: boolean = false;
  /** (optional) more than one button selected possible */
  @Prop() multi: boolean = true;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** Emitted when button is clicked */
  @Event() scaleClickGroup!: EventEmitter;

  @Listen('scaleClick')
  scaleClickHandler(ev) {
    let tempState: ButtonStatus[];
    if (this.multi) {
      tempState = this.status.map((obj) =>
        ev.detail.id === obj.id ? ev.detail : { ...obj }
      );
    } else {
      if (!ev.detail.selected) {
        tempState = this.status.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj }
        );
        /* clicked button has now selected state */
      } else {
        tempState = this.status.map((obj) =>
          ev.detail.id === obj.id ? ev.detail : { ...obj, selected: false }
        );
      }
    }
    this.setNewState(tempState);
  }

  componentDidLoad() {
    const tempState: ButtonStatus[] = [];
    const toggleButtons = Array.from(
      this.hostElement.querySelectorAll('scale-toggle-button')
    );
    toggleButtons.forEach((toggleButton) => {
      tempState.push({
        id: toggleButton.getAttribute('toggle-button-id'),
        selected: toggleButton.hasAttribute('selected'),
      });
      toggleButton.setAttribute('size', this.size);
      toggleButton.setAttribute('variant', this.variant);
      toggleButton.setAttribute('disabled', this.disabled && 'disabled');
    });
    this.status = tempState;
  }

  componentDidRender() {
    if (this.boxType === 'block') {
      this.setButtonWidth();
    }
    this.setChildrenCorners();
  }

  setNewState(tempState: ButtonStatus[]) {
    const toggleButtons = Array.from(
      this.hostElement.querySelectorAll('scale-toggle-button')
    );
    toggleButtons.forEach((button, i) => {
      button.setAttribute('selected', tempState[i].selected ? 'true' : 'false');
    });
    this.status = tempState;
    this.scaleClickGroup.emit(this.status);
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
      this.boxType && `${prefix}${this.boxType}`,
      this.border && `${prefix}border`
    );
  }
}
