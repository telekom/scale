import { Component, h, Prop, Host, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './tag.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-tag',
  shadow: true,
})
export class Tag implements Base {
  /** (optional) Tag class */
  @Prop() customClass?: string = '';
  /** (optional) Tag variant */
  @Prop() variant?: string = '';
  /** (optional) Tag pill */
  @Prop() pill?: boolean = false;
  /** (optional) Tag on an <a> element */
  @Prop() link?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Tag', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  /** Method: updateStyles()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle
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
          <div class={this.getCssClassMap()}>
            <slot />
          </div>
        )}
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.tag,
      this.customClass && this.customClass,
      this.variant && classes[`tag--variant-${this.variant}`],
      this.pill && classes[`tag--pill`],
      !!this.link && classes[`tag--link`]
    );
  }
}
