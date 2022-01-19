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
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
import statusNote from '../../utils/status-note';

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
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'regular';
  /** (optional) Button Group background */
  @Prop() background?: 'grey' | 'white' = 'white';
  /** (optional) 100% width */
  @Prop() fullWidth? = false;
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the group has a border */
  @Prop() hideBorder?: boolean = false;
  /** (optional) more than one button selected possible */
  @Prop() singleSelect: boolean = false;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop()
  ariaLabelTranslation = `toggle button group with $slottedButtons buttons`;
  /** @deprecated - variant should replace colorScheme */
  @Prop() colorScheme?: 'monochrome' | 'color' = 'color';
  /** (optional) background variant of a selected toggle-button */
  @Prop() variant?: 'monochrome' | 'color' = 'color';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** Emitted when button is clicked */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter;

  @Listen('scaleClick')
  scaleClickHandler(ev: { detail: { id: string; selected: boolean } }) {
    let tempState: ButtonStatus[];
    if (this.singleSelect) {
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
      tempState = this.status.map((obj) =>
        ev.detail.id === obj.id ? ev.detail : { ...obj }
      );
    }
    this.setNewState(tempState);
  }

  @Watch('background')
  @Watch('disabled')
  @Watch('hideBorder')
  @Watch('size')
  @Watch('variant')
  handlePropsChange() {
    this.propagatePropsToChildren();
  }

  componentDidLoad() {
    const tempState: ButtonStatus[] = [];
    const toggleButtons = this.getAllToggleButtons();
    this.slottedButtons = toggleButtons.length;
    toggleButtons.forEach((toggleButton) => {
      this.position++;
      tempState.push({
        id: toggleButton.getAttribute('toggle-button-id'),
        selected: toggleButton.hasAttribute('selected'),
      });
      toggleButton.setAttribute('position', this.position.toString());
      toggleButton.setAttribute(
        'aria-description-translation',
        '$position $selected'
      );
    });
    this.propagatePropsToChildren();
    this.position = 0;
    this.status = tempState;
  }

  getAllToggleButtons() {
    return Array.from(this.hostElement.querySelectorAll('scale-toggle-button'));
  }

  /**
   * Keep props, needed in children buttons, in sync
   */
  propagatePropsToChildren() {
    this.getAllToggleButtons().forEach((el) => {
      el.setAttribute('size', this.size);
      el.setAttribute('background', this.background);
      el.setAttribute('disabled', this.disabled && 'disabled');
      /** DEPRECATED */
      // if attribute variant is set it overrides color-scheme
      el.setAttribute(
        'color-scheme',
        this.variant !== 'color' ? this.variant : this.colorScheme
      );
      // if attribute color-scheme is set it overrides variant
      el.setAttribute(
        'variant',
        this.colorScheme !== 'color' ? this.colorScheme : this.variant
      );
      el.setAttribute('hide-border', this.hideBorder ? 'true' : 'false');
    });
  }

  getAriaLabelTranslation() {
    const filledText = this.ariaLabelTranslation.replace(
      /\$slottedButtons/g,
      `${this.slottedButtons}`
    );
    return filledText;
  }

  componentDidRender() {
    if (this.fullWidth) {
      this.setButtonWidth();
    }
    this.setChildrenCorners();

    if (this.colorScheme !== 'color') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "colorScheme" is deprecated. Please use the "variant" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  setNewState(tempState: ButtonStatus[]) {
    const toggleButtons = Array.from(
      this.hostElement.querySelectorAll('scale-toggle-button')
    );
    toggleButtons.forEach((button, i) => {
      button.setAttribute('selected', tempState[i].selected ? 'true' : 'false');
    });
    this.status = tempState;
    emitEvent(this, 'scaleChange', this.status);
  }

  setButtonWidth() {
    Array.from(this.hostElement.children).forEach((child) => {
      const button = child.shadowRoot.querySelector('button');
      button.style.width = '100%';
    });
  }

  setChildrenCorners() {
    const children = Array.from(this.hostElement.children);

    if (children.length === 1) {
      // set four border radius when there is only one child
      children[0].setAttribute('radius', 'all');
    } else {
      for (let i = 0; i < children.length; i++) {
        if (i === 0) {
          children[i].setAttribute('radius', 'left');
        }
        if (i > 0 && i < children.length - 1) {
          children[i].setAttribute('radius', 'neither');
        }
        if (i === children.length - 1) {
          children[i].setAttribute('radius', 'right');
        }
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
      this.fullWidth && `${prefix}block`,
      !this.fullWidth && `${prefix}inline`,
      this.disabled && `${prefix}disabled`
    );
  }
}
