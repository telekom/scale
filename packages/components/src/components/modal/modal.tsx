import { Component, Prop, h, Method, Element, Host } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './modal.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 't-modal',
  shadow: true,
})
export class Modal implements Base {
  @Element() hostElement: HTMLStencilElement;
  /** (optional) Modal class */
  @Prop() customClass?: string = '';
  /** (optional) Modal size */
  @Prop() size?: string = '';
  /** (optional) Modal variant */
  @Prop() variant?: string = '';
  /** (required) Modal opened */
  @Prop({ reflectToAttr: true }) opened?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Modal', styles) stylesheet: StyleSheet;

  hasSlotHeader: boolean;
  hasSlotClose: boolean;
  hasSlotActions: boolean;

  /** Method: updateStyles()  */
  @Method()
  async updateStyles(newStyle: StyleSheet) {
    this.styles = newStyle;
  }

  /** Modal method: open() */
  @Method()
  async open() {
    this.opened = true;
  }

  closeModal = () => {
    this.opened = false;
  };

  /** Modal method: onCloseModal() */
  @Method()
  async close() {
    this.closeModal();
  }

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
    this.hasSlotActions = !!this.hostElement.querySelector(
      '[slot="modal-actions"]'
    );
  }
  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;

    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <div class={classes.modal__backdrop} onClick={this.closeModal}></div>

          <div class={classes.modal__content}>
            {this.hasSlotHeader /* istanbul ignore next */ && (
              <div class={classes.modal__header}>
                <slot name="header" />
                <a class={classes.modal__close} onClick={this.closeModal}>
                  {this.hasSlotClose ? (
                    <div class={classes['modal__close-icon']}>
                      <slot name="close" />
                    </div>
                  ) : (
                    'x'
                  )}
                </a>
              </div>
            )}

            <div class={classes.modal__body}>
              <slot />
            </div>

            {this.hasSlotActions /* istanbul ignore next */ && (
              <div class={classes.modal__actions}>
                <slot name="modal-actions" />
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.modal,
      this.customClass && this.customClass,
      this.size && classes[`modal--size-${this.size}`],
      this.variant && classes[`modal--variant-${this.variant}`],
      this.opened && classes[`modal--opened`]
    );
  }
}
