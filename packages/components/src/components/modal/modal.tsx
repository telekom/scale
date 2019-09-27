import { Component, Prop, h, Method, Element } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { CssClassMap } from "../../utils/utils";
import classNames from "classnames";

@Component({
  tag: "t-modal",
  styleUrl: "modal.css",
  shadow: true
})
export class Modal {
  @Element() hostElement: HTMLStencilElement;
  /** (optional) Modal size */
  @Prop() size?: string = "";
  /** (optional) Modal theme */
  @Prop() theme?: string = "";
  /** (optional) Modal variant */
  @Prop() variant?: string = "";
  @Prop() opened?: boolean = false;
  @Prop() close?: string = "x";

  private hasSlotHeader: boolean;
  private hasActions: boolean;

  private getCssClassMap(): CssClassMap {
    return classNames(
      "modal",
      this.size && `modal--size-${this.size}`,
      this.theme && `modal--theme-${this.theme}`,
      this.variant && `modal--variant-${this.variant}`
    );
  }
  @Method()
  async openModal() {
    this.opened = true;
  }
  @Method()
  async onCloseModal() {
    this.opened = false;
  }

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasActions = !!this.hostElement.querySelector('[slot="modal-actions"]');
  }

  render() {
    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <div class="modal__backdrop" onClick={() => this.onCloseModal}></div>

        <div class="modal">
          {this.hasSlotHeader && (
            <div class="modal__header">
              <slot name="header" />
              <a class="modal__close" onClick={this.onCloseModal}>
                {this.close}
              </a>
            </div>
          )}

          <div class="modal__body">
            <slot />
            {!this.hasSlotHeader && (
              <a class="modal__close" onClick={this.onCloseModal}>
                {this.close}
              </a>
            )}
          </div>

          {this.hasActions && (
            <div class="modal__actions">
              <slot name="modal-actions" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
