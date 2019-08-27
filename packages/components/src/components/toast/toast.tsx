import { Component, Prop, Method, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-toast',
  styleUrls: ['toast.css'],
  shadow: true,
})
export class Toast {
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop() opened?: boolean = false;
  @Prop() autohide?: boolean = true;
  @Prop() animation?: boolean = true;
  @Prop() delay?: number = 500;
  @Prop() dispose?: boolean = true;
  /** (required) Toast close */
  // @Prop() closeIcon?: string = '';

  private getCssClassMap(): CssClassMap {
    return classNames(
      'toast',
      this.size && `toast--size-${this.size}`,
      this.theme && `toast--theme-${this.theme}`,
      this.variant && `toast--variant-${this.variant}`
    );
  }

  // @Method()
  // async open() {
  //   if(!this.isOpen) {

  //     this.opened = true;
  //   }
  //     this.isOpen = true;
  //   }
  //   @Method()
  //   async hide() {
  //     if(this.isOpen) {

  //       this.opened = false;
  //     }
  //     this.isOpen = false;
  //   }

  //   _cancel = (event) => {
  //     this.hide();
  //     const cancelEvent = new Event('cancel', {bubbles: true, composed: true});
  //     event.target.dispatchEvent(cancelEvent);
  //   }

  onCloseToast = () => {
    this.opened = false;
    console.log('onCloseToast');
  };

  @Method()
  async openToast() {
    this.opened = true;
  }

  render() {
    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>

        <div class="toast__message">

          <div class="toast__header">
            <slot name="header" />
            header
              <small>just now</small>
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
}
