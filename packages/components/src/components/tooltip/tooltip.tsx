import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

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
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <slot></slot>
          <span part="text" class="tooltiptext">
            Tooltip
          </span>
        </div>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const name = 'tooltip';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.alignment && `${prefix}alignment-${this.alignment}`
    );
  }
}
