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

let i = 0;

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
  /** (optional) position within group */
  @Prop({ mutable: true }) iconOnly?: boolean;
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

  componentWillLoad() {
    if (this.segmentId == null) {
      this.segmentId = 'segment-' + i++;
    }
  }
  componentDidUpdate() {
    this.handleIcon();
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

  handleIcon() {
    Array.from(this.hostElement.childNodes).forEach((child) => {
      if (
        child.nodeType == 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON'
      ) {
        const icon: HTMLElement = this.hostElement.querySelector(
          child.nodeName
        );
        switch (this.size) {
          case 'small':
            icon.setAttribute('size', '14');
            break;
          case 'medium' || 'large':
            icon.setAttribute('size', '16');
            break;
        }
        icon.style.display = 'inline-flex';
        icon.style.marginRight = '4px';
        this.hasIcon = true;
      }
      if (child.nodeType == 3 && this.hostElement.childNodes.length == 1) {
        this.textOnly = true;
        var span = document.createElement('span');
        child.parentNode.insertBefore(span, child);
        span.appendChild(child);
      }
      if (
        child.nodeType == 1 &&
        child.nodeName.substr(0, 10) === 'SCALE-ICON' &&
        this.hostElement.childNodes.length === 1
      ) {
        this.iconOnly = true;
        this.hostElement.setAttribute('icon-only', 'true');
        const icon: HTMLElement = this.hostElement.querySelector(
          child.nodeName
        );
        icon.style.marginRight = '0px';
        this.selected
          ? icon.setAttribute('selected', '')
          : icon.removeAttribute('selected');
      }
    });
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
            {!this.iconOnly && (
              <div class="success-icon-container">
                <scale-icon-action-success
                  size={this.size === 'small' ? 14 : 16}
                  class="scale-icon-action-success"
                  accessibility-title="success"
                  selected
                />
              </div>
            )}
            <div class="icon-container">
              <slot name="segment-icon" />
            </div>
            <slot />
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
      this.iconOnly && `${prefix}icon-only`
    );
  }
}
