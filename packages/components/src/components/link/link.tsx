import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './link.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-link',
  shadow: true,
})
export class Link implements Base {
  /** (optional) Link class */
  @Prop() customClass?: string = '';
  /** (optional) Link href */
  @Prop() href: string;
  /** (optional) Disabled link */
  @Prop() disabled?: boolean = false;
  /** (optional) Link underline */
  @Prop() underline?: boolean = true;
  /** (optional) Link open a new tag */
  @Prop() target?: string = '_self';
  /** (optional) Link variant */
  @Prop() variant?: string = '';
  /** (optional) Icon size */
  @Prop() iconSize?: number = 24;
  /** (optional) Icon only */
  @Prop() icon?: string;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Link', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const Tag = !this.disabled ? 'a' : 'div';

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag
          class={this.getCssClassMap()}
          {...(!this.disabled ? { href: this.href } : {})}
          {...(!this.disabled ? { target: this.target } : {})}
        >
          <slot />
          {this.icon && this.icon !== '' && (
            <scale-icon path={this.icon} size={this.iconSize} />
          )}
        </Tag>
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
