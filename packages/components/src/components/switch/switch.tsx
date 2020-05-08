import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './switch.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-switch',
  shadow: true,
})
export class Switch implements Base {
  /** (optional) Switch class */
  @Prop() customClass?: string = '';
  /** (optional) Active switch */
  @Prop() active?: boolean = false;
  /** (optional) Disabled switch */
  @Prop() disabled?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Switch', styles) stylesheet: StyleSheet;

  componentWillUpdate() {}
  componentDidUnload() {}

  toggleSwitch = () => {
    if (this.disabled) {
      return;
    }
    this.active = !this.active;
  };

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()} onClick={this.toggleSwitch} />
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.switch,
      this.customClass && this.customClass,
      this.active && classes[`switch--active`],
      this.disabled && classes[`switch--disabled`]
    );
  }
}
