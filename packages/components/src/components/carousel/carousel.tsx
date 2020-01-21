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

  @State() private slidesArray = [];
  @State() private X = 0;

  public componentWillLoad() {
    this.slidesArray = [];
    for (let i = 0; i < this.totalSlides; i++) {
      this.slidesArray.push(i);
    }
  }

  public displayNext = direction => {
    if (direction === 'left') {
      const x = this.X;
      x === 0
        ? (this.X = -100 * (this.slidesArray.length - 1))
        : (this.X = x + 100);
    }

    if (direction === 'right') {
      const x = this.X;
      x === -100 * (this.slidesArray.length - 1)
        ? (this.X = 0)
        : (this.X = x - 100);
    }
  };

  public setActiveSlide = index => {
    this.X = -100 * index;
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
              class="carousel__slide"
              style={{ transform: `translateX(${this.X}%)` }}
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
              class={`carousel__indicator carousel__indicator--${
                Math.abs(this.X) / 100 === index ? 'active' : 'inactive'
              } carousel__indicator--${this.direction}`}
              onMouseEnter={() => this.setActiveSlide(index)}
            ></li>
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
