import { Component, Prop, h, Element, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './card.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-card',
  shadow: true,
})
export class Card implements Base {
  @Element() hostElement: HTMLElement;
  /** (optional) Card class */
  @Prop() customClass?: string = '';
  /** (optional) Card size */
  @Prop() size?: string = '';
  /** (optional) Card variant */
  @Prop() variant?: string = '';
  /** (optional) Card image at the top */
  @Prop() imageTop?: string;
  /** (optional) Card image alternative at the top */
  @Prop() imageTopAlt?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Card', styles) stylesheet: StyleSheet;

  hasSlotHeader: boolean;
  hasSlotFooter: boolean;

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotFooter = !!this.hostElement.querySelector('[slot="footer"]');
  }

  render() {
    const { classes } = this.stylesheet;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          {this.hasSlotHeader && (
            <div class={classes.card__header}>
              <slot name="header" />
            </div>
          )}
          {this.imageTop && (
            <img
              class={classes['card__img-top']}
              src={this.imageTop}
              alt={this.imageTopAlt}
            />
          )}
          <div class={classes.card__body}>
            <slot />
          </div>
          {this.hasSlotFooter && (
            <div class={classes.card__footer}>
              <slot name="footer" />
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;

    return classNames(
      classes.card,
      this.customClass && this.customClass,
      this.size && classes[`card--size-${this.size}`],
      this.variant && classes[`card--variant-${this.variant}`]
    );
  }
}
