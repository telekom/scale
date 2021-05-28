import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  /** (optional) Variant size of the badge itself */
  @Prop({ mutable: true }) size: 'big' | 'small' = 'big';
  /** (optional) Variant color/filling of the badge */
  @Prop({ mutable: true }) color: 'magenta' | 'white' | 'black' | 'blue';
  /** (optional) Variant rotation of the badge/circle */
  @Prop({ mutable: true }) rotation: number = 0;

  displayStyle() {
    return `:host {
      --badge-rotation: ${this.rotation}deg;
    }`;
  }

  render() {
    return (
      <Host>
        <style>{this.displayStyle()}</style>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="inner" class="badge--inner">
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
    const name = 'badge';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.color && `${prefix}color-${this.color}`,
      this.size && `${prefix}size-${this.size}`
    );
  }
}
