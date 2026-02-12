/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { animateTo, KEYFRAMES } from '../../utils/animate';
import { isFocusable, isHidden, queryShadowRoot } from '../../utils/focus-trap';
import { emitEvent } from '../../utils/utils';

const supportsResizeObserver = 'ResizeObserver' in window;

type CloseEventTrigger = 'CLOSE_BUTTON' | 'ESCAPE_KEY' | 'BACKDROP';

export interface BeforeCloseEventDetail {
  trigger: CloseEventTrigger;
}

/*
  TODO
  ====
  - [ ] save focus of last element previous to opening the modal
  - [ ] put animations in tokens
 */

@Component({
  tag: 'scale-modal',
  styleUrl: './modal.css',
  shadow: true,
})
export class Modal {
  @Element() hostElement: HTMLElement;
  /** Modal heading */
  @Prop() heading: string;
  /** (optional) Modal size */
  @Prop() size?: string = 'default';
  /** (optional) If `true`, the Modal is open. */
  @Prop({ reflect: true, mutable: true }) opened?: boolean = false;
  /** (optional) Transition duration */
  @Prop() duration?: number = 200;
  /** (optional) Label for close button */
  @Prop() closeButtonLabel?: string = 'Close';
  /** (optional) title for close button */
  @Prop() closeButtonTitle?: string = 'Close';
  /** (optional) hide close button */
  @Prop() omitCloseButton?: boolean = false;
  /** (optional) Alignment of action buttons */
  @Prop() alignActions?: 'right' | 'left' = 'right';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) allow to inject css style {overflow: hidden} to body when modal is open */
  @Prop() allowInjectingStyleToBody: boolean = false;

  /** What actually triggers opening/closing the modal */
  @State() isOpen: boolean = this.opened || false;
  /** Check wheter there are actions slots, style accordingly */
  @State() hasActionsSlot: boolean = false;
  /** Check wheter there's content in the body, style accordingly */
  @State() hasBody: boolean = false;
  /** Useful for toggling scroll-specific styles */
  @State() hasScroll: boolean = false;
  /** store document body original overflow style if applicable, this is useful when modal opens and inject overflow style to body */
  @State() bodyOverflowValue: string = '';

  /** Fires when the modal has been opened */
  @Event({ eventName: 'scale-open' }) scaleOpen: EventEmitter<void>;

  /** Fires on every close attempt. Calling `event.preventDefault()` will prevent the modal from closing */
  @Event({ eventName: 'scale-before-close' })
  scaleBeforeClose: EventEmitter<BeforeCloseEventDetail>;

  /** Fires when the modal has been closed */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<void>;

  private closeButton: HTMLButtonElement | HTMLScaleButtonElement;
  private modalContainer: HTMLElement;
  private modalWindow: HTMLElement;
  private modalBody: HTMLElement;
  private focusableElements: HTMLElement[] = [];
  // @ts-ignore
  private resizeObserver: ResizeObserver;

  handleKeypress = (event: KeyboardEvent) => {
    if (!this.isOpen) {
      return;
    }
    if (event.key === 'Escape') {
      this.emitBeforeClose('ESCAPE_KEY');
    }
  };

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  /**
   * Set `hasActionsSlot` and `hasBody`.
   */
  componentWillRender() {
    const actionSlots = this.hostElement.querySelectorAll('[slot="action"]');
    const bodySlot = Array.from(
      this.hostElement.shadowRoot.querySelectorAll('slot')
    ).find((x) => !x.name);

    this.hasActionsSlot = actionSlots.length > 0;
    if (bodySlot != null) {
      this.hasBody = bodySlot.assignedElements().length > 0;
    }
  }

  emitBeforeClose(trigger: CloseEventTrigger) {
    const emittedEvent = emitEvent(this, 'scale-before-close', { trigger });
    const prevented = emittedEvent?.defaultPrevented;
    if (!prevented) {
      this.opened = false;
    }
  }

  componentDidLoad() {
    // Query all focusable elements and store them in `focusableElements`.
    // Needed for the "focus trap" functionality.
    this.focusableElements = queryShadowRoot(
      this.hostElement.shadowRoot,
      (el) => isHidden(el) || el.matches('[data-focus-trap-edge]'),
      isFocusable
    );
    // Set `hasScroll` state dynamically on resize.
    if (supportsResizeObserver) {
      // @ts-ignore
      this.resizeObserver = new ResizeObserver(() => {
        this.setHasScroll();
      });
      this.resizeObserver.observe(this.modalBody as Element);
    }
    this.setHasScroll();
  }

  setHasScroll() {
    const container = this.modalBody;
    this.hasScroll = container.scrollHeight > container.clientHeight;
  }

  getFirstFocusableElement(): HTMLElement | null {
    return this.focusableElements[0];
  }

  getLastFocusableElement(): HTMLElement | null {
    return this.focusableElements[this.focusableElements.length - 1];
  }

  handleTopFocus = () => {
    this.attemptFocus(this.getLastFocusableElement());
  };

  handleBottomFocus = () => {
    this.attemptFocus(this.getFirstFocusableElement());
  };

  attemptFocus(element: HTMLElement | null) {
    if (element == null) {
      this.closeButton.focus();
      return;
    }
    element.focus();
  }

  @Watch('opened')
  openedChanged(newValue) {
    if (newValue === true) {
      this.open();
      if (this.allowInjectingStyleToBody) {
        this.bodyOverflowValue = document.body.style.overflow;
        // The following style will disable body from scrolling when modal is open
        document.body.style.setProperty('overflow', 'hidden');
      }
    } else {
      this.close();
      if (this.allowInjectingStyleToBody) {
        // remove injected overflow style or set it to original value
        document.body.style.setProperty('overflow', this.bodyOverflowValue);
      }
    }
  }

  open() {
    this.isOpen = true;
    try {
      animateTo(this.modalWindow, KEYFRAMES.fadeInTop, {
        duration: this.duration,
        delay: this.duration * 0.5,
      });
      const anim = animateTo(this.modalContainer, KEYFRAMES.fadeIn, {
        duration: this.duration,
      });
      anim.addEventListener('finish', () => {
        this.attemptFocus(this.getFirstFocusableElement());
        emitEvent(this, 'scale-open');
      });
      this.hostElement.addEventListener('keydown', this.handleKeypress);
    } catch (err) {
      emitEvent(this, 'scale-open');
    }
  }

  close() {
    try {
      const anim = animateTo(this.modalContainer, KEYFRAMES.fadeOut, {
        duration: this.duration,
      });
      anim.addEventListener('finish', () => {
        this.isOpen = false;
        emitEvent(this, 'scale-close');
      });
      this.hostElement.removeEventListener('keydown', this.handleKeypress);
    } catch (err) {
      this.isOpen = false;
      emitEvent(this, 'scale-close');
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          ref={(el) => (this.modalContainer = el)}
          class={this.getCssClassMap()}
          part={classNames('base', this.isOpen && 'open')}
        >
          <div
            class="modal__backdrop"
            part="backdrop"
            onClick={() => this.emitBeforeClose('BACKDROP')}
          ></div>
          <div
            data-focus-trap-edge
            onFocus={this.handleTopFocus}
            tabindex="0"
          ></div>
          <div
            class="modal__window"
            part={classNames('window', this.size && `size-${this.size}`)}
            ref={(el) => (this.modalWindow = el)}
            role="dialog"
            aria-modal="true"
            aria-label={this.heading}
          >
            <div
              class="modal__header"
              part={classNames('header', this.hasScroll && 'has-scroll')}
            >
              <h2 class="modal__heading" part="heading">
                {this.heading}
              </h2>
              {!this.omitCloseButton && (
                <button
                  ref={(el) => (this.closeButton = el)}
                  class="modal__close-button"
                  part="close-button"
                  onClick={() => this.emitBeforeClose('CLOSE_BUTTON')}
                  aria-label={this.closeButtonLabel}
                  title={this.closeButtonTitle}
                >
                  <slot name="close-icon">
                    <scale-icon-action-circle-close decorative />
                  </slot>
                </button>
              )}
            </div>
            <div
              ref={(el) => (this.modalBody = el)}
              class="modal__body-wrapper"
              part={classNames('body-wrapper', this.hasBody && 'has-body')}
            >
              <div
                class="modal__body"
                part={classNames('body', this.hasBody && 'has-body')}
              >
                <slot></slot>
              </div>
            </div>
            <div
              class="modal__actions"
              part={classNames(
                'actions',
                `align-${this.alignActions}`,
                this.hasActionsSlot && 'has-actions',
                this.hasScroll && 'has-scroll'
              )}
            >
              <slot name="action"></slot>
            </div>
          </div>
          <div
            data-focus-trap-edge
            onFocus={this.handleBottomFocus}
            tabindex="0"
          ></div>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'modal',
      this.isOpen && 'modal--is-open',
      this.hasActionsSlot && 'modal--has-actions',
      `modal--align-actions-${this.alignActions}`,
      this.hasScroll && 'modal--has-scroll',
      this.hasBody && 'modal--has-body',
      this.size && `modal--size-${this.size}`
    );
  }
}
