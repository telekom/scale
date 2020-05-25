import '@proyecto26/animatable-component';
import { KEYFRAMES } from '@proyecto26/animatable-component';
import {
  Component,
  Prop,
  h,
  Element,
  Host,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { combineObjects, CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './modal.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
import { getTheme } from '../../theme/theme';

@Component({
  tag: 'scale-modal',
  shadow: true,
})
export class Modal implements Base {
  hasSlotHeader: boolean;
  hasSlotClose: boolean;
  hasSlotActions: boolean;
  combinedTransitions: any;

  @Element() hostElement: HTMLStencilElement;
  /** (optional) Transition overrides */
  @Prop() transitions?: any;
  /** (optional) Modal class */
  @Prop() customClass?: string = '';
  /** (optional) Modal size */
  @Prop() size?: string = 'default';
  /** (optional) Modal variant */
  @Prop() variant?: string = '';
  /** (optional) If true, the Modal is open. */
  @Prop() opened?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Modal', styles) stylesheet: StyleSheet;

  /** (optional) Callback fired when the component requests to be closed. */
  @Event() scaleClose?: EventEmitter<MouseEvent>;

  constructor() {
    this.close = this.close.bind(this);
    this.animateComponent = this.animateComponent.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  @Watch('opened')
  async watchHandler() {
    await this.animateComponent();
  }

  async close(event?: MouseEvent) {
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

  decorateScrollContainer() {
    const scrollContainer = this.hostElement.shadowRoot.querySelector(
      `.${this.stylesheet.classes['modal__scroll-container']}`
    );
    const modalHeader = this.hostElement.shadowRoot.querySelector(
      `.${this.stylesheet.classes.modal__header}`
    );
    setTimeout(() => {
      const hasVerticalScrollbar =
        scrollContainer.scrollHeight > scrollContainer.clientHeight;

      if (hasVerticalScrollbar) {
        modalHeader.classList.add(
          this.stylesheet.classes['modal__header-scroll']
        );
      }
    });
  }

  async animateComponent() {
    const direction = this.opened ? 'IN' : 'OUT';

    if (!this.hostElement.shadowRoot) {
      // in this case we are doing SSR, so we can skip animations
      return null;
    }
    await this.waitForChildren(this.hostElement.shadowRoot.children);

    this.decorateScrollContainer();

    let combinedTransitions;
    try {
      combinedTransitions = JSON.parse(this.transitions);
    } catch (err) {
      combinedTransitions = this.transitions;
    }
    combinedTransitions = combineObjects(
      getTheme().components.Modal.transitions,
      combinedTransitions
    );

    const { backDrop, modalContent } = combinedTransitions;
    const { transition: transitionModal, ...optionsModal } = modalContent[
      direction
    ];
    const { transition: transitionBackDrop, ...optionsBackDrop } = backDrop[
      direction
    ];

    const animationModal = this.hostElement.shadowRoot
      .querySelector(`.${this.stylesheet.classes.modal__content}`)
      .animate(KEYFRAMES[transitionModal], optionsModal);

    const animationBackdrop = this.hostElement.shadowRoot
      .querySelector(`.${this.stylesheet.classes.modal__backdrop}`)
      .animate(KEYFRAMES[transitionBackDrop], optionsBackDrop);

    const modalClassList = this.hostElement.shadowRoot.querySelector(
      `.${this.stylesheet.classes.modal}`
    ).classList;

    if (direction === 'IN') {
      modalClassList.add(this.stylesheet.classes['modal--opened']);
      document.addEventListener('keydown', this.handleKeyDown);
    }

    animationBackdrop.play();
    animationModal.play();

    return new Promise(resolve => {
      animationModal.onfinish = function() {
        if (direction === 'OUT') {
          modalClassList.remove(this.stylesheet.classes['modal--opened']);
          document.removeEventListener('keydown', this.handleKeyDown);
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
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.close(event);
    }
  }
  componentDidLoad() {
    this.animateComponent();
  }

  render() {
    const { classes } = this.stylesheet;

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

              <div class={classes['modal__scroll-container']}>
                <div class={classes.modal__body}>
                  <slot />
                </div>
              </div>

              <div class={classes.modal__actions}>
                <slot name="modal-actions" />
              </div>
            </div>
          </div>
        </animatable-component>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.modal,
      this.customClass && this.customClass,
      this.size && classes[`modal--size-${this.size}`],
      this.variant && classes[`modal--variant-${this.variant}`]
    );
  }
}
