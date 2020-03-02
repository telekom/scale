import { Component, Prop, h, Host, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './divider.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-divider',
  shadow: true,
})
export class Divider implements Base {
  /** (optional) Divider class */
  @Prop() customClass?: string = '';
  /** (optional) Divider size */
  @Prop() size?: string = '';
  /** (optional) Divider vertical */
  @Prop() vertical?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Divider', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  /** Method: updateStyle()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle
  }

  render() {
    const { classes } = this.stylesheet;
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          {!this.vertical ? <hr /> : <span class={classes.divider__vertical} />}
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.divider,
      this.customClass && this.customClass,
      this.size && classes[`divider--size-${this.size}`],
      this.vertical && classes[`divider--vertical`]
    );
  }
}
