import { Component, h, Host, Prop, Element } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-callout',
  styleUrl: 'callout.css',
  shadow: true,
})
export class Callout {
  @Element() hostElement: HTMLElement;
  /** (optional) Variant size of the callout itself */
  @Prop({ mutable: true }) size: 'large' | 'small' = 'large';
  /** (optional) Variant color/filling of the callout */
  @Prop({ mutable: true }) color: 'primary' | 'white' | 'black' | 'blue';
  /** (optional) Variant rotation of the callout/circle */
  @Prop({ mutable: true }) rotation: number = 0;

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }

  displayStyle() {
    return `:host {
      --callout-rotation: ${this.rotation}deg;
    }`;
  }

  render() {
    return (
      <Host>
        <style>{this.displayStyle()}</style>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="inner" class="callout--inner">
            <slot></slot>
          </div>
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
    const name = 'callout';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.color && `${prefix}color-${this.color}`,
      this.size && `${prefix}size-${this.size}`
    );
  }
}
