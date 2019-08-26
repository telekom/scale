import { Component, h, Prop } from "@stencil/core";
import { CssClassMap } from "../../utils/utils";
import classNames from "classnames";

@Component({
  tag: "t-tag",
  styleUrl: "tag.css",
  shadow: true
})
export class Tag {
  /** (optional) Tag variant */
  @Prop() variant?: string = "";
  /** (optional) Tag on an <a> element */
  @Prop() link?: boolean = false;

  private getCssClassMap(): CssClassMap {
    return classNames("tag", this.variant && `tag--variant--${this.variant}`);
  }

  render() {
    if (this.link)
      return (
        <a href="#" class={this.getCssClassMap()}>
          <slot />
        </a>
      );
    return (
      <div class={this.getCssClassMap()}>
        <slot />
      </div>
    );
  }
}
