import { Component, Prop, h, Method, Element, Host } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

import { styles } from './alert.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-alert',
  shadow: true,
})
export class Alert implements Base {
  @Element() hostElement: HTMLStencilElement;
  /** (optional) Alert class */
  @Prop() customClass?: string = '';
  /** (optional) Alert size */
  @Prop() size?: string = '';
  /** (optional) Alert theme */
  @Prop() theme?: string = '';
  /** (optional) Alert variant */
  @Prop() variant?: string = '';
  /** (optional) Alert title */
  @Prop({ reflectToAttr: true }) headline: string;
  /** (optional) Alert opened */
  @Prop({ reflectToAttr: true }) opened: boolean;
  /** (optional) Alert timeout */
  @Prop() timeout?: boolean | number = false;
  /** (optional) Alert icon */
  @Prop() icon?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Alert', styles) stylesheet: StyleSheet;

  defaultTimeout = 2000;

  hasSlotClose: boolean;

  componentWillLoad() {
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
  }

  close = () => {
    this.opened = false;
  };

  /** Alert method: open() */
  @Method()
  async open() {
    this.opened = true;
  }

  onCloseAlertWithTimeout = () => {
    if (this.timeout !== false) {
      if (typeof this.timeout === 'number') {
        setTimeout(this.close, this.timeout);
      } else {
        setTimeout(this.close, this.defaultTimeout);
      }
    } else {
      return null;
    }
  };

  render() {
    const { classes } = this.stylesheet;

    this.onCloseAlertWithTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <div class={classes.alert__body}>
            <div class={classes.alert__icon}>{this.icon}</div>
            <div class={classes.alert__content}>
              <div class={classes.alert__headline}>{this.headline}</div>
              <slot />
            </div>
          </div>

          <a class={classes.alert__close} onClick={this.close}>
            {this.hasSlotClose ? (
              <div class={classes['alert__close-icon']}>
                <slot name="close" />
              </div>
            ) : (
              'x'
            )}
          </a>
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.alert,
      this.customClass && this.customClass,
      this.size && classes[`alert--size-${this.size}`],
      this.theme && classes[`alert--theme-${this.theme}`],
      this.variant && classes[`alert--variant-${this.variant}`]
    );
  }
}
