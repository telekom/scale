import { Component, Prop, Method, h } from "@stencil/core";
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
  @Prop() customClass?: string = "";
  @Prop() size?: string = "";
  @Prop() theme?: string = "";
  @Prop() variant?: string = "";
  @Prop({ reflectToAttr: true }) opened?: boolean;
  @Prop() autohide?: boolean = true;
  @Prop() animated?: boolean = true;
  /** (optional) Toast time */
  @Prop() time?: number;

  private getCssClassMap(): CssClassMap {
    return classNames(
      "toast",
      this.customClass && this.customClass,
      this.size && `toast--size-${this.size}`,
      this.theme && `toast--theme-${this.theme}`,
      this.variant && `toast--variant-${this.variant}`
    );
  }

  private autohideTime = 5000;
  private myTimeout;

  componentDidUnload() {
    if (this.myTimeout) {
      clearTimeout(this.myTimeout);
    }
  }

  onCloseToast = () => {
    this.opened = false;
    this.myTimeout = undefined;
    clearTimeout(this.myTimeout);
  };

  @Method()
  async openToast() {
    this.opened = true;
  }

  getTime = () => {
    const formattedTime =
      this.time &&
      formatDistance(subSeconds(this.time, 3), new Date(), { addSuffix: true });
    return formattedTime;
  };

  setToastTimeout = () => {
    if (this.myTimeout === undefined) {
      if (this.opened && this.autohide !== false) {
        this.myTimeout = setTimeout(this.onCloseToast, this.autohideTime);
        console.log("myTimeout", this.myTimeout);
        return;
      } else {
        return null;
      }
    }
  };

  render() {
    this.setToastTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <div class='toast'>
          <div class='toast__header'>
            <slot name='header' />
            header
            <small>{this.getTime()}</small>
            <a onClick={this.onCloseToast}>
              <span aria-hidden='true'>&times;</span>
            </a>
          </div>
          <div class='toast__body'>
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
