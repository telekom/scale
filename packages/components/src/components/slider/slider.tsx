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
  /** (optional) Slider binding value */
  @Prop() public value = 0;
  /** (optional) Slider display value */
  @Prop() public displayValue = true;
  /** (optional) Slider track runway color */
  @Prop() public trackColor = '#e4e7ed';
  /** (optional) Slider track fill color */
  @Prop() public fillColor = '#409eff';

  public render() {
    return (
      <div class="slider__container">
        <input
          class={`slider__input slider__input--${this.type} slider--${this.direction}`}
          style={{
            background: `linear-gradient(
            to right,
            ${this.fillColor} 0%,
            ${this.fillColor} ${this.value}%,
            ${this.trackColor} ${this.value}%,
            ${this.trackColor} 100%
          )`,
          }}
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

  private updateValue = event => {
    this.value = event.target.value;
    event.target.style.background = `linear-gradient(
      to right,
      ${this.fillColor} 0%,
      ${this.fillColor} ${this.value}%,
      ${this.trackColor} ${this.value}%,
      ${this.trackColor} 100%
    )`;
  };
}
