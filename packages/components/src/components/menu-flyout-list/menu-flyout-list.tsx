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
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

const PAD = 10;
const ITEM_ROLES = ['menuitem', 'menuitemcheckbox', 'menuitemradio'];

@Component({
  tag: 'scale-menu-flyout-list',
  styleUrl: 'menu-flyout-list.css',
  shadow: true,
})
export class MenuFlyoutList {
  @Element() hostElement: HTMLElement;

  /** Used to force a re-render */
  @State() forceRender = 0;

  /** */
  @Prop({ mutable: true, reflect: true }) opened = false;
  /** */
  @Prop() trigger: () => HTMLElement;
  /** (optional) Set preference for where the menu appears, space permitting */
  @Prop({ mutable: true }) direction:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'right'
    | 'left' = 'bottom-right';
  /**  */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;
  /** (optional) Determines whether the flyout should close when a menu item is selected */
  @Prop() closeOnSelect = true;
  /** (optional) set to true when using in telekom-brand-header*/
  @Prop() brandHeaderDropdown: boolean = false;  
  /** (optional) Injected styles */
  @Prop() styles?: string;

  /** Event triggered when menu list opened */
  @Event({ eventName: 'scale-open' }) scaleOpen: EventEmitter<{
    list: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleOpen' }) scaleOpenLegacy: EventEmitter<{
    list: HTMLElement;
  }>;
  /** Event triggered when menu list closed */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<{
    list: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClose' }) scaleCloseLegacy: EventEmitter<{
    list: HTMLElement;
  }>;

  /** Keep track of base element */
  private base: HTMLElement;
  /** Keep track of list element */
  private list: HTMLElement;
  /** Flags to know if content scrollable */
  private canScrollUp = false;
  private canScrollDown = false;
  /** When menu off the screen horizontally */
  private flipHorizontal = false;
  /** When menu off the screen vertically */
  private flipVertical = false;
  /** Set true when resize or when opened */
  private needsCheckPlacement = true;
  /** Track window height to see if menus are off screen */
  private windowHeight: number;
  /** Track window width to see if menus are off screen */
  private windowWidth: number;

  private items: Element[];
  private focusedItemIndex: number;

  get triggerRect() {
    return this.trigger().getBoundingClientRect();
  }

  componentDidRender() {
    if (this.opened && this.needsCheckPlacement) {
      this.setSize();
      this.checkPlacement();
    }
  }

  @Method()
  async open() {
    this.opened = true;
    emitEvent(this, 'scaleOpen', { list: this.hostElement });
  }

  @Method()
  async close(silent: boolean = false) {
    if (this.active && silent !== true) {
      emitEvent(this, 'scaleClose', { list: this.hostElement });
    }
    this.opened = false;
  }

