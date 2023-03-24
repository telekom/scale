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
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { ScaleIcon, isScaleIcon } from '../../utils/utils';
import statusNote from '../../utils/status-note';

const PER_SPEC_ICON_SIZE = 16;

let i = 0;

@Component({
  tag: 'scale-tab-header',
  styleUrl: './tab-header.css',
  shadow: true,
})
export class TabHeader {
  generatedId: number = i++;

  @Element() hostElement: HTMLElement;

  /** True for a disabled Tabnavigation */
  @Prop() disabled?: boolean = false;
  /** True for smaller height and font size */
  /** @deprecated - size should replace small */
  @Prop() small?: boolean = false;
  /** (optional) size  */
  @Prop() size?: 'small' | 'large' = 'small';
  /** (optional) autoFocus  */
  @Prop() autoFocus?: boolean;
  /** (optional) Whether the tab is selected */
  @Prop() selected?: boolean;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @State() hasFocus: boolean = false;

  @Event({ eventName: 'scale-select' }) scaleSelect: EventEmitter;

  @Listen('click')
  handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.scaleSelect.emit();
  }

  @Watch('selected')
  selectedChanged(newValue: boolean) {
    if (!this.hostElement.isConnected) {
      return;
    }
    if (!this.disabled) {
      if (newValue === true) {
        // Having focus on the host element, and not on inner elements,
        // is required because screen readers.
        if (this.autoFocus) {
          this.hostElement.focus();
        }
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
    const icons: ScaleIcon[] = Array.from(this.hostElement.childNodes).filter(
      isScaleIcon
    );
    const action = this.selected ? 'setAttribute' : 'removeAttribute';
    icons.forEach((child) => child[action]('selected', ''));
  }

  /**
   * Set any children icon's size according the button size.
   */
  setChildrenIconSize() {
    const icons: ScaleIcon[] = Array.from(this.hostElement.childNodes).filter(
      isScaleIcon
    );
    icons.forEach((icon) => {
      // This is meh people might actually want 24
      if (icon.size !== PER_SPEC_ICON_SIZE) {
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
        <span part={this.getBasePartMap()} class={this.getCssClassMap()}>
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
      this.size === 'large' && `${prefix}large`,
      this.hasFocus && `${prefix}has-focus`,
      this.disabled && `${prefix}disabled`
    );
  }
}
