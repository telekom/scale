import { Component, Prop, h, Method, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './button.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-button',
  shadow: true,
})
export class Button implements Base {
  /** (optional) Button class */
  @Prop() customClass?: string = '';
  /** (optional) Button size */
  @Prop() size?: string = '';
  /** (optional) Button variant */
  @Prop() variant?: string = '';
  /** (optional) Disabled button */
  @Prop() disabled?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Button', styles) stylesheet: StyleSheet;

  /** Button method: disable()  */
  @Method()
  async disable() {
    this.disabled = true;
  }

  /** Button method: enable()  */
  @Method()
  async enable() {
    this.disabled = false;
  }

  componentWillLoad() {}
  /** Method: updateStyles()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle
  }

  componentWillUpdate() {}

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <button class={this.getCssClassMap()} disabled={this.disabled}>
          <slot />
        </button>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.button,
      this.customClass && this.customClass,
      this.size && classes[`button--size-${this.size}`],
      this.variant && classes[`button--variant-${this.variant}`],
      this.disabled && classes[`button--disabled`]
    );
  }
}
