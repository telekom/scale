import { Component, Prop, h, Host, Element } from '@stencil/core';
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
  /** (optional) Visual variant */
  @Prop() variant?: 'regular' | 'compressed' = 'regular';
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Table', styles) stylesheet: StyleSheet;
  /** object of the slots in use */
  slots: { header?: Element; table?: Element } = {};

  componentWillUpdate() {}
  componentDidUnload() {}

  render() {
    // on initial render
    if (!this.slots.table) {
      // build object of slots
      // @ts-ignore - fromEntries should be fine here
      this.slots = Object.fromEntries(
        Array.from(this.hostElement.children).map(child => [child.slot, child])
      );

      // when showSort is enabled insert indicator arrows for each th of the found table
      if (this.showSort && this.slots.table) {
        this.slots.table.querySelectorAll('th').forEach(th => {
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

      // append header slot to thead
      if (this.slots.header) {
        this.slots.table
          .querySelector('thead')
          .insertAdjacentElement('afterbegin', this.slots.header);
      }
    }

    return (
      <Host class={this.getCssClassMap()}>
        <style>{this.stylesheet.toString()}</style>
        <slot name="table" />
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.table,
      this.customClass && this.customClass,
      this.variant && classes[`table--variant-${this.variant}`],
      this.showSort && classes[`table--sortable`]
    );
  }
}
