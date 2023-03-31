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
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
import statusNote from '../../utils/status-note';
import { hasShadowDom, ScaleIcon, isScaleIcon } from '../../utils/utils';

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
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabelSegment: string;
  /** (optional) Button width set to ensure that all buttons have the same width */
  @Prop() width?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  // /** (optional)  */
  @Prop({ reflect: true, mutable: true }) adjacentSiblings?:
    | 'left'
    | 'right'
    | 'leftright';
  /** (optional) translation of 'selected */
  @Prop() ariaLangSelected? = 'selected';
  /** (optional) translation of 'deselected */
  @Prop() ariaLangDeselected? = 'deselected';
  /** a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaDescriptionTranslation = '$selected';
  /** (optional) position within group */
  @Prop() position?: number;
  /** (optional) position within group */
  @Prop({ mutable: true }) hasIcon?: boolean;
  /** (optional) position within group */
  @Prop({ mutable: true }) textOnly?: boolean;
  /** (optional) icon only segment */
  @Prop({ mutable: true }) iconOnly?: boolean = false;
  /** (optional) segment with icon and text */
  @Prop({ mutable: true }) iconText?: boolean = false;  
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

  componentDidRender() {
    if (this.hostElement.hasAttribute('aria-label')) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "ariaLabel" is deprecated. Please use the "ariaLabelSegment" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  componentDidLoad() {
    this.setChildrenIconSize();
  }
  
  componentWillLoad() {
    if (this.segmentId == null) {
      this.segmentId = 'segment-' + i++;
    }
  }

  getAriaDescriptionTranslation() {
    const replaceSelected = this.selected
      ? this.ariaLangSelected
      : this.ariaLangDeselected;
    const filledText = this.ariaDescriptionTranslation
      .replace(/\$position/g, `${this.position}`)
      .replace(/\$selected/g, `${replaceSelected}`);
    return filledText;
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
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <button
          ref={(el) => (this.focusableElement = el)}
          class={this.getCssClassMap()}
          id={this.segmentId}
          onClick={this.handleClick}
          disabled={this.disabled}
          type="button"
          style={{ width: this.width }}
          aria-label={this.ariaLabelSegment}
          aria-pressed={this.selected}
          part={this.getBasePartMap()}
          aria-description={this.getAriaDescriptionTranslation()}
        >
          <div class="segment--mask">
            
            <div class="success-icon-container">
              <scale-icon-action-success
                size={this.size === 'small' ? 14 : 16}
                class="scale-icon-action-success"
                accessibility-title="success"
                selected
              />
            </div>
            <div class="icon-container">
              <slot name="segment-icon" />
            </div>
            <div class="text-container">
              <slot />
            </div>
          </div>
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
    const prefix = mode === 'basePart' ? '' : 'segment--';

    return classNames(
      'segment',
      this.size && `${prefix}${this.size}`,
      this.selected && `${prefix}selected`,
      this.disabled && `${prefix}disabled`,
      this.adjacentSiblings &&
        `${prefix}${this.adjacentSiblings.replace(/ /g, '-')}-sibling-selected`,
      this.hasIcon && `${prefix}has-icon`,
      this.iconOnly && `${prefix}icon-only`,
      this.iconText && `${prefix}icon-text`
    );
  }
}
