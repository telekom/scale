import { Component, Prop, h, State, Element } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-carousel',
  styleUrls: ['Carousel.css'],
  shadow: true,
})
export class Carousel {
  @Element() public hostElement: HTMLElement;
  /** (optional) carousel display direction */
  @Prop() public vertical?: boolean = false;

  @State() private slidesArray = [];
  @State() private value = 0;

  public componentWillLoad() {
    if (this.slidesArray.length === 0) {
      const children = this.hostElement.children;
      // tslint:disable-next-line: prefer-for-of
      for (let childIndex = 0; childIndex < children.length; childIndex++) {
        if (children[childIndex].slot === '') {
          // tslint:disable-next-line: prefer-for-of
          for (let slideIndex = 0; slideIndex < children[childIndex].children.length; slideIndex++) {
            const element = children[childIndex].children[slideIndex];
            this.slidesArray.push(element);
          }
        }
      }
    }
  }

  public handleSlideChange = direction => {
    const val = this.value;
    if (direction === 'prev') {
      val === 0
        ? (this.value = -100 * (this.slidesArray.length - 1))
        : (this.value = val + 100);
    }

    if (direction === 'next') {
      val === -100 * (this.slidesArray.length - 1)
        ? (this.value = 0)
        : (this.value = val - 100);
    }
  };

  public setActiveSlide = index => {
    this.value = -100 * index;
  };

  public setTransformValue = () => {
    if (!!this.vertical) {
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
      <div class={this.getCssClassMap()}>
        <div class={`carousel__container`}>
          <div
            class="carousel__arrow carousel__arrow--left"
            onClick={() => this.handleSlideChange('prev')}
          >
            <slot name="arrow-left" />
          </div>
          {this.slidesArray.map(element => (
            <div
              class="carousel__slide"
              style={{ transform: this.setTransformValue() }}
            >
              <div innerHTML={element.outerHTML}></div>
            </div>

          ))}
          <div
            class="carousel__arrow carousel__arrow--right"
            onClick={() => this.handleSlideChange('next')}
          >
            <slot name="arrow-right" />
          </div>
        </div>
        <ul class={`carousel__indicators`}>
          {Array.from(Array(this.slidesArray.length).keys()).map((index) => (
            <li
              key={(index)}
              class={`carousel__indicator ${this.setActiveCssClass(index)}`}
              onClick={() => this.setActiveSlide((index))}
            >
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'carousel',
      this.vertical && 'carousel--vertical',
    );
  }
}
