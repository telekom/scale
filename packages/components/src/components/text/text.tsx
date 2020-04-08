import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './text.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
import { getTheme } from '../../theme/theme';

const variants = () => {
  const variantClasses = {};
  const themeVariants = getTheme().typography.variants;
  Object.keys(themeVariants).map(variant => {
    variantClasses[`text--variant-${variant}`] = themeVariants[variant];
  });
  return variantClasses;
};

@Component({
  tag: 'scale-text',
  shadow: true,
})
export class Text implements Base {
  /** (optional) Text class */
  @Prop() customClass?: string = '';
  /** (optional) Text variant */
  @Prop() variant?: string = 'body';
  /** (optional) Text tag */
  @Prop() tag?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Text', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    this.stylesheet.addRules(variants());
    const Tag = this.tag || 'p';
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag class={this.getCssClassMap()}>
          <slot />
        </Tag>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.text,
      this.customClass && this.customClass,
      this.variant && classes[`text--variant-${this.variant}`]
    );
  }
}
