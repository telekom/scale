import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 't-slider',
  styleUrl: 'slider.css',
  shadow: true,
})
export class Slider {
  /** (optional) Slider type */
  @Prop() public type?: string = 'default';
  /** (optional) Slider direction */
  @Prop() public direction?: string = 'horizontal';
  /** (optional) Slider range start value */
  @Prop() public min?: number = 0;
  /** (optional) Slider range max value */
  @Prop() public max?: number = 100;
  /** (optional)the binding value of the slider */
  @Prop() public value = 0;
  /** (optional)the display value of the slider */
  @Prop() public displayValue = true;

  public render() {
    return (
      <div class="slider__container">
        <input
          class={`slider__input slider--${this.type}`}
          type="range"
          min={this.min}
          max={this.max}
          value={this.value}
          onInput={this.updateValue}
        />
        {this.displayValue && <span class="slider__text">{this.value}</span>}
        <slot />
      </div>
    );
  }

  private updateValue = e => {
    this.value = e.target.value;
    e.target.style.background = `linear-gradient(
      to right,
      green 0%,
      green ${this.value}%,
      #fff ${this.value}%,
      #fff 100%
    )`;
  };
}
