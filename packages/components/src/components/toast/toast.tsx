import { Component, Prop, Method, h, State, Element } from "@stencil/core";
import { CssClassMap } from "../../utils/utils";
import classNames from "classnames";
import { formatDistance, subSeconds } from "date-fns";

@Component({
  tag: "t-toast",
  styleUrls: ["toast.css"],
  shadow: true
})
export class Toast {
  /** (required) Alert class */
  @Prop() public customClass?: string = "";
  @Prop() public size?: string = "";
  @Prop() public theme?: string = "";
  @Prop() public variant?: string = "";
  @Prop({ reflectToAttr: true }) public opened?: boolean;
  @Prop() public autoHide?: boolean | number = false;
  @Prop() public animated?: boolean = true;
  /** (optional) Toast time */
  @Prop() public time?: number;
  @Prop() public positionTop?: number = 12;
  @Prop() public positionRight?: number = 12;
  @Prop() public fadeDuration?: number = 500;
  @State() public progress: number = 0;
  @State() public toastHeightWithOffset: number = 0;

  @Element() private element: HTMLElement;

  private hideToast: boolean = false;

  private timerId = null;

  public componentDidLoad() {
    this.getToastHeightWithOffset()
  }

  public componentDidUnload() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }
  }

  public onCloseToast = () => {
    clearInterval(this.timerId);
    this.hideToast = true;
    setTimeout(() => {
      this.timerId = null;
      this.opened = false;
      this.progress = 0;
    }, this.fadeDuration)
  };

  @Method()
  public async openToast() {
    console.log(this.toastHeightWithOffset)
    this.opened = true;
    this.hideToast = false;
  }

  public getTime = () => {
    const formattedTime =
      this.time &&
      formatDistance(subSeconds(this.time, 3), new Date(), { addSuffix: true });
    return formattedTime;
  };

  public setToastTimeout = () => {
    if (this.opened && this.autoHide !== false && !this.timerId) {
      this.timerId = setInterval(() => {
        this.progress += (1 / (this.getAutoHide() / 1000));
        if (this.progress >= 100) {
          this.onCloseToast();
        }
      }, 10);
    }
  };

  public render() {
    this.setToastTimeout();
    return (
      <div class={this.getCssClassMap()}>
        <style>{this.animationStyle(this.toastHeightWithOffset)}</style>
        <div class='toast__header'>
          <slot name='header' />
          header
            <small>{this.getTime()}</small>
          <a onClick={this.onCloseToast}>
            <span aria-hidden='true'>&times;</span>
          </a>
        </div>
        {this.autoHide &&
          <div class="toast__progress" style={{ width: `${this.progress}%` }}>&nbsp;</div>
        }
        <div class='toast__body'>
          <div style={{ height: '200px' }}>X</div>
          <slot />
        </div>
      </div>
    );
  }

  private animationStyle = (offset) => `
    .toast {
      right: ${this.positionRight}px;
      top: -${offset}px;
    }

    .toast--show {
      animation: fadeIn ${this.fadeDuration / 1000}s ease-in-out;
      animation-timing-function: ease-out;
      top: ${this.positionTop}px;
    }

    .toast--hide {
      animation: fadeOut ${this.fadeDuration / 1000}s ease-in-out;
      animation-timing-function: ease-in;
    }

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
  `

  private getToastHeightWithOffset() {
    const toastHeight = this.element.shadowRoot.querySelector('.toast').scrollHeight;
    this.toastHeightWithOffset = toastHeight + this.positionTop;
  }

  private getAutoHide() {
    if (typeof this.autoHide === 'number' || typeof this.autoHide === 'string') {
      return Number(this.autoHide);
    } else {
      return 0;
    }
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      "toast",
      this.customClass && this.customClass,
      this.size && `toast--size-${this.size}`,
      this.theme && `toast--theme-${this.theme}`,
      this.variant && `toast--variant-${this.variant}`,
      !!this.opened && 'toast--show',
      !!this.hideToast && 'toast--hide'
    );
  }
}
