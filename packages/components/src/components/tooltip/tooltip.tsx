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
} from '@stencil/core';
import {computePosition, flip, shift, arrow, offset} from '@floating-ui/dom';

let id = 0;

@Component({
  tag: 'scale-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  componentId = `tooltip-${++id}`;
  isVisible = false;
  tooltipPositioner: HTMLElement;
  target: HTMLElement;
  tooltip: any;

  @Element() host: HTMLElement;
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
  /** (optional) skidding moves the tooltip of the element in dependence of its `placement` to the element either
   * on an x-axis (at `placement` top/down) or on a y-axis (for output `placement` left/right)
   */
  @Prop() skidding = 0;
  /** (optional) Set custom trigger Event selection */
  @Prop() trigger: string = 'hover focus';
  /** (optional) Switching the flip option of the tooltip on and off */
  @Prop() flip: boolean = true;
  /** (optional) Switching the preventOverflow option of the tooltip on and off */
  @Prop() preventOverflow: boolean = false;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  @State() mouseOverTooltip: boolean = false;

  @Event({ eventName: 'scale-before-show' }) tooltipBeforeShow: EventEmitter;
  @Event({ eventName: 'scale-show' }) tooltipShow: EventEmitter;
  @Event({ eventName: 'scale-before-hide' }) tooltipBeforeHide: EventEmitter;
  @Event({ eventName: 'scale-hide' }) tooltipHide: EventEmitter;

  @Watch('open')
  handleOpenChange() {
    console.log('should change', this.open);
    this.open ? this.showTooltip() : this.hideTooltip();
  }

  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  componentDidLoad() {
    this.target = this.getTarget();
    // width: max-content on .slot-container causes elements with undefined width to be resized
    const resizeElements = this.host.querySelector('scale-text-field, scale-textarea, scale-dropdown')
    if (resizeElements) {
      this.target.style.width =  "100%"
    }

    this.host.addEventListener('blur', this.handleBlur, true);
    this.host.addEventListener('click', this.handleClick, true);
    this.host.addEventListener('focus', this.handleFocus, true);

    if (this.open) {
      this.showTooltip();
    }
  }

  componentDidUpdate() {
    this.updateTooltip();
  }

  updateTooltip() {
    Object.assign(this.tooltip.style, {
      position: 'absolute',
    });
    const arrowEl: HTMLElement = this.host.shadowRoot.querySelector('#arrow');
    computePosition(this.target, this.tooltip, {
      middleware: [offset(6), flip(), shift(), arrow({element: arrowEl})],
      placement: this.placement
    }).then(({x,y, middlewareData, placement}) => {
      Object.assign(this.tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });      
      const {x: arrowX, y: arrowY} = middlewareData.arrow;
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]];
      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
      });
    });
  }

  disconnectedCallback() {
    this.host.removeEventListener('blur', this.handleBlur, true);
    this.host.removeEventListener('click', this.handleClick, true);
    this.host.removeEventListener('focus', this.handleFocus, true);
  }

  @Method()
  async showTooltip() {
    if (this.isVisible) {
      return;
    }
    const scaleShow = this.tooltipBeforeShow.emit();
    if (scaleShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.isVisible = true;
    this.open = true;
    this.tooltip.classList.add('tooltip__visible')
    this.updateTooltip()
  }

  @Method()
  async hideTooltip() {
    if (!this.isVisible) {
      return;
    }
    const tooltipBeforeHide = this.tooltipBeforeHide.emit();
    if (tooltipBeforeHide.defaultPrevented) {
      this.open = true;
      return;
    }
    this.isVisible = false;
    this.open = false;
    this.tooltip.classList.remove('tooltip__visible')
  }

  getTarget() {
    const target = this.host.shadowRoot.querySelector(
      '.slot-container'
    ) as HTMLElement;

    if (!target) {
      throw new Error('Invalid tooltip target: no child element was found.');
    }
    return target;
  }

  handleBlur() {
    if (this.hasTrigger('focus')) {
      this.hideTooltip();
    }
  }

  handleClick() {
    if (this.hasTrigger('click')) {
      this.open ? this.hideTooltip() : this.showTooltip();
    }
  }

  handleFocus() {
    if (this.hasTrigger('focus')) {
      this.showTooltip();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.open && event.key === 'Escape') {
      event.stopPropagation();
      this.hideTooltip();
    }
  }

  handleMouseOver() {
    if (this.hasTrigger('hover')) {
      this.showTooltip();
    }
  }

  handleTooltipMouseOver() {
    this.mouseOverTooltip = true;
  }

  handleMouseOut() {
    if (!this.mouseOverTooltip) {
      if (this.hasTrigger('hover')) {
        this.hideTooltip();
      }
    }
  }

  handleSlotChange() {
    const oldTarget = this.target;
    const newTarget = this.getTarget();

    if (newTarget !== oldTarget) {
      if (oldTarget) {
        oldTarget.removeAttribute('aria-describedby');
      }
      newTarget.setAttribute('aria-describedby', this.componentId);
    }
  }

  hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  render() {
    return (
      <Host
        class="host-container"
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {this.styles && <style>{this.styles}</style>}
        <div class="slot-container">
          <slot onSlotchange={this.handleSlotChange}></slot>
        </div>
        {!this.disabled && (
          <div
            class={{
              tooltip: true,
              'tooltip--open': this.open,
            }}
            onMouseOver={this.handleTooltipMouseOver}
            part="base"
            ref={(el) => (this.tooltip = el)}
            id={this.componentId}
            role="tooltip"
            aria-hidden={this.open ? 'false' : 'true'}
          >
            <div class="content-wrapper" tabindex={0}>
              <slot name="content">{this.content}</slot>
            </div>
            <div id="arrow"></div>
          </div>
        )}
      </Host>
    );
  }
}
