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

import { Component, h, Prop, Host, Element, State } from '@stencil/core';
import { clamp, handleListeners } from './utils/utils';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-rating-stars',
  styleUrl: 'rating-stars.css',
  shadow: true,
})
export class RatingStars {
  element: HTMLElement;

  @Element() hostElement: HTMLElement;
  /** (optional) hoverValue  */
  @State() hoverValue = 0;
  /** (optional) max  */
  @Prop() max = 5;
  /** (optional) value  */
  @Prop({ mutable: true }) value = 0;
  /** (optional) small  */
  @Prop() small = false;
  /** (optional) disabled  */
  @Prop() disabled = false;
  /** (optional) ariaLabelTranslation  */
  @Prop({ mutable: true })
  ariaLabelTranslation = `${this.value} out of ${this.max} stars`;
  /** (optional) precision  */
  @Prop() precision = 1;
  /** (optional) slider label */
  @Prop() label?: string;

  colorFilled = `var(--scl-color-primary)`;
  colorBlank = `var(--scl-color-grey-50)`;
  size = this.small ? '16px' : '24px';
  isHovering = false;

  renderIcon = (color: string, size: string, selected?: boolean) => {
    if (selected) {
      return `<scale-icon-action-favorite color=${color} size=${size} selected />`;
    } else {
      return `<scale-icon-action-favorite color=${color} size=${size} />`;
    }
  };
  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidLoad() {
    handleListeners(this.element, 'addListeners');
  }

  disconnectedCallback() {
    handleListeners(this.element, 'removeListeners');
  }

  handleMouseLeave() {
    this.isHovering = false;
    return false;
  }

  handleMouseEnter() {
    if (!this.disabled) {
      this.isHovering = true;
      return true;
    }
  }

  handleMouseMove(event: MouseEvent) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  handleMouseClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.isHovering = false;
    this.value =
      this.value === this.hoverValue
        ? 0
        : this.getValueFromMousePosition(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.key === 'ArrowRight') {
      const valuePlus = this.value + this.precision;
      this.value = clamp(valuePlus, 0, this.max);
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft') {
      const ratingMinus = this.value - this.precision;
      this.value = clamp(ratingMinus, 0, this.max);
      event.preventDefault();
    }

    if (event.key === 'Home') {
      this.value = 0;
      event.preventDefault();
    }

    if (event.key === 'End') {
      this.value = this.max;
      event.preventDefault();
    }
  }

  getValueFromMousePosition(event: MouseEvent) {
    const containerLeft = this.element.getBoundingClientRect().left;
    const containerWidth = this.element.getBoundingClientRect().width;

    const numOfSections = this.max / this.precision;
    const sectionWidth = containerWidth / numOfSections;
    const positionOfMousePointer =
      (event.clientX - containerLeft) / sectionWidth;
    const star = clamp(
      this.roundToPrecision(
        positionOfMousePointer * this.precision,
        this.precision
      ),
      0,
      this.max
    );
    return star;
  }

  roundToPrecision(numberToRound: number, precision = 1) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  getAriaLabel() {
    return this.ariaLabelTranslation
      .replace(/\$\{x\}/gi, this.value.toString())
      .replace(/\$\{y\}/gi, this.max.toString());
  }

  render() {
    const counter = Array.from(Array(this.max).keys());
    const displayValue = this.isHovering ? this.hoverValue : this.value;

    return (
      <Host>
        <div
          class={this.getCssClassMap()}
          ref={(el) => (this.element = el)}
          onMouseMove={this.handleMouseMove}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleMouseClick}
          onKeyDown={this.handleKeyDown}
          tabIndex={this.disabled ? -1 : 0}
          role="figure"
          aria-describedby="rating__description"
          aria-label={this.label}
        >
          <label class="rating__label" aria-hidden="true">
            {this.label}
          </label>
          <span
            id="rating__description"
            innerHTML={this.getAriaLabel()}
            hidden
          ></span>
          <span class="rating__symbols" aria-hidden="true">
            {counter.map((index) => (
              <span
                class="rating__symbol-wrapper"
                onMouseEnter={this.handleMouseEnter}
              >
                <span
                  role="presentation"
                  style={{
                    clipPath:
                      Math.ceil(displayValue) >= index + 1
                        ? `inset(0 ${
                            (Math.ceil(displayValue) - index) * 100
                          }% 0 0)`
                        : null,
                  }}
                  class={{
                    rating__symbol: true,
                    'rating__symbol--hover':
                      this.isHovering && Math.ceil(displayValue) === index + 1,
                  }}
                  innerHTML={this.renderIcon(this.colorBlank, this.size)}
                  id={`star-${index + 1}`}
                />
              </span>
            ))}
          </span>
          <span
            class="rating__symbols rating__symbols--indicator"
            aria-hidden="true"
          >
            {counter.map((index) => (
              <span
                class="rating__symbol-wrapper"
                onMouseEnter={this.handleMouseEnter}
              >
                <span
                  role="presentation"
                  style={{
                    clipPath:
                      displayValue > index + 1
                        ? null
                        : `inset(0 ${100 - (displayValue - index) * 100}% 0 0)`,
                  }}
                  class={{
                    rating__symbol: true,
                    'rating__symbol--hover':
                      this.isHovering && Math.ceil(displayValue) === index + 1,
                  }}
                  innerHTML={this.renderIcon(this.colorFilled, this.size, true)}
                />
              </span>
            ))}
          </span>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'rating',
      this.disabled && 'rating--disabled',
      this.isHovering && 'rating--hover',
      this.small && 'rating--small',
      this.label && 'rating--has-label'
    );
  }
}
