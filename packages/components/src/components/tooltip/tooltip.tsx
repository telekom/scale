import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  /** (optional) Alignment of the tooltip*/
  @Prop() alignment: 'left' | 'right' | 'top' | 'bottom' = 'top';
  /** (optional) Text that is displayed in the tooltip*/
  @Prop() label: string = 'Tooltip is missing';
  /** (optional) Width of the tooltip (Text aligns to tooltip width)*/
  @Prop() width: number = 66;

  getStyle() {
    return `:host {
      --tooltip-width: ${this.width}px;
    }`;
  }

  render() {
    return (
      <Host>
        <style>{this.getStyle()}</style>
        <a
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          data-tooltip={this.label}
        >
          <slot></slot>
        </a>
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
