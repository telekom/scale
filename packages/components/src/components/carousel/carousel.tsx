import { Component, Prop, h, State } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-carousel',
  styleUrls: ['Carousel.css'],
  shadow: true,
})
export class Carousel {
  /** carousel slider total number */
  @Prop() public totalSlides: number;
  /** (optional) carousel display direction */
  @Prop() public direction?: string = 'horizontal';

  @State() private activeSlide: number = 0;
  @State() private slidesArray = [];

  public componentWillLoad() {
    this.slidesArray = [];
    for (let i = 0; i < this.totalSlides; i++) {
      this.slidesArray.push(i);
    }
  }

  public displayNext = direction => {
    if (direction === 'left') {
      if (this.activeSlide > 0) {
        this.activeSlide--;
      } else {
        this.activeSlide = this.totalSlides - 1;
      }
    }

    if (direction === 'right') {
      if (this.activeSlide < this.totalSlides - 1) {
        this.activeSlide++;
      } else {
        this.activeSlide = 0;
      }
    }
  };

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        <div class="carousel__container">
          <div
            class="carousel__arrow carousel__arrow--left"
            onClick={() => this.displayNext('left')}
          >
            <slot name="arrow-left" />
          </div>
          {this.slidesArray.map(index => (
            <div
              class={`carousel__slide ${
                index === this.activeSlide ? 'carousel__slide--active' : ''
              }`}
            >
              <slot name={`slide_${index}`} />
            </div>
          ))}
          <div
            class="carousel__arrow carousel__arrow--right"
            onClick={() => this.displayNext('right')}
          >
            <slot name="arrow-right" />
          </div>
        </div>
        <ul
          class={`carousel__indicators carousel__indicators--${this.direction}`}
        >
          {this.slidesArray.map(index => (
            <li
              key={index}
              class={`carousel__indicator carousel__indicator--${this.direction}`}
            >
              <button class="carousel__button" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'carousel',
      this.direction && `carousel--${this.direction}`
    );
  }
}
