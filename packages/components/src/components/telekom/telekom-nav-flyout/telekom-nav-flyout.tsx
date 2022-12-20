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
  h,
  Host,
  Element,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import cx from 'classnames';

// TODO make util
const animFinished = (el: HTMLElement | ShadowRoot) => {
  return Promise.all(
    el.getAnimations({ subtree: true }).map((x) => x.finished)
  );
};

@Component({
  tag: 'scale-telekom-nav-flyout',
  styleUrl: 'telekom-nav-flyout.css',
  shadow: true,
})
export class TelekomNavItem {
  @Element() hostElement: HTMLStencilElement;

  @Prop({ reflect: true, mutable: true }) expanded?: boolean = false;
  @Prop() triggerSelector?: string;
  // TODO rename to something nice/consistent
  // or maybe invert logic (no hover by default)
  @Prop() noHover?: boolean = false;

  @State() isExpanded: boolean = this.expanded;
  @State() animationState: 'in' | 'out' | undefined;

  private parentElement: HTMLElement;

  @Listen('keydown', { target: 'window' })
  handleWindowKeydown(event) {
    if (!this.isExpanded) {
      return;
    }
    if (event.key === 'Escape') {
      this.expanded = false;
      try {
        this.triggerElement.focus();
      } catch (err) {}
    }
  }

  // @Listen('focusin', { target: 'document' })
  // handleDocumentFocusin(event) {
  //   if (!this.isExpanded) {
  //     return;
  //   }
  //   if (!this.hostElement.contains(event.target)) {
  //     this.expanded = false;
  //   }
  // }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event) {
    if (!this.isExpanded) {
      return;
    }
    const { target } = event;
    const isNotTrigger = () =>
      target !== this.triggerElement && !this.triggerElement.contains(target);
    const isNotWithin = () => !this.hostElement.contains(target);
    if (isNotTrigger() && isNotWithin()) {
      this.expanded = false;
    }
  }

  @Watch('expanded')
  expandedChanged(newValue: boolean) {
    newValue ? this.show() : this.hide();
  }

  connectedCallback() {
    this.parentElement = this.hostElement.parentElement;
    if (this.triggerElement == null) {
      return;
    }
    this.triggerElement.setAttribute('aria-haspopup', 'true');
    this.triggerElement.setAttribute('aria-expanded', String(this.expanded));
    this.triggerElement.addEventListener('click', this.handleTriggerClick);
    if (this.noHover === false) {
      this.triggerElement.addEventListener('mouseenter', this.handlePointerIn);
    }
  }

  disconnectedCallback() {
    this.triggerElement.removeEventListener('click', this.handleTriggerClick);
  }

  handleTriggerClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      return;
    }
    event.preventDefault();
    this.expanded = !this.expanded;
    this.expanded ? this.show() : this.hide();
    this.parentElement.removeEventListener('mouseleave', this.handlePointerOut);
  };

  handlePointerIn = () => {
    if (this.isExpanded) {
      return;
    }
    this.expanded = true;
    this.parentElement.addEventListener('mouseleave', this.handlePointerOut);
  };

  handlePointerOut = () => {
    this.expanded = false;
    this.parentElement.removeEventListener('mouseleave', this.handlePointerOut);
  };

  @Method()
  async show() {
    this.isExpanded = true;
    this.animationState = 'in';
    requestAnimationFrame(async () => {
      await animFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.triggerElement.setAttribute('aria-expanded', 'true');
    });
  }

  @Method()
  async hide() {
    this.animationState = 'out';
    requestAnimationFrame(async () => {
      await animFinished(this.hostElement.shadowRoot);
      this.animationState = undefined;
      this.isExpanded = false;
      this.triggerElement.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Get the trigger element "on demand".
   * Either query by `trigger-selector` or
   * get the previous sibling.
   */
  get triggerElement(): HTMLElement {
    if (this.triggerSelector) {
      return this.hostElement.ownerDocument.querySelector(
        this.triggerSelector
      ) as HTMLElement;
    }
    return this.hostElement.previousElementSibling as HTMLElement;
  }

  render() {
    return (
      <Host>
        <div
          part={cx('base', this.animationState, {
            expanded: this.isExpanded,
          })}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
