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
  /** (optional) Card variant */
  @Prop() variant?: string = '';
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Card', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <div class={classes.card__body}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;

    return classNames(
      classes.card,
      this.customClass && this.customClass,
      this.variant && classes[`card--variant-${this.variant}`]
    );
  }
}
