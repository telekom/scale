import { Component, Prop, h, Host, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './input-label.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-input-label',
  shadow: true,
})
export class InputLabel implements Base {
  /** (optional) Input text class */
  @Prop() customClass?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('InputLabel', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  /** Method: updateStyles()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle;
  }

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <slot />
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes['input-label'],
      this.customClass && this.customClass
    );
  }
}
