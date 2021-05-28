import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

const bigTextBox = {
  width: 126.5,
  height: 96,
};

const smallTextBox = {
  width: 86,
  height: 88,
};

@Component({
  tag: 'scale-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  /** (optional) Variant size of the badge itself */
  @Prop({ mutable: true }) size: 'big' | 'small' = 'big';
  /** (optional) Variant color/filling of the badge */
  @Prop({ mutable: true }) color: 'magenta' | 'white' | 'black' | string =
    'magenta';
  /** (optional) Variant rotation of the badge/circle */
  @Prop({ mutable: true }) rotation: number = 0;

  displayStyle() {
    return `:host {
      --badge-rotation: ${this.rotation}deg; 
      --badge-text-width:${
        this.size === 'big' ? bigTextBox.width : smallTextBox.width
      }px;
      --badge-text-height:${
        this.size === 'big' ? bigTextBox.height : smallTextBox.height
      }px;
    }`;
  }

  render() {
    return (
      <Host>
        <style>{this.displayStyle()}</style>
        <div class={this.getCssClassMap()}>
          <div class="badge--inner">
            <slot></slot>
          </div>
        </div>
        ‚
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'badge',
      this.color && `badge--color-${this.color}`,
      this.size && `badge-size-${this.size}`
    );
  }
}
