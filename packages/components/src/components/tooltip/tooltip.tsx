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
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom';
import { isClickOutside } from '../../utils/utils';

let id = 0;

@Component({
  tag: 'scale-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  componentId = `tooltip-${++id}`;
  @Element() hostEl: HTMLElement;
  /** (optional) The content of the Tooltip supporting Text only */
  @Prop() content = '';
  /** (optional) Position of the Tooltip on the Object */
  @Prop() placement:
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
  /** (optional) Disable Tooltip */
  @Prop() disabled = false;
  /** (optional) Distance of the Tooltip from the Target Object (related to the `placement`) */
  @Prop() distance = 5;
  /** (optional) Set the Tooltip to open per default (will still be closed on closing Events) */
  @Prop({ mutable: true, reflect: true }) open = false;
  /** (optional) Set custom trigger Event selection */
  @Prop() trigger: string = 'hover focus';
  /** (optional) Switching the flip option of the tooltip on and off */
  @Prop() flip: boolean = true;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @State() mouseOverTooltip: boolean = false;

  @Event({ eventName: 'scale-before-show' }) tooltipBeforeShow: EventEmitter;
  @Event({ eventName: 'scale-show' }) tooltipShow: EventEmitter;
  @Event({ eventName: 'scale-before-hide' }) tooltipBeforeHide: EventEmitter;
  @Event({ eventName: 'scale-hide' }) tooltipHide: EventEmitter;

  private tooltipEl: HTMLElement;
  private arrowEl: HTMLElement;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.showTooltip() : this.hideTooltip();
  }

  componentDidLoad() {
    this.hostEl.addEventListener('blur', this.handleBlur, true);
    this.hostEl.addEventListener('click', this.handleClick, true);
    this.hostEl.addEventListener('focus', this.handleFocus, true);
  }
  disconnectedCallback() {
    this.hostEl.removeEventListener('blur', this.handleBlur, true);
    this.hostEl.removeEventListener('click', this.handleClick, true);
    this.hostEl.removeEventListener('focus', this.handleFocus, true);
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (isClickOutside(event, this.hostEl)) {
      this.hideTooltip();
    }
  }

  componentDidUpdate() {
    this.update();
    if (this.open) {
      this.showTooltip();
    }
  }

  update = () => {
    if (!this.disabled) {
      computePosition(
        Array.from(this.hostEl.children).find((x) => !x.hasAttribute('slot')),
        this.tooltipEl,
        {
          placement: this.placement,
          middleware: [
            offset(this.distance),
            ...(this.flip ? [flip()] : []),
            arrow({ element: this.arrowEl }),
            shift({ crossAxis: true }),
          ],
        }
      ).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this.tooltipEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        // Accessing the data
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(this.arrowEl.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-2.79px',
        });
      });
    }
  };

  componentDidRender() {
    this.update();
  }

  @Method()
  async showTooltip() {
    if (this.open) {
      return;
    }
    const scaleShow = this.tooltipBeforeShow.emit();
    if (scaleShow.defaultPrevented) {
      this.open = false;
      return;
    }
    this.open = true;
    this.update();
  }

  @Method()
  async hideTooltip() {
    if (!this.open) {
      return;
    }
    const tooltipBeforeHide = this.tooltipBeforeHide.emit();
    if (tooltipBeforeHide.defaultPrevented) {
      this.open = true;
      return;
    }
    this.open = false;
    this.update();
  }

  handleBlur = () => {
    if (this.hasTrigger('focus')) {
      this.hideTooltip();
    }
  };

  handleClick = () => {
    if (this.hasTrigger('click')) {
      this.open && !this.hasTrigger('focus')
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
    if (this.open && event.key === 'Escape') {
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
      <Host
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.styles && <style>{this.styles}</style>}

        <span part="trigger" aria-describedby={this.componentId}>
          <slot></slot>
        </span>

        {!this.disabled && (
          <div
            part="tooltip"
            role="tooltip"
            aria-hidden={this.open ? 'false' : 'true'}
            ref={(el) => (this.tooltipEl = el)}
            id={this.componentId}
            tabIndex={0}
            onMouseOver={this.handleTooltipMouseOver}
            onMouseLeave={this.handleTooltipBlur}
          >
            <slot name="content">{this.content}</slot>
            <div part="arrow" ref={(el) => (this.arrowEl = el)}></div>
          </div>
        )}
      </Host>
    );
  }
}
