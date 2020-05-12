import { Component, Prop, h, Element, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './table.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-table',
  shadow: false,
})
export class Table implements Base {
  @Element() hostElement: HTMLElement;
  /** (optional) Tag class */
  @Prop() customClass?: string = '';
  /** (optional) Display sort arrows on/off */
  @Prop() showSort?: boolean = false;
  /** (optional) Visual size */
  @Prop() size?: 'small' | 'big' = 'small';
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Table', styles) stylesheet: StyleSheet;
  /** object of the slots in use */
  slots: { header?: Element; table?: Element } = {};

  componentWillLoad() {
    this.hostElement.querySelectorAll('th').forEach(th => {
      th.insertAdjacentHTML(
        'afterbegin',
        `
          <span class="scale-sort-indicator">
            <svg width="24px" height="24px" viewBox="0 0 24 24">
              <polygon points="11.8284271 16.6568542 14.6568542 13.8284271 9 13.8284271" />
              <polygon points="11.8284271 8 14.6568542 10.8284271 9 10.8284271" />
            </svg>
          </span>`
      );
    });
  }
  componentWillUpdate() {}
  componentDidUnload() {}

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
      this.size && classes[`table--size-${this.size}`],
      this.showSort && classes[`table--sortable`]
    );
  }
}
