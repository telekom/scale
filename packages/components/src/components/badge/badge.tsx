import { Component, Prop, h, Host, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './badge.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-badge',
  shadow: true,
})
export class Badge implements Base {
  /** (optional) Badge class */
  @Prop() customClass?: string = '';
  /** (optional) Badge size */
  @Prop() size?: string = '';
  /** (optional) Badge variant */
  @Prop() variant?: string = '';
  /** (optional) Badge pill */
  @Prop() pill?: boolean = false;
  /** (optional) Badge link */
  @Prop() link?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Badge', styles) stylesheet: StyleSheet;

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
        {!!this.link ? (
          <a href={this.link} class={this.getCssClassMap()}>
            <slot />
          </a>
        ) : (
          <span class={this.getCssClassMap()}>
            <slot />
          </span>
        )}
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.badge,
      this.customClass && this.customClass,
      this.size && classes[`badge--size-${this.size}`],
      this.variant && classes[`badge--variant-${this.variant}`],
      this.pill && classes[`badge--pill`],
      !!this.link && classes[`badge--link`]
    );
  }
}