  @Method()
  async setFocus() {
    if (this.focusedItemIndex != null) {
      this.focusItem();
    } else {
      this.setInitialItemsFocus();
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.close();
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    if (!this.active) {
      return;
    }

    if (!this.hostElement.querySelector('app-navigation-user-menu')) {
      event.preventDefault();
    }

    if ('ArrowDown' === event.key) {
      this.shiftItemsFocus();
      return;
    }
    if ('ArrowUp' === event.key) {
      this.shiftItemsFocus(-1);
      return;
    }
    if ('ArrowLeft' === event.key || 'Escape' === event.key) {
      this.close();
      return;
    }
    if (
      ' ' === event.key ||
      'Enter' === event.key ||
      'ArrowRight' === event.key
    ) {
      const item = this.items[
        this.focusedItemIndex
      ] as HTMLScaleMenuFlyoutItemElement;
      if (item != null) {
        item.triggerEvent(event, this.closeOnSelect);
      }
    }
  }

  /**
   * We handle item clicks here, to avoid setting up
   * listeners on every item
   */
  @Listen('click')
  handleClick(event: MouseEvent) {
    const roleSelector = ITEM_ROLES.map((role) => `[role="${role}"]`).join(',');
    const item = (event.target as Element).closest(
      roleSelector
    ) as HTMLScaleMenuFlyoutItemElement;
    if (item != null) {
      event.stopImmediatePropagation();
      item.triggerEvent(event, this.closeOnSelect);
    }
  }

  /**
   * Focus newly selected item
   */
  @Listen('scale-select')
  handleScaleSelect({ detail }) {
    if (this.active && this.opened) {
      const index = this.items.findIndex((x) => x === detail.item);
      if (index != null) {
        this.focusedItemIndex = index;
        this.focusItem();
      }
    }
  }

  /**
   * Set `active` to false when a descendant opens
   */
  @Listen('scale-open')
  handleScaleOpen({ detail }) {
    if (detail.list !== this.hostElement) {
      this.active = false;
    }
  }

  @Watch('opened')
  openedChanged() {
    if (!this.opened) {
      this.active = false;
      this.focusedItemIndex = null;
      // Reset checks for boundary-aware placement
      this.needsCheckPlacement = true;
      this.flipHorizontal = false;
      this.flipVertical = false;
      this.hostElement.style.marginLeft = '';
      this.hostElement.style.marginTop = '';
      this.hostElement.style.marginRight = '';
      this.hostElement.style.marginBottom = '';
    }

    if (this.opened) {
      this.active = true;
      this.setFocus();
      this.setWindowSize();
      this.setPosition();
      this.padForNonOverlayScrollbars();
      this.updateScrollIndicators();
    }

    this.updateTriggerAttributes();
  }

  handleScroll = () => {
    this.updateScrollIndicators();
  };

  handleWheel = (event: WheelEvent) => {
    // TODO not sure this is doing anything atm
    this.stopWheelPropagation(event);
  };

  setInitialItemsFocus() {
    this.items = this.getListItems();
    this.focusedItemIndex = -1;
    if (this.items.length > 0) {
      this.shiftItemsFocus();
    }
  }

  shiftItemsFocus(direction: -1 | 1 = 1) {
    let nextIndex = this.focusedItemIndex + direction;
    if (nextIndex === this.items.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = this.items.length - 1;
    }
    this.focusedItemIndex = nextIndex;
    this.focusItem();
  }

  focusItem() {
    window.requestAnimationFrame(() => {
      try {
        (this.items[this.focusedItemIndex] as HTMLElement).focus();
      } catch (err) {}
    });
  }

  updateTriggerAttributes() {
    const trigger = this.trigger();
    if (trigger && trigger.getAttribute('aria-haspopup') === 'true') {
      trigger.setAttribute('aria-expanded', String(this.opened));
    }
  }

  setWindowSize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  setPosition() {
    const { top, left } = this.triggerRect;
    this.hostElement.style.left = `${left}px`;
    if (this.trigger().tagName === "SCALE-TELEKOM-NAV-ITEM") {
      this.hostElement.style.top = `${top - 12}px`;
      this.hostElement.style.left = `${left - 24}px`;
    } else {
      this.hostElement.style.top = `${top}px`;
    }
  }

  setSize() {
    const { width, height } = this.triggerRect;
    this.hostElement.style.height = `${height}px`;
    this.hostElement.style.width = `${width}px`;
    if (this.brandHeaderDropdown) {
      this.base.style.width = `240px`;
    }    

  }

  checkPlacement() {
    this.needsCheckPlacement = false;
    let isOutOfBounds = false;
    const rect = this.base.getBoundingClientRect();

    // Check horizontal flips
    if (rect.left < PAD) {
      // console.log('off left edge');
      isOutOfBounds = true;
      if (this.direction.includes('left')) {
        this.flipHorizontal = true;
      }
    }
    if (rect.right > this.windowWidth - PAD) {
      // console.log('off right edge');
      isOutOfBounds = true;
      if (this.direction.includes('right')) {
        this.flipHorizontal = true;
      }
    }

    // Check vertical flips
    if (rect.top < PAD) {
      // console.log('off top edge');
      isOutOfBounds = true;
      if (this.direction.includes('top')) {
        this.flipVertical = true;
      }
    }
    if (rect.bottom > this.windowHeight - PAD) {
      // console.log('off bottom edge');
      isOutOfBounds = true;
      if (this.direction.includes('bottom')) {
        this.flipVertical = true;
      }
    }

    if (isOutOfBounds) {
      this.furtherAdjustPlacement();
    }
  }

  furtherAdjustPlacement() {
    // Apply flip class changes immediately to avoid frame flash
    this.base.className = this.getCssClassMap();
    // Force layout and style recalculation
    window.getComputedStyle(this.base);

    const rect = this.base.getBoundingClientRect();

    // TODO: add more functionality for order of priority of which edge to snap to
    // Shift to be snapped to a padded edge
    // Note can't use transform as it creates
    // a relative parent for nested position fixed elements
    let left = 0;
    let top = 0;
    if (rect.left < PAD) {
      // console.log('still off left edge');
      left = PAD - rect.left;
    } else if (rect.right > this.windowWidth - PAD) {
      // console.log('still off right edge');
      left = this.windowWidth - PAD - rect.right;
    }
    if (rect.top < PAD) {
      // console.log('still off top edge');
      top = PAD - rect.top;
    } else if (rect.bottom > this.windowHeight - PAD) {
      // console.log('still off bottom edge');
      top = this.windowHeight - PAD - rect.bottom;
    }
    this.hostElement.style.marginLeft = `${left}px`;
    this.hostElement.style.marginTop = `${top}px`;
    this.hostElement.style.marginRight = `${-left}px`;
    this.hostElement.style.marginBottom = `${-top}px`;

    // Re-render visibly next frame with correct placement to update vdom
    setTimeout(() => this.forceRender++);
  }

  /**
   * Add scrollbar width to menu, to avoid horizontal scrollbars
   * or scrollbar forcing text-overflow.
   * (This affects Firefox and Safari, where non-overlay scrollbars
   * eat into content width rather than add)
   */
  padForNonOverlayScrollbars() {
    this.base.style.paddingRight = `0px`;
    const scrollbarWidth = this.base.offsetWidth - this.base.clientWidth;
    this.base.style.paddingRight = `${scrollbarWidth}px`;
  }

  updateScrollIndicators() {
    // Reset
    this.canScrollDown = false;
    this.canScrollUp = false;
    const diff = this.list.scrollHeight - this.list.clientHeight;
    // Not scrollable
    if (diff) {
      if (this.list.scrollTop > 0) {
        this.canScrollUp = true;
      }
      if (this.list.scrollTop < diff) {
        this.canScrollDown = true;
      }
    }
    this.forceRender++;
  }

  /**
   * Check if going in a direction with content to reach, otherwise stop
   */
  stopWheelPropagation(event: WheelEvent) {
    // This is enough for Chrome
    event.stopPropagation();

    // Needed for Safari and Firefox to prevent scrolling on non-scrollable lists
    if (!this.canScrollDown && !this.canScrollUp) {
      event.preventDefault();
    }

    // Needed for Safari to prevent scrolling past the end of a scrollable list
    if (event.deltaY > 0 && !this.canScrollDown) {
      event.preventDefault();
    }
    if (event.deltaY < 0 && !this.canScrollUp) {
      event.preventDefault();
    }
  }

  getListItems() {
    return Array.from(this.hostElement.children).filter(
      (el: HTMLScaleMenuFlyoutItemElement) =>
        ITEM_ROLES.includes(el.getAttribute('role'))
    );
  }

  getCssClassMap() {
    return classNames(
      'menu-flyout-list',
      `menu-flyout-list--direction-${this.direction}`,
      this.opened && 'menu-flyout-list--opened',
      this.canScrollUp && 'menu-flyout-list--can-scroll-up',
      this.canScrollDown && 'menu-flyout-list--can-scroll-down',
      this.flipHorizontal && `menu-flyout-list--flip-horizontal`,
      this.flipVertical && `menu-flyout-list--flip-vertical`
    );
  }

  render() {
    return (
      <Host role="menu">
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          ref={(el) => (this.base = el)}
          part="base"
          style={{ maxHeight: `calc(${this.windowHeight}px - 20px)`}}
          onWheelCapture={this.handleWheel}
        >
          <div
            class="menu-flyout-list__list"
            ref={(el) => (this.list = el)}
            onScroll={this.handleScroll}
          >
            <slot />
          </div>
          <div
            aria-hidden="true"
            class="menu-flyout-list__scroll-up-indicator"
          ></div>
          <div
            aria-hidden="true"
            class="menu-flyout-list__scroll-down-indicator"
          ></div>
        </div>
      </Host>
    );
  }
}
