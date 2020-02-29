import { Component, Prop, h, State, Element, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { CssInJs } from '../../utils/css-in-js';
import { styles } from './carousel.styles';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-carousel',
  shadow: true,
})
export class Carousel implements Base {
  @Element() hostElement: HTMLElement;
  /** (optional) carousel display direction */
  @Prop() vertical?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Carousel', styles) stylesheet: StyleSheet;

  @State() slidesArray = [];
  @State() value = 0;

  componentWillLoad() {
    if (this.slidesArray.length === 0) {
      const children = this.hostElement.children;
      // tslint:disable-next-line: prefer-for-of
      for (let childIndex = 0; childIndex < children.length; childIndex++) {
        if (children[childIndex].slot === '') {
          // tslint:disable-next-line: prefer-for-of
          for (
            let slideIndex = 0;
            slideIndex < children[childIndex].children.length;
            slideIndex++
          ) {
            const element = children[childIndex].children[slideIndex];
            this.slidesArray.push(element);
          }
        }
      }
    }
  }

  handleSlideChange = direction => {
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

  setActiveSlide = index => {
    this.value = -100 * index;
  };

  setTransformValue = () => {
    if (!!this.vertical) {
      return `translateY(${this.value}%)`;
    }
    return `translateX(${this.value}%)`;
  };

  setActiveCssClass = index => {
    if (Math.abs(this.value) / 100 === index) {
      return 'carousel__indicator--active';
    }
    return '';
  };

  render() {
    const { classes } = this.stylesheet;
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <div class={classes.carousel__container}>
            <div
              class={`${classes.carousel__arrow} ${classes['carousel__arrow--left']}`}
              onClick={() => this.handleSlideChange('prev')}
            >
              <slot name="arrow-left" />
            </div>
            {this.slidesArray.map(element => (
              <div
                class={classes.carousel__slide}
                style={{ transform: this.setTransformValue() }}
              >
                <div innerHTML={element.outerHTML}></div>
              </div>
            ))}
            <div
              class={`${classes.carousel__arrow} ${classes['carousel__arrow--right']}`}
              onClick={() => this.handleSlideChange('next')}
            >
              <slot name="arrow-right" />
            </div>
          </div>
          <ul class={classes.carousel__indicators}>
            {Array.from(Array(this.slidesArray.length).keys()).map(index => (
              <li
                key={index}
                class={`${classes.carousel__indicator} ${this.setActiveCssClass(
                  index
                )}`}
                onClick={() => this.setActiveSlide(index)}
              ></li>
            ))}
          </ul>
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.carousel,
      this.vertical && classes['carousel--vertical']
    );
  }
}
