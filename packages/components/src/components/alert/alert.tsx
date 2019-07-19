import {Component, Prop, h, Method} from '@stencil/core';
import {CssClassMap} from '../../utils/utils';
import classNames from 'classnames';


@Component({
  tag: 't-alert',
  styleUrls: [
    'alert.css'
  ],
  shadow: true
})
export class alert {
  /** (required) Alert class */
  @Prop() customClass?: string = '';
  /** (optional) Alert size */
  @Prop() size?: string = '';
  /** (optional) Alert theme */
  @Prop() theme?: string = '';
  /** (optional) Alert variant */
  @Prop() variant?: string = '';
  /** (optional) Alert title */
  @Prop({reflectToAttr: true}) title: string;
  /** (required) Alert opened */
  @Prop({reflectToAttr: true}) opened: boolean;
  /** (optional) Alert timeout */
  @Prop() timeout?: number = 2000;
  /** (optional) Alert with default timeout value*/
  @Prop() withTimeout?: boolean = false;
  /** (optional) Alert icon */
  @Prop() icon?: string = '';
  /** (required) Alert close */
  @Prop() close?: string = '';


  private getCssClassMap(): CssClassMap {
    return classNames(
      'alert',
      this.customClass && this.customClass,
      this.size && `alert--size-${this.size}`,
      this.theme && `alert--theme-${this.theme}`,
      this.variant && `alert--variant-${this.variant}`,
    );
  }

  onCloseAlert = () => {
    this.opened = false;
  };

  @Method()
  open() {
    this.opened = true;
  }

  onCloseAlertWithTimeout = () => {

    if(this.timeout !== 2000) {
      this.withTimeout = true
    }
    if (this.withTimeout === true) {
      setTimeout(this.onCloseAlert, this.timeout);
    } else {
      return null
    }

  };

  render() {

    this.onCloseAlertWithTimeout();

    console.log('with timeout', this.withTimeout);
    console.log('timeout', this.timeout);

    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <a class="alert__close" onClick={this.onCloseAlert}>
          {this.close}
        </a>
        <div class="alert__icon">
          {this.icon}
        </div>
        <div class="alert--title">
          {this.title}
        </div>
        <slot/>
      </div>
    );

  }
}

