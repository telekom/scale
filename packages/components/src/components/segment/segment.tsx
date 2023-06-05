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
  Event,
  EventEmitter,
  Method,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
import { ScaleIcon, isScaleIcon } from '../../utils/utils';

let i = 0;

const iconSizeMap = {
  small: 14,
  medium: 16,
  large: 16,
};

@Component({
  tag: 'scale-segment',
  styleUrl: 'segment.css',
  shadow: true,
})
export class Segment {
  @Element() hostElement: HTMLElement;
  /** (optional) The size of the button */
  @Prop() size?: 'small' | 'medium' | 'large' = 'small';
  /** (optional) If `true`, the button is selected */
  @Prop({ mutable: true }) selected?: boolean = false;
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) segment's id */
  @Prop({ reflect: true, mutable: true }) segmentId?: string;
  /** (optional) Button width set to ensure that all buttons have the same width */
  @Prop() width?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  // /** (optional)  */
  @Prop({ reflect: true, mutable: true }) adjacentSiblings?:
    | 'left'
    | 'right'
    | 'leftright';
  /** a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaDescriptionTranslation = '';
  /** (optional) position within group */
  @Prop() position?: number;
  /** (optional) icon only segment */
  @Prop({ mutable: true }) iconOnly?: boolean = false;
  /** (optional) multi select segment */
  @Prop({ mutable: true }) multiSelect?: boolean = false;
  /** (optional) segment with icon and text */
  @Prop({ mutable: true }) iconText?: boolean = false;
  /** (optional) Icon aria-label for icon only */
  @Prop() iconAriaLabel?: string;
  /** Emitted when button is clicked */
  @Event({ eventName: 'scale-click' }) scaleClick!: EventEmitter<{
    id: string;
    selected: boolean;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClick' }) scaleClickLegacy!: EventEmitter<{
    id: string;
    selected: boolean;
  }>;

  private focusableElement: HTMLElement;

  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  connectedCallback() {
    const childNodes = Array.from(this.hostElement.childNodes);
    const nodeNames = childNodes.map((el) => el.nodeName.substring(0, 10));
    const hasText = nodeNames.includes('#text');
    const hasIcon = nodeNames.includes('SCALE-ICON');
    this.iconOnly = hasIcon && !hasText;
    this.iconText = hasIcon && hasText;
    this.handleSelectedIcon();
  }

  componentDidLoad() {
    this.setChildrenIconSize();
  }

  componentWillLoad() {
    if (this.segmentId == null) {
      this.segmentId = 'segment-' + i++;
    }
  }

  @Watch('selected')
  handleSelectedIcon() {
    if (this.iconOnly) {
      Array.from(this.hostElement.childNodes).forEach((child) => {
        if (
          child.nodeType === 1 &&
          child.nodeName.substr(0, 10) === 'SCALE-ICON'
        ) {
          const icon: HTMLElement = this.hostElement.querySelector(
            child.nodeName
          );
          this.selected
            ? icon.setAttribute('selected', '')
            : icon.removeAttribute('selected');
        }
      });
    }
  }

  /*
   * Set any children icon's size according the button size.
   */
  setChildrenIconSize() {
    if (this.size != null && iconSizeMap[this.size] != null) {
      const icons: ScaleIcon[] = Array.from(this.hostElement.children).filter(
        isScaleIcon
      );
      icons.forEach((icon) => {
        if (this.size == 'small') {
          icon.size = iconSizeMap['small'];
        } else {
          icon.size = iconSizeMap['large'];
        }
      });
    }
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.selected = !this.selected;
    emitEvent(this, 'scaleClick', {
      id: this.segmentId,
      selected: this.selected,
    });
  };

  render() {
    const checked = this.selected ? 'true' : 'false';
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <li class="segment--list-item" role="option">
          <button
            ref={(el) => (this.focusableElement = el)}
            class={this.getCssClassMap()}
            id={this.segmentId}
            onClick={this.handleClick}
            disabled={this.disabled}
            type="button"
            style={{ width: this.width }}
            aria-pressed={checked}
            part={this.getBasePartMap()}
          >
            <div class="segment--mask">
              <div class="success-icon-container">
                <scale-icon-action-success
                  size={this.size === 'small' ? 14 : 16}
                  class="scale-icon-action-success"
                  aria-hidden={true}
                  selected
                />
              </div>
              <div class="icon-container" aria-label={this.iconAriaLabel}>
                <slot name="segment-icon" />
              </div>
              <div class="text-container">
                <slot />
              </div>
            </div>
          </button>
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
    const prefix = mode === 'basePart' ? '' : 'segment--';

    return classNames(
      'segment',
      this.size && `${prefix}${this.size}`,
      this.selected && `${prefix}selected`,
      this.disabled && `${prefix}disabled`,
      this.adjacentSiblings &&
        `${prefix}${this.adjacentSiblings.replace(/ /g, '-')}-sibling-selected`,
      this.iconOnly && `${prefix}icon-only`,
      this.iconText && `${prefix}icon-text`,
      this.multiSelect && `${prefix}multi-select`
    );
  }
}
