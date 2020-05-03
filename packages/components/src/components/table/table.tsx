import {Component, Prop, h, Host, Element} from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './table.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-table',
  shadow: true,
})
export class Table implements Base {
  /** (optional) Tag class */
  @Prop() customClass?: string = '';

  /** (optional) Visual variant */
  @Prop() variant?: 'regular' | 'compressed' = 'regular';

  @Element() element: HTMLElement;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Table', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    return (
      <Host class={this.getCssClassMap()}>
        <style>{this.stylesheet.toString()}</style>
        <slot />
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.table,
      this.customClass && this.customClass,
      this.variant && classes[`table--variant-${this.variant}`]
    );
  }
}
