import { Component, Prop, h, Method, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-alert',
  styleUrls: ['alert.css'],
  shadow: true,
})
export class Alert {
  @Element() public hostElement: HTMLStencilElement;
  /** (optional) Alert class */
  @Prop() public customClass?: string = '';
  /** (optional) Alert size */
  @Prop() public size?: string = '';
  /** (optional) Alert theme */
  @Prop() public theme?: string = '';
  /** (optional) Alert variant */
  @Prop() public variant?: string = '';
  /** (optional) Alert title */
  @Prop({ reflectToAttr: true }) public headline: string;
  /** (optional) Alert opened */
  @Prop({ reflectToAttr: true }) public opened: boolean;
  /** (optional) Alert timeout */
  @Prop() public timeout?: boolean | number = false;
  /** (optional) Alert icon */
  @Prop() public icon?: string = '';

  private defaultTimeout = 2000;

  private hasSlotClose: boolean;

  public componentWillLoad() {
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
  }

  public close = () => {
    this.opened = false;
  };

  /** Alert method: open() */
  @Method()
  public async open() {
    this.opened = true;
  }

  public onCloseAlertWithTimeout = () => {
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

        <a class="alert__close" onClick={this.close}>
          {this.hasSlotClose ? (
            <div class="alert__close-icon">
              <slot name="close" />
            </div>
          ) : (
            'x'
          )}
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
