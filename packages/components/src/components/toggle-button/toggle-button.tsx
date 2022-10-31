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

enum iconSizes {
  xs = '12',
  small = '16',
  regular = '22',
  large = '24',
}

let i = 0;

@Component({
  tag: 'scale-toggle-button',
  styleUrl: 'toggle-button.css',
  shadow: true,
})
export class ToggleButton {
  @Element() hostElement: HTMLElement;
  /** (optional) The size of the button */
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'regular';
  /** (optional) Button background */
  @Prop() background?: 'grey' | 'white' = 'white';
  /** @deprecated - variant should replace colorScheme */
  @Prop() colorScheme?: 'monochrome' | 'color' = 'color';
  /** (optional) background variant of a selected toggle-button */
  @Prop() variant?: 'monochrome' | 'color' = 'color';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) If `true`, the button is selected */
  @Prop({ mutable: true }) selected?: boolean = false;
  /** (optional) Button type */
  @Prop() iconOnly?: boolean = false;
  /** (optional) Icon position related to the label */
  @Prop({ reflect: true, mutable: true }) iconPosition: 'before' | 'after' =
    'before';
  /** (optional) set the border-radius left, right or both */
  @Prop() hideBorder: false;
  /** (optional) set the border-radius left, right or both */
  @Prop() radius: 'left' | 'right' | 'both' | 'neither' | null = null;
  /** (optional) toggle button's id */
  @Prop({ reflect: true }) toggleButtonId?: string;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabelToggleButton: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) position within group */
  @Prop() position?: number;
  /** (optional) translation of 'selected */
  @Prop() ariaLangSelected? = 'selected';
  /** (optional) translation of 'deselected */
  @Prop() ariaLangDeselected? = 'deselected';
  /** a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaDescriptionTranslation = '$selected';
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

  hasScaleIcon = false;

  private focusableElement: HTMLElement;

  @Method()
  async setFocus() {
    this.focusableElement.focus();
  }

  connectedCallback() {
    this.setIconPositionProp();
    this.handleIconShape();
  }

  componentDidLoad() {
    this.handleIconSize();
  }

  componentDidRender() {
    this.handleIconSize();
    if (this.hostElement.hasAttribute('aria-label')) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "ariaLabel" is deprecated. Please use the "ariaLabelToggleButton" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  componentWillLoad() {
    if (this.toggleButtonId == null) {
      this.toggleButtonId = 'toggle-button-' + i++;
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

  handleIconSize() {
    Array.from(this.hostElement.children).forEach((child) => {
      if (child.tagName.substr(0, 10) === 'SCALE-ICON') {
        child.setAttribute('size', iconSizes[this.size]);
      }
    });
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.selected = !this.selected;
    this.handleIconShape();
    this.scaleClick.emit({ id: this.toggleButtonId, selected: this.selected });
    emitEvent(this, 'scaleClick', {
      id: this.toggleButtonId,
      selected: this.selected,
    });
  };

  handleIconShape = () => {
    if (this.hasScaleIcon) {
      Array.from(this.hostElement.children).forEach((node) => {
        if (node.nodeName.substr(0, 10) === 'SCALE-ICON') {
          if (this.selected) {
            node.setAttribute('selected', 'true');
          } else {
            node.removeAttribute('selected');
          }
        }
      });
    }
  };

  /**
   * Detect whether a child node is a scale icon and contains text.
   * If so, we set `iconPosition` to `after`, if the icon comes after the text.
   */
  setIconPositionProp() {
    const nodes = Array.from(this.hostElement.childNodes).filter((node) => {
      if (node.nodeName.substr(0, 10) === 'SCALE-ICON') {
        this.hasScaleIcon = true;
      }
      // ignore empty text nodes, which are probably due to formatting
      return !(node.nodeType === 3 && node.nodeValue.trim() === '');
    });
    if (
      !this.iconOnly &&
      nodes &&
      nodes.length &&
      nodes[nodes.length - 1] &&
      nodes[nodes.length - 1].nodeName.substr(0, 10) === 'SCALE-ICON'
    ) {
      this.iconPosition = 'after';
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <button
          ref={(el) => (this.focusableElement = el)}
          class={this.getCssClassMap()}
          id={this.toggleButtonId}
          onClick={this.handleClick}
          disabled={this.disabled}
          type="button"
          aria-label={this.ariaLabelToggleButton}
          aria-pressed={this.selected}
          part={this.getBasePartMap()}
          aria-description={this.getAriaDescriptionTranslation()}
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
      this.background &&
        `${prefix}${this.background === 'grey' ? 'primary' : 'secondary'}`,
      !this.iconOnly &&
        this.iconPosition &&
        `toggle-button--icon-${this.iconPosition}`,
      this.iconOnly && `${prefix}icon-only`,
      !this.disabled && this.selected && `${prefix}selected`,
      this.radius && `${prefix}${this.radius}`,
      this.colorScheme && `${prefix}${this.colorScheme}`,
      this.variant && `${prefix}${this.variant}`,
      !this.hideBorder && `${prefix}border`
    );
  }
}
