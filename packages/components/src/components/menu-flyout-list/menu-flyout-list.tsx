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
  Prop,
  h,
  Host,
  Method,
  Element,
  Event,
  EventEmitter,
  Listen,
  State,
} from '@stencil/core';
import classNames from 'classnames';

/*
 * Instead of scaleChange.emit() use emitEvent(this, 'scale-change', { whatever payload });
 * This is to transition from scaleChange (camel) to scale-change (kebab).
 * Because scaleChange does not work with Vue 3;
 *
 * import { emitEvent } from '../../utils/utils';
 *
 */

const name = 'menu-list';
@Component({
  tag: 'scale-menu-flyout-list',
  styleUrl: 'menu-flyout-list.css',
  shadow: true,
})
export class MenuFlyoutList {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */
  /** Used to force a re-render */
  @State() forceRender = 0;

  /* 3. Public Properties (alphabetical) */
  /** (optional) Injected styles */
  @Prop() styles?: string;

  /* 4. Events (alphabetical) */
  /** Event triggered every time the data is edited, changing original rows data */
  @Event({ eventName: 'scale-select' }) scaleSelect: EventEmitter<{
    item: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleSelect' }) scaleSelectLegacy: EventEmitter<{
    item: HTMLElement;
  }>;

  /* 5. Private Properties (alphabetical) */
  /** Keep track of menu element */
  menu: HTMLElement;
  /** Flags to know if content scrollable */
  canScrollUp = false;
  canScrollDown = false;

  /* 6. Lifecycle Events (call order) */
  constructor() {
    this.onMenuScroll = this.onMenuScroll.bind(this);
    this.onMenuWheel = this.onMenuWheel.bind(this);
  }
  connectedCallback() {
    this.resizeHandler();
  }
  componentWillLoad() {}
  componentWillUpdate() {}
  componentDidRender() {}
  componentDidLoad() {}
  componentDidUpdate() {}
  disconnectedCallback() {}

  /* 7. Listeners */
  @Listen('resize', { target: 'window' })
  resizeHandler() {
    // Get actual height for mobile where vh doesn't reflect whether URL bar showing or not
    this.hostElement.style.maxHeight = `calc(${window.innerHeight}px - 20px)`;
  }

  /* 8. Public Methods */
  /** Menu calls this once opened and rendered */
  @Method()
  async opened() {
    if (!this.menu) {
      return;
    }
    this.padForNonOverlayScrollbars();
    this.updateScrollIndicators();
  }

  /* 9. Local Methods */
  getCssClassMap() {
    return classNames(
      name,
      this.canScrollUp && `${name}--can-scroll-up`,
      this.canScrollDown && `${name}--can-scroll-down`
    );
  }

  // Add scrollbar width to menu, to avoid horizontal scrollbars or scrollbar forcing text-overflow
  // This affects firefox and safari, where non-overlay scrollbars eat into content width rather than add
  padForNonOverlayScrollbars() {
    this.menu.style.paddingRight = `0px`;
    const scrollbarWidth = this.menu.offsetWidth - this.menu.clientWidth;
    this.menu.style.paddingRight = `${scrollbarWidth}px`;
  }

  updateScrollIndicators() {
    // Reset
    this.canScrollDown = false;
    this.canScrollUp = false;
    const diff = this.menu.scrollHeight - this.menu.clientHeight;
    // Not scrollable
    if (diff) {
      if (this.menu.scrollTop > 0) {
        this.canScrollUp = true;
      }
      if (this.menu.scrollTop < diff) {
        this.canScrollDown = true;
      }
    }
    this.forceRender++;
  }

  onMenuScroll() {
    this.updateScrollIndicators();
  }

  // Check if going in a direction with content to reach, otherwise stop
  onMenuWheel(e) {
    // This is enough for chrome
    e.stopPropagation();

    // Needed for safari and firefox to prevent scrolling on non-scrollable lists
    if (!this.canScrollDown && !this.canScrollUp) {
      e.preventDefault();
    }

    // needed for safari to prevent scrolling past the end of a scrollable list
    if (e.deltaY > 0 && !this.canScrollDown) {
      e.preventDefault();
    }
    if (e.deltaY < 0 && !this.canScrollUp) {
      e.preventDefault();
    }
  }

  /* 10. Render */
  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          ref={(el) => (this.menu = el)}
          part="base"
          role="menu"
          tabindex="0"
          onScroll={this.onMenuScroll}
          onWheel={this.onMenuWheel}
        >
          <slot />
          <div class={`${name}__scroll-up-indicator`}></div>
          <div class={`${name}__scroll-down-indicator`}></div>
        </div>
      </Host>
    );
  }
}
