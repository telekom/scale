import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-loading',
  styleUrl: './loading.css',
  shadow: true,
})
export class Loading {
  @Prop() variant: 'white' | 'primary' = 'primary';
  @Prop() alignment: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() text: string = 'Loading...';

  render() {
    return (
      <Host>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="container" class="spinner__container">
            <div part="circle" class="spinner__circle"></div>
          </div>
          <div
            part="text"
            class="spinner__text"
            aria-live="polite"
            aria-busy="true"
          >
            {this.text}
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
    const name = 'spinner';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.alignment && `${prefix}alignment-${this.alignment}`,
      this.variant && `${prefix}variant-${this.variant}`,
      !this.text && `${prefix}text-hidden`
    );
  }
}
