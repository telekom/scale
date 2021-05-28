import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'scale-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop() alignment: 'left' | 'right' | 'top' | 'bottom' = 'top';

  render() {
    return (
      <Host>
        <div class="tooltip">
          <slot></slot>
          <span class="tooltiptext">Tooltip was ist das ?</span>
        </div>
      </Host>
    );
  }
}
