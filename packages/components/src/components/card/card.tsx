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
    const cardElement = (
      <div class={this.getCssClassMap()}>
        <div class={classes.card__body}>
          <slot />
        </div>
      </div>
    );

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        {!!this.href ? (
          <a href={this.href} target={this.target}>
            {cardElement}
          </a>
        ) : (
          cardElement
        )}
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
