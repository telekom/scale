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
  Element,
  Event,
  EventEmitter,
  Listen,
  Watch,
  State,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { emitEvent } from '../../utils/utils';

// [ ] Add keyboard controls
// [ ] Hover to open ?
// [ ] Trigger as contextual menu ?
// [ ] Fix ability to access parent menu 2 levels before (fixed nesting issue)

let idCounter = 0;

/** Number of pixels to leave as spacing from the edge of the window */
const PAD = 10;

const name = 'menu';
@Component({
  tag: 'scale-menu-flyout',
  styleUrl: 'menu-flyout.css',
  shadow: true,
})
export class MenuFlyout {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */
  /** Used to force a re-render */
  @State() forceRender = 0;

  /* 3. Public Properties (alphabetical) */
  /** (optional) Determines whether the dropdown should close when a menu item is selected */
  @Prop() closeOnSelect = true;
  /** (optional) Set preference for where the menu appears, space permitting */
  @Prop({ mutable: true }) direction:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'right'
    | 'left';
  /** (optional) Tracks the menu list open state */
  @Prop({ mutable: true, reflect: true }) open = false;
  /** (optional) Injected styles */
  @Prop() styles?: string;

  /* 4. Events (alphabetical) */
  /** Event triggered when menu list opened */
  @Event({ eventName: 'scale-open' }) scaleOpen: EventEmitter<{
    id: number;
    cascadeLevel: number;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleOpen' }) scaleOpenLegacy: EventEmitter<{
    id: number;
    cascadeLevel: number;
  }>;
  /** Event triggered when menu list closed */
  @Event({ eventName: 'scale-close' }) scaleClose: EventEmitter<{
    id: number;
    cascadeLevel: number;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleClose' }) scaleCloseLegacy: EventEmitter<{
    id: number;
    cascadeLevel: number;
  }>;
  /** Event triggered when nested menu item selected */
  @Event({ eventName: 'scale-select' }) scaleSelect: EventEmitter<{
    item: HTMLElement;
  }>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleSelect' }) scaleSelectLegacy: EventEmitter<{
    item: HTMLElement;
  }>;

  /* 5. Private Properties (alphabetical) */
  /** Cascade level to help with closing when siblings are opened */
  private cascadeLevel = 0;
  /** When menu off the screen horizontally */
  private flipHorizontal = false;
  /** When menu off the screen vertically */
  private flipVertical = false;
  /** Unique ID of component */
  private id = idCounter++;
  /** True if menu a nested menu */
  private isCascaded = false;
  /** Keep track of list element */
  private list: HTMLElement;
  /** Keep track of list slot */
  private listSlot: HTMLSlotElement;
  /** Get access to force height of trigger - solving relative issues with cascade menus */
  private listWrapper: HTMLElement;
  /** Store for switching classes after boundary checks */
  private main: HTMLElement;
  /** Set true when resize or when opened */
  private needsCheckPlacement = true;
  /** Keep track of slotted list */
  private slottedList: HTMLScaleMenuFlyoutListElement;
  /** Keep track of trigger */
  private trigger: HTMLElement;
  /** Keep track of trigger slot */
  private triggerSlot: HTMLSlotElement;
  /** Track height to see if menus are off screen */
  private windowHeight: number;
  /** Track width to see if menus are off screen */
  private windowWidth: number;

  /* 6. Lifecycle Events (call order) */
  constructor() {
    this.onCatcherClick = this.onCatcherClick.bind(this);
    this.onCatcherScroll = this.onCatcherScroll.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  connectedCallback() {
    // TODO: test cases where 16ms isn't enough - perhaps walk through children instead?
    // Need to wait a frame as possible parent slots may not have connected yet
    setTimeout(() => {
      this.calculateCascadeLevel();
      this.determineDefaultDirection();
    }, 16);
    statusNote({ source: this.hostElement, tag: 'beta' });
  }
  componentWillLoad() {}
  componentWillUpdate() {}
  componentWillRender() {}
  componentDidRender() {
    if (this.open && this.needsCheckPlacement) {
      // this.calculateCascadeLevel();
      // this.determineDefaultDirection();

      this.setListWrapperSize();
      // Notify menu-list so it can calculate scroll heights
      // @ts-ignore - No idea why it's complaining here, opened is a public method
      if (this.slottedList && this.slottedList.opened) {
        // @ts-ignore
        this.slottedList.opened();
      }
      this.checkPlacement();
    }
  }
  componentDidLoad() {}
  componentDidUpdate() {}
  disconnectedCallback() {}

  /* 7. Listeners */
  // Close menu on manual scrolls of parent elements (eg using page scroll bar or home/end keys)
  @Listen('scroll', { target: 'document', capture: true })
  scrollHandler() {
    if (!this.open) {
      return;
    }

    // Force closed on scroll
    this.toggleOpenState();
  }

  @Listen('resize', { target: 'window' })
  resizeHandler() {
    if (!this.open) {
      return;
    }
    this.getWindowSize();

    // Force closed on resize
    this.toggleOpenState();
  }

  @Watch('open')
  openHandler() {
    if (!this.open) {
      // Reset checks for boundary-aware placement
      this.needsCheckPlacement = true;
      this.flipHorizontal = false;
      this.flipVertical = false;
      this.list.style.marginLeft = '';
      this.list.style.marginTop = '';
      this.list.style.marginRight = '';
      this.list.style.marginBottom = '';
    }

    if (this.open) {
      this.getWindowSize();
      this.setListWrapperPosition();
    }

    this.updateTriggerAttributes();
  }

  // Listen for cascaded menu closes to also close
  @Listen('scale-close')
  childClosedHandler({ detail }) {
    // Ignore events from self
    if (detail.id === this.id) {
      return;
    }
    // Nested menu was closed, so also close without emitting
    this.open = false;
  }

  // Listen for cascaded menu closes to also close
  @Listen('scale-open', { target: 'body' })
  relativeOpenHandler({ detail }) {
    // Ignore events from self
    if (detail.id === this.id) {
      return;
    }
    if (!this.open || detail.cascadeLevel > this.cascadeLevel) {
      return;
    }
    // An adjacent menu thread was opened, so close without emitting
    this.open = false;
  }

  /* 8. Public Methods */

  /* 9. Local Methods */
  getCssClassMap() {
    return classNames(
      name,
      this.open && `${name}--open`,
      this.isCascaded && `${name}--cascaded`,
      `${name}--direction-${this.direction}`,
      this.flipHorizontal && `${name}--flip-horizontal`,
      this.flipVertical && `${name}--flip-vertical`
    );
  }

  calculateCascadeLevel() {
    let level = 0;
    let elem = this.hostElement as any;
    do {
      if (elem.tagName === 'SCALE-MENU-FLYOUT-LIST') {
        level++;
      }
      elem =
        // Check if shadow parent (slot)
        elem.assignedSlot ||
        // Check for regular parent
        elem.parentElement ||
        // Check if light parent (shadow dom host)
        elem.getRootNode().host;
    } while (elem);

    this.cascadeLevel = level;
    if (level > 0) {
      this.isCascaded = true;
    }
    // Need to re-render to store new direction state if cascaded
    this.forceRender++;
  }

  determineDefaultDirection() {
    // Default `bottom-right` for standalone menus, `right` for submenus
    if (!this.direction) {
      this.direction = this.isCascaded ? 'right' : 'bottom-right';
    }
  }

  getWindowSize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  updateTriggerAttributes() {
    if (!this.triggerSlot) {
      return;
    }
    const slottedNodes = this.triggerSlot.assignedNodes();
    const slottedTrigger = slottedNodes.find(
      (el) => el.nodeType !== Node.TEXT_NODE
    ) as HTMLScaleMenuFlyoutItemElement;
    if (!slottedTrigger) {
      return;
    }
    slottedTrigger.setAttribute('aria-haspopup', 'true');
    slottedTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    // If trigger isn't a scale-menu-flyout-item this won't do anything
    slottedTrigger.active = this.open;
  }

  checkPlacement() {
    this.needsCheckPlacement = false;
    let isOutOfBounds = false;
    let rect = this.list.getBoundingClientRect() as ClientRect;

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

    // All good, can stop calculations
    if (!isOutOfBounds) {
      return;
    }

    // Apply flip class changes immediately to avoid frame flash
    this.main.className = this.getCssClassMap();

    // Force layout and style recalculation
    window.getComputedStyle(this.list);

    // Update rect for further tests
    rect = this.list.getBoundingClientRect() as ClientRect;

    // TODO: add more functionality for order of priority of which edge to snap to
    // Shift to be snapped to a padded edge
    // Note can't use transform as it creates a relative parent for nested position fixed elements
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
    this.list.style.marginLeft = `${left}px`;
    this.list.style.marginTop = `${top}px`;
    this.list.style.marginRight = `${-left}px`;
    this.list.style.marginBottom = `${-top}px`;

    // Re-render visibly next frame with correct placement to update vdom
    setTimeout(() => this.forceRender++, 0);
  }

  // Need to manually set the list wrapper's size because
  // ancestors of cascaded menus cannot have position relative
  // or they will not allow interaction with ancestor menus
  setListWrapperSize() {
    if (!this.trigger) {
      return;
    }
    this.listWrapper.style.height = `${this.trigger.clientHeight}px`;
    this.listWrapper.style.width = `${this.trigger.clientWidth}px`;
  }

  // Because the wrapper is position: fixed due to overflow issues,
  // need to manually update position to match trigger
  setListWrapperPosition() {
    if (!this.trigger) {
      return;
    }
    const rect = this.trigger.getBoundingClientRect() as ClientRect;
    this.listWrapper.style.top = `${rect.top}px`;
    this.listWrapper.style.left = `${rect.left}px`;
  }

  toggleOpenState() {
    this.open = !this.open;
    this.emitOpenState();
  }

  emitOpenState() {
    const { id, cascadeLevel } = this;
    if (this.open) {
      emitEvent(this, 'scaleOpen', { id, cascadeLevel });
    } else {
      emitEvent(this, 'scaleClose', { id, cascadeLevel });
    }
  }

  onCatcherClick(e) {
    e.preventDefault();
    this.toggleOpenState();
  }

  onCatcherScroll() {
    if (this.open) {
      this.toggleOpenState();
    }
  }

  onTriggerClick() {
    // Prevent clicks on open submenu closing menu
    if (this.cascadeLevel && this.open) {
      return;
    }
    this.toggleOpenState();
  }

  onMenuClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // See if click was on a nested menu item
    const item = target.closest(
      'scale-menu-flyout-item'
    ) as HTMLScaleMenuFlyoutItemElement;
    // Make sure isn't disabled or a cascading menu
    if (item && !item.disabled && !item.cascade) {
      // Send event in case developer listening on the menu and not items individually
      emitEvent(this, 'scaleSelect', { item });
      if (this.closeOnSelect) {
        this.toggleOpenState();
      }
    }
    // Stop bubbling up to possible parent menus
    event.stopPropagation();
  }

  handleKeyDown(event) {
    if (
      event.key === 'Enter' &&
      !this.open &&
      event.target.tagName === 'SCALE-MENU-FLYOUT-ITEM'
    ) {
      this.toggleOpenState();
    }
    if (
      event.key === 'Escape' &&
      this.open &&
      event.target.tagName === 'SCALE-MENU-FLYOUT-ITEM'
    ) {
      this.toggleOpenState();
    }
  }

  handleKeyUp() {}

  /* 10. Render */
  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div
          class={this.getCssClassMap()}
          ref={(el) => (this.main = el)}
          // onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        >
          <div
            class={`${name}__click-catcher`}
            onTouchStart={this.onCatcherClick}
            onClick={this.onCatcherClick}
            onKeyDown={this.onCatcherClick}
            onKeyUp={this.onCatcherClick}
            onWheel={this.onCatcherScroll}
          ></div>
          <div
            class={`${name}__list-wrapper`}
            ref={(el) => (this.listWrapper = el)} //
          >
            <div
              class={`${name}__list`}
              ref={(el) => (this.list = el)}
              onClick={this.onMenuClick}
            >
              <slot
                onSlotchange={(e: any) => {
                  this.listSlot = e.target;
                  const slottedNodes = this.listSlot.assignedNodes();
                  const slottedList = slottedNodes.find(
                    (el) => el.nodeType !== Node.TEXT_NODE
                  ) as HTMLScaleMenuFlyoutListElement;
                  if (slottedList) {
                    this.slottedList = slottedList;
                  }
                }}
              />
            </div>
          </div>
          <span
            class={`${name}__trigger`}
            onClick={this.onTriggerClick} //
            ref={(el) => (this.trigger = el)}
          >
            <slot
              name="trigger"
              onSlotchange={(e: any) => {
                this.triggerSlot = e.target;
                this.updateTriggerAttributes();
              }}
            />
          </span>
        </div>
      </Host>
    );
  }
}
