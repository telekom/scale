import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './slider.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-slider',
  shadow: true,
})
export class Slider implements Base {
  /** (optional) Slider class */
  @Prop() customClass?: string = '';
  /** (optional) Slider range start value */
  @Prop() min?: number = 0;
  /** (optional) Slider range max value */
  @Prop() max?: number = 100;
  /** (optional) Slider binding value */
  @Prop() value: number = 0;
  /** (optional) Slider step */
  @Prop() step: number = 1;
  /** (optional) Slider display value */
  @Prop() label: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Slider', styles) stylesheet: StyleSheet;

  componentWillLoad() {
    if (this.min > this.value) {
      this.value = this.min;
    }
  }

  render() {
    const { classes } = this.stylesheet;
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <input
            class={classes.slider__input}
            type="range"
            min={this.min}
            max={this.max}
            value={this.value}
            step={this.step}
            onInput={this.updateValue}
          />
          {this.label && <span class={classes.slider__text}>{this.value}</span>}
        </div>
      </Host>
    );
  }

  updateValue = event => {
    this.value = event.target.value;
  };

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.slider, this.customClass && this.customClass);
  }
}
