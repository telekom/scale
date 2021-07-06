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
  Watch,
} from '@stencil/core';

export interface StarInterface extends HTMLDivElement {
  dataset: {
    value: string;
    selected?: string;
  };
}

let ratingStarCount = 0;
@Component({
  tag: 'scale-rating-stars',
  styleUrl: 'rating-stars.css',
  shadow: true,
})
export class RatingStars {
  @Element() host: HTMLElement;

  ratingStarId = `scale-rating-star-${ratingStarCount++}`;

  /** The lower limit of the rating. In cases where  */
  @Prop({ reflect: true }) starSize: 'small' | 'big' = 'small';
  /** The lower limit of the rating. In cases where  */
  @Prop({ reflect: true }) minRating = 0;
  /** The upper limit of the rating */
  @Prop({ reflect: true }) maxRating = 5;
  /** Represents the current value of the rating */
  @Prop({ mutable: true, reflect: true }) rating = 3.5;
  /** disables input  */
  @Prop({ reflect: true }) disabled = false;
  /** a11y text for getting meaningful value. `$rating` and `$maxRating` are template variables and will be replaces by their corresponding properties.  */
  @Prop() ariaText = '$rating out of $maxRating stars';

  /** Emitted when the rating has changed */
  @Event() scaleChange: EventEmitter;

  @Watch('rating') ratingWatcher() {
    this.scaleChange.emit({ rating: this.rating });
  }

  // constructs the aria message for the current rating
  getRatingText() {
    const filledText = this.ariaText
      .replace(/\$rating/g, `${this.rating}`)
      .replace(/\$maxRating/g, `${this.maxRating}`);
    return filledText;
  }

  handleInput = (ev: InputEvent) => {
    const input = ev.composedPath()[0] as HTMLInputElement;
    const rating = input.value;

    this.rating = Number(rating);
  };

  handleStarClick = (ev: MouseEvent) => {
    const star = ev.composedPath()[0] as StarInterface;
    const starValue = Number(star.dataset.value);
    if (starValue === this.rating) {
      this.rating = this.minRating;
    } else {
      this.rating = starValue;
    }
  };

  renderStar(index: number, selected = false, rating: number) {
    const isWholeNumber = rating % 1 === 0;
    const isLastNumber = Math.ceil(rating) === index;

    return (
      <div
        part="star"
        data-value={index}
        data-selected={selected}
        data-half={isLastNumber && !isWholeNumber}
        onClick={this.handleStarClick}
      >
        <scale-icon-action-favorite part="placeholder-star" />
        <div class="clippy">
          <scale-icon-action-favorite selected part="selected-star" />
        </div>
      </div>
    );
  }

  renderRating() {
    const stars = [];
    const roundedRating = Math.ceil(this.rating);
    const min = this.minRating === 0 ? this.minRating + 1 : this.minRating;
    const max = this.maxRating;

    for (let index = min; index <= max; index++) {
      const isSelected = roundedRating >= index;
      stars.push(this.renderStar(index, isSelected, this.rating));
    }

    return stars;
  }

  render() {
    return (
      <Host>
        <label part="label" htmlFor={this.ratingStarId}>
          <slot>Rating Label</slot>
        </label>
        <input
          disabled={this.disabled}
          part="range-slider"
          type="range"
          id={this.ratingStarId}
          min={this.minRating}
          max={this.maxRating}
          value={this.rating}
          step="1"
          aria-orientation="horizontal"
          aria-valuemin={this.minRating}
          aria-valuemax={this.maxRating}
          aria-valuenow={this.rating}
          aria-valuetext={this.getRatingText()}
          onInput={this.handleInput}
        />
        <div part="wrapper">{this.renderRating()}</div>
      </Host>
    );
  }
}
