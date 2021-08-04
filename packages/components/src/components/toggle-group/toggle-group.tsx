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
  /** toggle button position within group */
  position = 0;
  /** number of slotted toggle-buttons */
  slottedButtons = 0;

  @Element() hostElement: HTMLElement;
  /** state */
  @State() status: ButtonStatus[] = [];
  /** (optional) The size of the button */
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'large';
  /** (optional) Button Group variant */
  @Prop() variant?: 'grey-background' | 'white-background' = 'grey-background';
  /** (optional) inline or block element */
  @Prop() boxType?: 'inline' | 'block' = 'inline';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the group has a border */
  @Prop() border?: boolean = false;
  /** (optional) more than one button selected possible */
  @Prop() singleSelect: boolean = false;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop()
  ariaLabelTranslation = `toggle button group with $slottedButtons buttons`;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** Emitted when button is clicked */
  @Event() scaleClickGroup!: EventEmitter;

  @Listen('scaleClick')
  scaleClickHandler(ev) {
    let tempState: ButtonStatus[];
    if (this.singleSelect) {
      console.log('singleSelect');
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
    } else { 
      console.log('non singleSelect');
      tempState = this.status.map((obj) =>
        ev.detail.id === obj.id ? ev.detail : { ...obj }
      );
    }
    this.setNewState(tempState);
  }

  componentDidLoad() {
    const tempState: ButtonStatus[] = [];
    const toggleButtons = Array.from(
      this.hostElement.querySelectorAll('scale-toggle-button')
    );
    this.slottedButtons = toggleButtons.length;
    toggleButtons.forEach((toggleButton) => {
      this.position++;
      tempState.push({
        id: toggleButton.getAttribute('toggle-button-id'),
        selected: toggleButton.hasAttribute('selected'),
      });
      toggleButton.setAttribute('size', this.size);
      toggleButton.setAttribute('variant', this.variant);
      toggleButton.setAttribute('disabled', this.disabled && 'disabled');
      toggleButton.setAttribute('position', this.position.toString());
      toggleButton.setAttribute(
        'aria-description-translation',
        '$position $selected'
      );
    });
    this.position = 0;
    this.status = tempState;
  }

  getAriaLabelTranslation() {
    const filledText = this.ariaLabelTranslation.replace(
      /\$slottedButtons/g,
      `${this.slottedButtons}`
    );
    return filledText;
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
        <div
          class={this.getCssClassMap()}
          part={this.getBasePartMap()}
          aria-label={this.getAriaLabelTranslation()}
          role="group"
        >
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
