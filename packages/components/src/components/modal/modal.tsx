import '@proyecto26/animatable-component';
import { KEYFRAMES } from '@proyecto26/animatable-component';
import {
  Component,
  Prop,
  h,
  Method,
  Element,
  Host,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './modal.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-modal',
  shadow: true,
})
export class Modal implements Base {
  hasSlotHeader: boolean;
  hasSlotClose: boolean;
  hasSlotActions: boolean;

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

  /** (optional) Close event */
  @Event() scaleClose: EventEmitter<MouseEvent>;

  constructor() {
    this.close = this.close.bind(this);
  }

  @Watch('opened')
  watchHandler(opened: boolean) {
    if (opened && !this.opened) {
      return this.open();
    }
    if (!opened && this.opened) {
      return this.close();
    }
    return null;
  }

  /** Open the modal */
  @Method()
  async open() {
    this.opened = true;
    await this.animateComponent('IN');
  }

  /** Close the modal */
  @Method()
  async close(event?: MouseEvent) {
    await this.animateComponent('OUT');
    this.opened = false;
    this.scaleClose.emit(event);
  }

  waitForChildren(children) {
    return new Promise(resolve => {
      const findChildren = () =>
        children.length
          ? resolve()
          : setTimeout(() => {
              findChildren();
            });

      findChildren();
    });
  }

  async animateComponent(direction: 'IN' | 'OUT') {
    await this.waitForChildren(this.hostElement.shadowRoot.children);
    // @ts-ignore getRule will not return the raw value so I'm using untyped properties to get to it.
    const { options, effects } = this.stylesheet.rules.raw.animations;

    const animationModal = this.hostElement.shadowRoot
      .querySelector(`.${this.stylesheet.classes.modal__content}`)
      .animate(KEYFRAMES[effects[direction].modalContent], options);

    const animationBackdrop = this.hostElement.shadowRoot
      .querySelector(`.${this.stylesheet.classes.modal__backdrop}`)
      .animate(KEYFRAMES[effects[direction].backDrop], options);

    const modalClassList = this.hostElement.shadowRoot.querySelector(
      `.${this.stylesheet.classes.modal}`
    ).classList;

    if (direction === 'IN') {
      modalClassList.remove(this.stylesheet.classes['modal--hidden']);
    }

    animationBackdrop.play();
    animationModal.play();

    return new Promise(resolve => {
      animationModal.onfinish = function() {
        if (direction === 'OUT') {
          modalClassList.add(this.stylesheet.classes['modal--hidden']);
        }
        resolve();
      }.bind(this);
    });
  }

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotClose = !!this.hostElement.querySelector('[slot="close"]');
    this.hasSlotActions = !!this.hostElement.querySelector(
      '[slot="modal-actions"]'
    );
  }
  componentWillUpdate() {}
  componentDidUnload() {}

  render() {
    const { classes } = this.stylesheet;

    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <animatable-component>
          <div class={this.getCssClassMap()}>
            <div class={classes.modal__backdrop} onClick={this.close}></div>

            <div class={classes.modal__content}>
              {this.hasSlotHeader /* istanbul ignore next */ && (
                <div class={classes.modal__header}>
                  <slot name="header" />
                  <a class={classes.modal__close} onClick={this.close}>
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
        </animatable-component>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes['modal--hidden'],
      classes.modal,
      this.customClass && this.customClass,
      this.size && classes[`modal--size-${this.size}`],
      this.variant && classes[`modal--variant-${this.variant}`],
      this.opened && classes[`modal--opened`]
    );
  }
}
