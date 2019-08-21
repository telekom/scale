import { Component, h, Prop } from "@stencil/core";
import { CssClassMap } from "../../utils/utils";
import classNames from "classnames";

@Component({
  tag: "t-tag",
  styleUrl: "tag.css",
  shadow: true
})
export class Tag {
  /** (optional) Button variant */
  @Prop() variant?: string = "";

  private getCssClassMap(): CssClassMap {
    return classNames("tag", this.variant && `tag--variant-${this.variant}`);
  }

  render() {
    return (
      <div class={this.getCssClassMap()}>
        <slot />
      </div>
    );
  }
}
