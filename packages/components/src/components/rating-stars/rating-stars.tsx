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
  h,
  Prop,
  Host,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import { emitEvent } from '../../utils/utils';
import statusNote from '../../utils/status-note';

export interface StarInterface extends HTMLDivElement {
  dataset: {
    value: string;
    selected?: string;
  };
}
const sizes = {
  small: 16,
  large: 24,
};
let ratingStarCount = 0;

@Component({
  tag: 'scale-rating-stars',
  styleUrl: 'rating-stars.css',
  shadow: true,
})
export class RatingStars {
  @Element() host: HTMLElement;

  ratingStarId = `scale-rating-star-${ratingStarCount++}`;

  /** @deprecated; size should be used instead of starSize */
  @Prop() starSize: 'small' | 'large' = 'large';
  /** size of the stars  */
  @Prop({ reflect: true, mutable: true }) size: 'small' | 'large' = 'large';
  /** @deprecated; The lower limit of the rating */
  @Prop() minRating = 0;
  /** @deprecated; max should be used instead of maxRating */
  @Prop() maxRating = 5;
  /** The upper limit of the rating */
  @Prop({ reflect: true, mutable: true }) max = 5;
  /** Represents the current value of the rating */
  @Prop({ mutable: true, reflect: true }) rating = 0;
  /** makes the rating non-interactive (but still accessible)  */
  @Prop({ reflect: true }) readonly = false;
  /** disables input  */
  @Prop({ reflect: true }) disabled = false;
  /** a11y text for getting meaningful value. `$rating` and `$max` (deprecated `$maxRating`) are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaLabelTranslation = '$rating out of $max stars';
  /** (optional) rating label */
  @Prop({ reflect: true }) label = 'Rating';
  /** (optional) info text */
  @Prop({ reflect: true }) hideLabel = false;
  /** (optional) info text */
  @Prop() infoText?: string;

  /** Emitted when the rating has changed */
  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter;

  componentWillRender() {
    // make sure the deprecated props overwrite the actual ones if used
    // and show status note deprecated
    if (this.maxRating !== 5) {
      this.max = this.maxRating;
      statusNote({
        tag: 'deprecated',
        message:
          'Property "maxRating" is deprecated. Please use the "max" property!',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.minRating !== 0) {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "minRating" is deprecated and will be deleted upon the next release',
        type: 'warn',
        source: this.host,
      });
    }
    if (this.starSize !== 'large') {
      this.size = this.starSize;
      statusNote({
        tag: 'deprecated',
        message:
          'Property "starSize" is deprecated. Please use the "size" property!',
        type: 'warn',
        source: this.host,
      });
    }
    // deactivate showing half stars while keeping the code
    this.rating = Math.round(this.rating);
  }

  // constructs the aria message for the current rating
  getRatingText() {
    const filledText = this.ariaLabelTranslation
      .replace(/\$rating/g, `${this.rating}`)
      // TODO: remove when `maxRating` is also being removed
      .replace(/\$maxRating/g, `${this.max}`)
      .replace(/\$max/g, `${this.max}`);
    return filledText;
  }

  handleInput = (ev: InputEvent) => {
    const input = ev.composedPath()[0] as HTMLInputElement;
    const value = Number(input.value);

    switch (true) {
      case value < this.minRating:
        input.value = this.minRating.toString();
        break;

      case value > this.max:
        input.value = this.max.toString();
        break;
    }

    this.rating = Number(input.value);

    emitEvent(this, 'scaleChange', { value: this.rating });
  };

  handleStarClick = (ev: MouseEvent) => {
    const star = ev.composedPath()[0] as StarInterface;
    const starValue = Number(star.dataset.value);

    // set focus on input to make arrow keys work to select stars
    const input = this.host.shadowRoot.querySelector('input');
    input.focus();

    if (starValue === 1 && this.rating === 1 && this.minRating === 0) {
      this.rating = this.minRating;
    } else {
      this.rating = starValue;
    }
    emitEvent(this, 'scaleChange', { value: this.rating });
  };

  renderStar(index: number, selected = false, rating: number) {
    const size = sizes[this.size];
    const isWholeNumber = rating % 1 === 0;
    const isLastNumber = Math.ceil(rating) === index;

    return (
      <div
        part="star"
        data-value={index}
        data-selected={selected}
        data-half={isLastNumber && !isWholeNumber}
        onMouseUp={!this.readonly && this.handleStarClick}
        // sets up first star to be the resetter above the input element
        style={{ zIndex: index === 1 ? '5' : 'auto' }}
      >
        <scale-icon-action-favorite size={size} part="placeholder-star" />
        <div class="icon-clip">
          <scale-icon-action-favorite
            size={size}
            selected
            part="selected-star"
          />
        </div>
      </div>
    );
  }

  renderRating() {
    const stars = [];
    const roundedRating = Math.ceil(this.rating);
    const max = this.max;

    for (let index = 1; index <= max; index++) {
      const isSelected = roundedRating >= index;
      stars.push(this.renderStar(index, isSelected, this.rating));
    }
    return stars;
  }

  render() {
    return (
      <Host
        class={{
          hideLabel: this.hideLabel,
          disabled: this.disabled,
          readonly: this.readonly,
        }}
      >
        <div part="container">
          <label
            id={`${this.ratingStarId}-label`}
            part="label"
            htmlFor={this.ratingStarId}
          >
            {this.label}
          </label>
          <div part="content">
            <div
              part="wrapper"
              aria-valuetext={this.getRatingText()}
              aria-orientation="horizontal"
              aria-describedby={
                this.infoText ? `${this.ratingStarId}-infotext` : false
              }
            >
              <input
                disabled={this.disabled}
                readonly={this.readonly}
                part="range-slider"
                type={this.readonly ? 'number' : 'range'}
                id={this.ratingStarId}
                min={0}
                max={this.max + 1}
                value={this.rating}
                step="1"
                aria-labelledby={`${this.ratingStarId}-label`}
                aria-readonly={this.readonly ? 'true' : false}
                aria-valuemin={this.minRating}
                aria-valuemax={this.max}
                aria-valuenow={this.rating}
                aria-valuetext={this.getRatingText()}
                onInput={!this.readonly && this.handleInput}
              />
              {this.renderRating()}
            </div>
            {this.infoText && (
              <div part="infotext" id={`${this.ratingStarId}-infotext`}>
                {this.infoText}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
