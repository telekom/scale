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
} from '@stencil/core';
import Popover from './utilities/popover';

let id = 0;

@Component({
  tag: 'scale-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  componentId = `tooltip-${++id}`;
  isVisible = false;
  popover: Popover;
  tooltipPositioner: HTMLElement;
  target: HTMLElement;
  tooltip: any;

  @Element() host: HTMLScaleTooltipElement;

  @Prop() content = '';
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
  @Prop() disabled = false;
  @Prop() distance = 5;
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() skidding = 0;
  @Prop() trigger: string = 'hover focus';

  @Watch('open')
  handleOpenChange() {
    this.open ? this.showTooltip() : this.hideTooltip();
  }

  @Event({ eventName: 'scale-show' }) tooltipShow: EventEmitter;
  @Event({ eventName: 'scale-aftershow' }) tooltipAfterShow: EventEmitter;
  @Event({ eventName: 'scale-hide' }) tooltipHide: EventEmitter;
  @Event({ eventName: 'scale-after-hide' }) tooltipAfterHide: EventEmitter;

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
    this.popover = new Popover(this.target, this.tooltipPositioner);
    this.syncPopoverOptions();

    this.host.addEventListener('blur', this.handleBlur, true);
    this.host.addEventListener('click', this.handleClick, true);
    this.host.addEventListener('focus', this.handleFocus, true);

    this.tooltipPositioner.hidden = !this.open;
    if (this.open) {
      this.showTooltip();
    }
  }

  componentDidUpdate() {
    this.syncPopoverOptions();
  }

  disconnectedCallback() {
    this.popover.destroy();

    this.host.removeEventListener('blur', this.handleBlur, true);
    this.host.removeEventListener('click', this.handleClick, true);
    this.host.removeEventListener('focus', this.handleFocus, true);
  }

  @Method()
  async showTooltip() {
    if (this.isVisible) {
      return;
    }
    const scaleShow = this.tooltipShow.emit();
    if (scaleShow.defaultPrevented) {
      this.open = false;
      return;
    }
    this.isVisible = true;
    this.open = true;
    this.popover.show();
  }

  @Method()
  async hideTooltip() {
    if (!this.isVisible) {
      return;
    }
    const tooltipHide = this.tooltipHide.emit();
    if (tooltipHide.defaultPrevented) {
      this.open = true;
      return;
    }
    this.isVisible = false;
    this.open = false;
    this.popover.hide();
  }

  getTarget() {
    const target = this.host.shadowRoot.getElementById('slot-container');

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
      this.showTooltip();
    }
  }

  handleMouseOver() {
    if (this.hasTrigger('hover')) {
      this.showTooltip();
    }
  }

  handleMouseOut() {
    if (this.hasTrigger('hover')) {
      this.hideTooltip();
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

  syncPopoverOptions() {
    this.popover.setOptions({
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
      transitionElement: this.tooltip,
      onAfterHide: () => this.tooltipAfterHide.emit(),
      onAfterShow: () => this.tooltipAfterShow.emit(),
    });
  }

  render() {
    return (
      <Host
        class="host-container"
        onKeyDown={this.handleKeyDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div id="slot-container">
          <slot onSlotchange={this.handleSlotChange}></slot>
        </div>
        {!this.disabled && (
          <div
            class="tooltip-positioner"
            ref={(el) => (this.tooltipPositioner = el)}
          >
            <div
              class={{
                tooltip: true,
                'tooltip--open': this.open,
              }}
              part="base"
              ref={(el) => (this.tooltip = el)}
              id={this.componentId}
              role="tooltip"
              aria-hidden={this.open ? 'false' : 'true'}
            >
              <slot name="content">{this.content}</slot>
            </div>
          </div>
        )}
      </Host>
    );
  }
}
