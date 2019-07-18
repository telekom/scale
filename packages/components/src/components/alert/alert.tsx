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
  @Prop() customClass?: string = '';
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop({reflectToAttr: true}) title: string;
  @Prop({reflectToAttr: true}) opened: boolean;
  @Prop() timeout?: number | boolean;
  @Prop() icon?: string = '';
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
    if (this.timeout !== undefined) {
      setTimeout(this.onCloseAlert, this.timeout);
    } else if (this.timeout !== undefined && this.timeout === true) {
      let defaultTimeout = 100;
      setTimeout(this.onCloseAlert, defaultTimeout);
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
        <a class="close" onClick={this.onCloseAlert}>
          {this.close}
        </a>
        <div class="alert--icon">
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

