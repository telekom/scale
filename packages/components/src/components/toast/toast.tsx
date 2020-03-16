import {
  Component,
  Prop,
  Method,
  h,
  State,
  Element,
  Host,
} from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { formatDistance, subSeconds } from 'date-fns';
import { styles } from './toast.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-toast',
  shadow: true,
})
export class Toast implements Base {
  /** (optional) Toast class */
  @Prop() customClass?: string = '';
  /** (optional) Toast size */
  @Prop() size?: string = '';
  /** (optional) Toast variant */
  @Prop() variant?: string = '';
  /** (optional) Toast opened */
  @Prop({ reflectToAttr: true }) opened?: boolean;
  /** (optional) Toast autohide time */
  @Prop() autoHide?: boolean | number = false;
  /** (optional) Animated toast */
  @Prop() animated?: boolean = true;
  /** (optional) Toast time */
  @Prop() time?: number;
  /** (optional) Toast position at the top */
  @Prop() positionTop?: number = 12;
  /** (optional) Toast position right */
  @Prop() positionRight?: number = 12;
  /** (optional) Toast fade duration */
  @Prop() fadeDuration?: number = 500;

  /** (optional) Toast state progress */
  @State() progress: number = 0;
  /** (optional) Toast state height with offset */
  @State() toastHeightWithOffset: number = 0;

  @Element() element: HTMLElement;

  /** (optional) Injected jss styles */
  @Prop({ reflectToAttr: true }) styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Toast', styles) stylesheet: StyleSheet;

  hideToast: boolean = false;

  timerId = null;

  componentWillLoad() {}

  componentDidUnload() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }
  }
  componentWillUpdate() {}

  close = () => {
    clearInterval(this.timerId);
    this.hideToast = true;
    setTimeout(() => {
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }, this.fadeDuration);
  };

  getTime = () => {
    const formattedTime =
      this.time &&
      formatDistance(subSeconds(this.time, 3), new Date(), { addSuffix: true });
    return formattedTime;
  };

  setToastTimeout = () => {
    if (this.opened && this.autoHide !== false && !this.timerId) {
      this.timerId = setInterval(() => {
        this.progress += 1 / (this.getAutoHide() / 1000);
        if (this.progress >= 100) {
          this.close();
        }
      }, 10);
    }
  };

  /** Toast method: open() */
  @Method()
  async open() {
    this.opened = true;
    this.hideToast = false;
  }

  render() {
    const { classes } = this.stylesheet;
    this.setToastTimeout();
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <style>{this.transitions(this.toastHeightWithOffset)}</style>
        <style>{this.animationStyle(this.toastHeightWithOffset)}</style>
        <div class={this.getCssClassMap()}>
          <div class={classes.toast__header}>
            <slot name="header" />
            header
            <small>{this.getTime()}</small>
            <a onClick={this.close}>
              <span aria-hidden="true">&times;</span>
            </a>
          </div>
          {this.autoHide && (
            <div
              class={classes.toast__progress}
              style={{ width: `${this.progress}%` }}
            >
              &nbsp;
            </div>
          )}
          <div class={classes.toast__body}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  transitions = offset => `
    @keyframes fadeIn {
      from {
        opacity: 0;
        top: -${offset}px;
      }
      to {
        opacity: 1;
        top: ${this.positionTop}px;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        top: ${this.positionTop}px;
      }
      to {
        opacity: 0;
        top: -${offset}px;
      }
    }
  `;

  animationStyle = offset => {
    this.stylesheet.addRule('toast--show', {
      right: `${this.positionRight}px`,
      animation: `fadeIn ${this.fadeDuration / 1000}s ease-in-out`,
      top: `${this.positionTop}px`,
      opacity: 1,
    });
    this.stylesheet.addRule('toast--hide', {
      right: `${this.positionRight}px`,
      animation: `fadeOut ${this.fadeDuration / 1000}s ease-in-out`,
      top: `-${offset}px`,
      opacity: 0,
    });
  };

  getToastHeightWithOffset() {
    const { classes } = this.stylesheet;
    const toastHeight = this.element.shadowRoot.querySelector(
      `.${classes.toast}`
    ).scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionTop;
  }

  getAutoHide() {
    if (
      typeof this.autoHide === 'number' ||
      typeof this.autoHide === 'string'
    ) {
      return Number(this.autoHide);
    } else {
      return 0;
    }
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.toast,
      this.customClass && this.customClass,
      this.size && classes[`toast--size-${this.size}`],
      this.variant && classes[`toast--variant-${this.variant}`],
      !!this.opened && classes[`toast--opened`],
      !!!this.hideToast && classes[`toast--show`],
      !!this.hideToast && classes[`toast--hide`]
    );
  }
}
