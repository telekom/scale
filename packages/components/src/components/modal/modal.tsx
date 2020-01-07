import { Component, Prop, h, Method, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-modal',
  styleUrl: 'modal.css',
  shadow: true,
})
export class Modal {
  @Element() public hostElement: HTMLStencilElement;
  /** (optional) Modal class */
  @Prop() public customClass?: string = '';
  /** (optional) Modal size */
  @Prop() public size?: string = '';
  /** (optional) Modal theme */
  @Prop() public theme?: string = '';
  /** (optional) Modal variant */
  @Prop() public variant?: string = '';
  /** (required) Modal opened */
  @Prop({ reflectToAttr: true }) public opened?: boolean = false;

  private hasSlotHeader: boolean;
  private hasSlotClose: boolean;
  private hasSlotActions: boolean;

  /** Modal method: open() */
  @Method()
  public async open() {
    this.opened = true;
  }

  public closeModal = () => {
    this.opened = false;
  };

  /** Modal method: onCloseModal() */
  @Method()
  public async close() {
    this.closeModal()
  }

  public componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
    this.hasSlotActions = !!this.hostElement.querySelector(
      '[slot="modal-actions"]'
    );
  }

  public render() {
    if (!this.opened) {
      return null;
    }

    return (
      <div class={this.getCssClassMap()}>
        <div class="modal__backdrop" onClick={this.closeModal}></div>

        <div class="modal">
          {this.hasSlotHeader /* istanbul ignore next */ && (
            <div class="modal__header">
              <slot name="header" />
              <a class="modal__close" onClick={this.closeModal}>
                {this.hasSlotClose ? (
                  <div class="modal__close-icon">
                    <slot name="close" />
                  </div>
                ) : (
                    'x'
                  )}
              </a>
            </div>
          )}

          <div class="modal__body">
            <slot />
          </div>

          {this.hasSlotActions /* istanbul ignore next */ && (
            <div class="modal__actions">
              <slot name="modal-actions" />
            </div>
          )}
        </div>
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'modal',
      this.customClass && this.customClass,
      this.size && `modal--size-${this.size}`,
      this.theme && `modal--theme-${this.theme}`,
      this.variant && `modal--variant-${this.variant}`
    );
  }
}
