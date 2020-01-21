import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 't-carousel',
  styleUrls: ['Carousel.css'],
  shadow: true,
})
export class Carousel {
  /** carousel slides total number */
  @Prop() public totalSlides: number;
  /** (optional) carousel display direction */
  @Prop() public direction?: string = 'horizontal';

  @State() private slidesArray = [];
  @State() private value = 0;

  public componentWillLoad() {
    if (this.slidesArray.length === 0) {
      for (let i = 0; i < this.totalSlides; i++) {
        this.slidesArray.push(i);
      }
    }
  }

  public displayNext = direction => {
    const val = this.value;
    if (direction === 'left') {
      val === 0
        ? (this.value = -100 * (this.slidesArray.length - 1))
        : (this.value = val + 100);
    }

    if (direction === 'right') {
      val === -100 * (this.slidesArray.length - 1)
        ? (this.value = 0)
        : (this.value = val - 100);
    }
  };

  public setActiveSlide = index => {
    this.value = -100 * index;
  };

  public setTransformValue = () => {
    if (this.direction === 'vertical') {
      return `translateY(${this.value}%)`;
    }
    return `translateX(${this.value}%)`;
  };

  public setActiveCssClass = index => {
    if (Math.abs(this.value) / 100 === index) {
      return 'carousel__indicator--active';
    }
    return '';
  };

  public render() {
    return (
      <div class="carousel">
        <div
          class={`carousel__container  carousel__container--${this.direction}`}
        >
          <div
            class="carousel__arrow carousel__arrow--left"
            onClick={() => this.displayNext('left')}
          >
            <slot name="arrow-left" />
          </div>
          {this.slidesArray.map(index => (
            <div
              class="carousel__slide"
              style={{ transform: this.setTransformValue() }}
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
              class={`carousel__indicator ${this.setActiveCssClass(
                index
              )} carousel__indicator--${this.direction}`}
              onMouseEnter={() => this.setActiveSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    );
  }
}
