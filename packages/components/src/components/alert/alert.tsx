import {Component, Prop, h, Method} from '@stencil/core';
import {CssClassMap} from '../../utils/utils';
import classNames from 'classnames';

const defaultTimeout = 2000;

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
  @Prop() timeout?: boolean | number = false;
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
  async open() {
    this.opened = true;
  }

  onCloseAlertWithTimeout = () => {
    if (this.timeout !== false) {
      if (typeof this.timeout === 'number') {
        setTimeout(this.onCloseAlert, this.timeout);
      } else {
        setTimeout(this.onCloseAlert, defaultTimeout);
      }
    } else {
      return null
    }
  };

  render() {
    this.onCloseAlertWithTimeout();

    if (!this.opened) {
      return null;
    }

    return (

      <div class={this.getCssClassMap()}>
        <div class="alert__body">
          <div class="alert__icon">
            {this.icon}
          </div>
          <div class="alert__content">
            <div class="alert__title">
              {this.title}
            </div>
            <slot/>
          </div>
        </div>

        <a class="alert__close" onClick={this.onCloseAlert}>
          {this.close}
        </a>

      </div>
    );
  }
}

