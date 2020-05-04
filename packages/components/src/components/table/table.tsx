import { Component, Prop, h, Host, Element, State } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './table.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
import { getSortIndicator, TDirection, SORT_INDICATOR_ID } from './utils';

@Component({
  tag: 'scale-table',
  shadow: true,
})
export class Table implements Base {
  @Element() hostElement: HTMLElement;
  /** (optional) Tag class */
  @Prop() customClass?: string = '';
  /** (optional) Visual variant */
  @Prop() variant?: 'regular' | 'compressed' = 'regular';
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Table', styles) stylesheet: StyleSheet;
  @State() observer;

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  componentWillLoad() {
    const tableChildren = this.hostElement.children[0];

    tableChildren.querySelectorAll('th').forEach(th => {
      if (typeof MutationObserver !== 'undefined') {
        this.observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            const mutationTarget = mutation.target as HTMLElement;
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'aria-sort'
            ) {
              const sortIndicators = tableChildren.querySelectorAll(
                `#${SORT_INDICATOR_ID}`
              );

              sortIndicators.forEach(sortIndicator => {
                sortIndicator.parentNode.removeChild(sortIndicator);
              });

              mutationTarget.insertAdjacentHTML(
                'afterbegin',
                getSortIndicator(
                  mutationTarget.getAttribute('aria-sort') as TDirection
                )
              );
            }
          });
        });

        this.observer.observe(th, {
          attributes: true,
        });
      }
    });
  }

  componentWillUpdate() {}

  render() {
    const tableChildren = this.hostElement.children[0];

    tableChildren.querySelectorAll('th').forEach(th => {
      const sort = th.getAttribute('aria-sort') as TDirection;
      th.insertAdjacentHTML('afterbegin', getSortIndicator(sort));
    });

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
