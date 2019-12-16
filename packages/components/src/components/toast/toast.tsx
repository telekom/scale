import { Component, Prop, Method, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { formatDistance, subSeconds } from 'date-fns';

@Component({
  tag: 't-toast',
  styleUrls: ['toast.css'],
  shadow: true,
})
export class Toast {
  /** (required) Alert class */
  @Prop() public customClass?: string = '';
  @Prop() public size?: string = '';
  @Prop() public theme?: string = '';
  @Prop() public variant?: string = '';
  @Prop({ reflectToAttr: true }) public opened?: boolean;
  @Prop() public autohide?: boolean = true;
  @Prop() public animated?: boolean = true;
  /** (optional) Toast time */
  @Prop() public time?: number;

  private autohideTime = 5000;
  private myTimeout;

  public componentDidUnload() {
    if (this.myTimeout) {
      clearTimeout(this.myTimeout);
    }
  }

  public onCloseToast = () => {
    this.opened = false;
    this.myTimeout = undefined;
    clearTimeout(this.myTimeout);
  };

  @Method()
  public async openToast() {
    this.opened = true;
  }

  public getTime = () => {
    const formattedTime =
      this.time &&
      formatDistance(subSeconds(this.time, 3), new Date(), { addSuffix: true });
    return formattedTime;
  };

  public setToastTimeout = () => {
    if (this.myTimeout === undefined) {
      if (this.opened && this.autohide !== false) {
        this.myTimeout = setTimeout(this.onCloseToast, this.autohideTime);
        return;
      } else {
        return null;
      }
    }
  };

  public render() {
    this.setToastTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <div class="toast">
          <div class="toast__header">
            <slot name="header" />
            header
            <small>{this.getTime()}</small>
            <a onClick={this.onCloseToast}>
              <span aria-hidden="true">&times;</span>
            </a>
          </div>
          <div class="toast__body">
            <slot />
          </div>
        </div>
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'toast',
      this.customClass && this.customClass,
      this.size && `toast--size-${this.size}`,
      this.theme && `toast--theme-${this.theme}`,
      this.variant && `toast--variant-${this.variant}`
    );
  }
}
