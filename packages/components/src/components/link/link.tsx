import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './link.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-link',
  shadow: true,
})
export class Link implements Base {
  /** (optional) Link class */
  @Prop() customClass?: string = '';
  /** (optional) Link href */
  @Prop() href?: string = '';
  /** (optional) Disabled link */
  @Prop() disabled?: boolean = false;
  /** (optional) Link underline */
  @Prop() underline?: boolean = false;
  /** (optional) Link open a new tag */
  @Prop() openNewTab?: boolean = false;
  /** (optional) Link variant */
  @Prop() variant?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Link', styles) stylesheet: StyleSheet;

  componentWillLoad() {}

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        {!!this.href && !this.disabled ? (
          <a
            href={this.href}
            class={this.getCssClassMap()}
            target={this.openNewTab ? '_blank' : null}
          >
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
      classes.link,
      this.customClass && this.customClass,
      this.variant && classes[`link--variant-${this.variant}`],
      this.disabled && classes[`link--disabled`],
      this.underline && classes[`link--underline`]
    );
  }
}
