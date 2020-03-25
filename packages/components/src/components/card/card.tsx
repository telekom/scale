import { Component, Prop, h, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './card.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-card',
  shadow: true,
})
export class Card implements Base {
  /** (optional) Card class */
  @Prop() customClass?: string = '';
  /** (optional) Link card */
  @Prop() href?: string = '';
  /** (optional) Link card target */
  @Prop() target?: string = '_self';
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Card', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;
    const Tag = !!this.href ? 'a' : 'div';

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag
          class={this.getCssClassMap()}
          {...(!!this.href ? { href: this.href } : {})}
          {...(!!this.href ? { target: this.target } : {})}
        >
          <div class={classes.card__body}>
            <slot />
          </div>
        </Tag>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;

    return classNames(
      classes.card,
      this.customClass && this.customClass,
      !!this.href && classes[`card--interactive`]
    );
  }
}
