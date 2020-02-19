import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-slider',
  styleUrl: 'slider.css'
})
export class Slider {
  /** (optional) Card class */
  @Prop() public customClass?: string = '';
  /** (optional) Slider direction */
  @Prop() public vertical?: boolean = false;
  /** (optional) Slider range start value */
  @Prop() public min?: number = 0;
  /** (optional) Slider range max value */
  @Prop() public max?: number = 100;
  /** (optional) Slider binding value */
  @Prop() public value: number = 0;
  /** (optional) Slider step */
  @Prop() public step: number = 1;
  /** (optional) Slider display value */
  @Prop() public label: boolean = false;

  public componentWillLoad() {
    if (this.min > this.value) {
      this.value = this.min
    }
  }

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        <input
          class="slider__input"
          type="range"
          min={this.min}
          max={this.max}
          value={this.value}
          step={this.step}
          onInput={this.updateValue}
        />
        {this.label &&
          <span class="slider__text">{this.value}</span>
        }
      </div>
    );
  }

  private updateValue = event => {
    this.value = event.target.value;
  };

  private getCssClassMap(): CssClassMap {
    return classNames(
      'slider',
      this.customClass && this.customClass
    );
  }
}
