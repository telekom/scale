import { Component, Prop, h, Host, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './progress-bar.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-progress-bar',
  shadow: true,
})
export class ProgressBar implements Base {
  /** (optional) Progress bar class */
  @Prop() customClass?: string = '';
  /** (required) Progress bar percentage */
  @Prop() percentage: number;
  /** (optional) Progress bar variant */
  @Prop() variant?: string;
  /** (optional) Progress bar stroke width */
  @Prop() strokeWidth?: number = 6;
  /** (optional) Progress bar percentage text */
  @Prop() showText?: boolean;
  /** (optional) Progress text display inside bar */
  @Prop() textInside?: boolean;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('ProgressBar', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  /** Method: updateStyles()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle;
  }

  render() {
    const { classes } = this.stylesheet;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={classes['progress-bar']}>
          <div
            class={classes['progress-bar__outer']}
            style={{ height: `${this.strokeWidth}px` }}
          >
            <div
              class={`${
                classes['progress-bar__inner']
              } ${this.getCssClassMap()}`}
              style={{ width: `${this.percentage}%` }}
            >
              {!!this.textInside && (
                <div
                  class={classes['progress-bar__inner-text']}
                >{`${this.percentage}%`}</div>
              )}
            </div>
          </div>

          {!!this.showText && (
            <div
              class={classes['progress-bar__text']}
            >{`${this.percentage}%`}</div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;

    return classNames(
      classes['progress-bar'],
      this.customClass && this.customClass,
      this.variant && classes[`progress-bar--variant-${this.variant}`]
    );
  }
}
