import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-loading-spinner',
  styleUrl: './loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner {
  @Prop() variant: 'white' | 'primary' = 'primary';
  @Prop() alignment: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() text: string;
  @Prop() size: 'small' | 'large' = 'small';

  render() {
    return (
      <Host>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="container" class="spinner__container">
            <div class="spinner__circle-background"></div>
            <div part="circle" class="spinner__circle">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="sr-only" aria-live="polite">
            {this.text || 'Loading'}
          </div>
          <div part="text" class="spinner__text" aria-hidden="true">
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
      this.size && `${prefix}size-${this.size}`,
      this.text && `${prefix}text`
    );
  }
}
