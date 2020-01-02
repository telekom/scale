import { Component, Prop, h, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-alert',
  styleUrls: ['alert.css'],
  shadow: true,
})
export class Alert {
  /** (required) Alert class */
  @Prop() public customClass?: string = '';
  /** (optional) Alert size */
  @Prop() public size?: string = '';
  /** (optional) Alert theme */
  @Prop() public theme?: string = '';
  /** (optional) Alert variant */
  @Prop() public variant?: string = '';
  /** (optional) Alert title */
  @Prop({ reflectToAttr: true }) public headline: string;
  /** (required) Alert opened */
  @Prop({ reflectToAttr: true }) public opened: boolean;
  /** (optional) Alert timeout */
  @Prop() public timeout?: boolean | number = false;
  /** (optional) Alert icon */
  @Prop() public icon?: string = '';
  /** (required) Alert close */
  @Prop() public close?: string = '';

  private defaultTimeout = 2000;

  public onCloseAlert = () => {
    this.opened = false;
  };

  /** (required) Alert method: open() */
  @Method()
  public async open() {
    this.opened = true;
  }

  public onCloseAlertWithTimeout = () => {
    if (this.timeout !== false) {
      if (typeof this.timeout === 'number') {
        setTimeout(this.onCloseAlert, this.timeout);
      } else {
        setTimeout(this.onCloseAlert, this.defaultTimeout);
      }
    } else {
      return null;
    }
  };

  public render() {
    this.onCloseAlertWithTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <div class="alert__body">
          <div class="alert__icon">{this.icon}</div>
          <div class="alert__content">
            <div class="alert__headline">{this.headline}</div>
            <slot />
          </div>
        </div>

        <a class="alert__close" onClick={this.onCloseAlert}>
          {this.close}
        </a>
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'alert',
      this.customClass && this.customClass,
      this.size && `alert--size-${this.size}`,
      this.theme && `alert--theme-${this.theme}`,
      this.variant && `alert--variant-${this.variant}`
    );
  }
}
