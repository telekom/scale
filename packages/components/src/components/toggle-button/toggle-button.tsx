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
} from '@stencil/core';
import classNames from 'classnames';

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
  @Prop() size?: 'large' | 'regular' | 'small' | 'xs' = 'large';
  /** (optional) Button variant */
  @Prop() variant?: 'primary' | 'secondary' = 'primary';
  /** (optional) background color scheme of a selected button */
  @Prop() colorScheme?: 'light' | 'dark' = 'light';
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
  @Prop() radius: 'left' | 'right' | 'both' | null = null;
  /** (optional) toggle button's id */
  @Prop({ reflect: true }) toggleButtonId?: string;
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) position within group */
  @Prop() position?: number;
  /** a11y text for getting meaningful value. `$buttonNumber` and `$selected` are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaDescriptionTranslation =
    'button at position $position; selected: $selected';
  /** Emitted when button is clicked */
  @Event() scaleClick!: EventEmitter<{ id: string; selected: boolean }>;

  connectedCallback() {
    this.setIconPositionProp();
  }

  componentDidLoad() {
    this.handleIconSize();
  }

  componentDidRender() {
    this.handleIconSize();
  }

  componentWillLoad() {
    if (this.toggleButtonId == null) {
      this.toggleButtonId = 'toggle-button-' + i++;
    }
  }

  getAriaDescriptionTranslation() {
    const filledText = this.ariaDescriptionTranslation
      .replace(/\$position/g, `${this.position}`)
      .replace(/\$selected/g, `${this.selected}`);
    return filledText;
  }

  handleIconSize() {
    const icon = this.hostElement.children[0] && this.hostElement.children[0];
    if (icon) {
      icon.setAttribute('size', iconSizes[this.size]);
    }
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    this.selected = !this.selected;
    this.scaleClick.emit({ id: this.toggleButtonId, selected: this.selected });
  };

  /**
   * Detect whether the last node is an element (not text).
   * If so, it's probably an icon, so we set `iconPosition` to `after`.
   */
  setIconPositionProp() {
    const nodes = Array.from(this.hostElement.childNodes).filter((node) => {
      // ignore empty text nodes, which are probably due to formatting
      return !(node.nodeType === 3 && node.nodeValue.trim() === '');
    });
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
          id={this.toggleButtonId}
          onClick={this.handleClick}
          disabled={this.disabled}
          type="button"
          aria-label={this.ariaLabel}
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
      this.variant && `${prefix}${this.variant}`,
      !this.iconOnly &&
        this.iconPosition &&
        `toggle-button--icon-${this.iconPosition}`,
      this.iconOnly && `${prefix}icon-only`,
      !this.disabled && this.selected && `${prefix}selected`,
      this.radius && `${prefix}${this.radius}`,
      this.colorScheme && `${prefix}${this.colorScheme}`
    );
  }
}
