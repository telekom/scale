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
  Host,
  Method,
  Prop,
  Watch,
  h,
  State,
  Listen,
} from '@stencil/core';
import {
  computePosition,
  offset,
  flip,
  shift,
  arrow,
  platform,
} from '@floating-ui/dom';
import { offsetParent } from 'composed-offset-position';
import { isClickOutside } from '../../utils/utils';
import statusNote from '../../utils/status-note';

let id = 0;

@Component({
  tag: 'scale-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  componentId = `tooltip-${++id}`;

  @Element() hostElement: HTMLElement;

  /** (optional) The content of the Tooltip, supporting text only */
  @Prop() content? = '';
  /** (optional) Position of the Tooltip around the trigger element */
  @Prop() placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';
  /** (optional) Disable the tooltip */
  @Prop() disabled? = false;
  /** (optional) Tooltip distance from the target element (related to `placement`) */
  @Prop() distance? = 10;
  /** (optional) How much of the arrow element is "hidden" */
  @Prop() arrowOffset?: number = -4;
  /** (optional) Padding between the arrow and the edges of the tooltip */
  @Prop() arrowPadding?: number = 8;
  /** (optional) Set the tooltip to opened by default (will still be closed on closing events) */
  @Prop({ mutable: true, reflect: true }) opened? = false;
  /** (optional) Set custom trigger event (hover, focus, click) */
  @Prop() trigger?: string = 'hover focus';
  /** (optional) Switching the flip option of the tooltip on and off */
  @Prop() flip?: boolean = true;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  @State() mouseOverTooltip: boolean = false;

  @Event({ eventName: 'scale-before-show' }) tooltipBeforeShow: EventEmitter;
  @Event({ eventName: 'scale-show' }) tooltipShow: EventEmitter;
  @Event({ eventName: 'scale-before-hide' }) tooltipBeforeHide: EventEmitter;
  @Event({ eventName: 'scale-hide' }) tooltipHide: EventEmitter;

  private tooltipEl: HTMLElement;
  private arrowEl: HTMLElement;
  private triggerEl: HTMLElement;

  @Watch('opened')
  handleOpenChange() {
    this.opened ? this.showTooltip() : this.hideTooltip();
  }

  connectedCallback() {
    if (this.hostElement.hasAttribute('open')) {
      statusNote({
        tag: 'deprecated',
        message: 'The `open` prop is deprecated in favor of `opened`',
        source: this.hostElement,
      });
    }

    const children = Array.from(this.hostElement.children).filter(
      (x) => !x.hasAttribute('slot')
    );
    if (children.length === 0) {
      // If not children found to be used as trigger, warn
      statusNote({
        tag: 'warning',
        message: 'An element is required, if using text, wrap it in a `<span>`',
        type: 'warn',
        source: this.hostElement,
      });
      return;
    }
    this.triggerEl = children[0] as HTMLElement;
    this.triggerEl.addEventListener('blur', this.handleBlur, true);
    this.triggerEl.addEventListener('click', this.handleClick, true);
    this.triggerEl.addEventListener('focus', this.handleFocus, true);
    this.triggerEl.addEventListener('mouseover', this.handleMouseOver, true);
    this.triggerEl.addEventListener('mouseout', this.handleMouseOut, true);
  }

  disconnectedCallback() {
    this.triggerEl.removeEventListener('blur', this.handleBlur, true);
    this.triggerEl.removeEventListener('click', this.handleClick, true);
    this.triggerEl.removeEventListener('focus', this.handleFocus, true);
    this.triggerEl.removeEventListener('mouseover', this.handleMouseOver, true);
    this.triggerEl.removeEventListener('mouseout', this.handleMouseOut, true);
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (isClickOutside(event, this.hostElement)) {
      this.hideTooltip();
    }
  }

  componentDidUpdate() {
    this.update();
    if (this.opened) {
      this.showTooltip();
    }
  }

  /**
   * @see https://floating-ui.com/docs/tutorial#arrow-middleware
   */
  update = async () => {
    if (this.disabled || this.triggerEl == null) {
      return;
    }

    // Position tooltip
    const { x, y, placement, middlewareData } = await computePosition(
      this.triggerEl,
      this.tooltipEl,
      {
        placement: this.placement,
        middleware: [
          offset(this.distance),
          ...(this.flip ? [flip()] : []),
          arrow({ element: this.arrowEl, padding: this.arrowPadding }),
          shift({ crossAxis: true }),
        ],
        platform: {
          ...platform,
          getOffsetParent: (element) =>
            platform.getOffsetParent(element, offsetParent),
        },
      }
    );
    Object.assign(this.tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // Position arrow
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    const [side] = placement.split('-');
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side];
    Object.assign(this.arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: `${this.arrowOffset}px`,
    });
  };

  componentDidRender() {
    this.update();
  }

  @Method()
  async showTooltip() {
    if (this.opened) {
      return;
    }
    const scaleShow = this.tooltipBeforeShow.emit();
    if (scaleShow.defaultPrevented) {
      this.opened = false;
      return;
    }
    this.opened = true;
    this.update();
  }

  @Method()
  async hideTooltip() {
    if (!this.opened) {
      return;
    }
    const tooltipBeforeHide = this.tooltipBeforeHide.emit();
    if (tooltipBeforeHide.defaultPrevented) {
      this.opened = true;
      return;
    }
    this.opened = false;
    this.update();
  }

  handleBlur = () => {
    if (this.hasTrigger('focus')) {
      this.hideTooltip();
    }
  };

  handleClick = () => {
    if (this.hasTrigger('click')) {
      this.opened && !this.hasTrigger('focus')
        ? this.hideTooltip()
        : this.showTooltip();
    }
  };

  handleFocus = () => {
    if (this.hasTrigger('focus')) {
      this.showTooltip();
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.opened && event.key === 'Escape') {
      event.stopPropagation();
      this.hideTooltip();
    }
  };

  handleMouseOver = () => {
    if (this.hasTrigger('hover')) {
      this.showTooltip();
    }
  };

  handleMouseOut = () => {
    if (!this.mouseOverTooltip) {
      if (this.hasTrigger('hover')) {
        this.hideTooltip();
      }
    }
  };

  handleTooltipMouseOver = () => {
    this.mouseOverTooltip = true;
  };

  handleTooltipBlur = () => {
    this.mouseOverTooltip = false;
    this.handleMouseOut();
  };

  hasTrigger = (triggerType: string) => {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  };

  render() {
    return (
      <Host onKeyDown={this.handleKeyDown}>
        {this.styles && <style>{this.styles}</style>}

        <span part="trigger" aria-describedby={this.componentId}>
          <slot></slot>
        </span>

        {!this.disabled && (
          <div
            part="tooltip"
            role="tooltip"
            aria-hidden={this.opened ? 'false' : 'true'}
            ref={(el) => (this.tooltipEl = el)}
            id={this.componentId}
            onMouseOver={this.handleTooltipMouseOver}
            onMouseLeave={this.handleTooltipBlur}
          >
            <slot name="content">{this.content}</slot>
            <div
              aria-hidden="true"
              part="arrow"
              ref={(el) => (this.arrowEl = el)}
            ></div>
          </div>
        )}
      </Host>
    );
  }
}
