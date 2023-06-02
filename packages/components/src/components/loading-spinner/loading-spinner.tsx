import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

let i = 0;

@Component({
  tag: 'scale-loading-spinner',
  styleUrl: './loading-spinner.css',
  shadow: true,
})
export class LoadingSpinner {
  // todo the variant white should be renamed for dark mode
  @Prop() variant: 'white' | 'primary' = 'primary';
  @Prop() alignment: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() text: string;
  @Prop() accessibilityTitle: string;
  @Prop() size: 'small' | 'large' = 'small';

  componentWillLoad() {
    i++;
  }

  render() {
    return (
      <Host>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="container" class="spinner__container">
            <svg
              preserveAspectRatio="none"
              class="spinner__circle"
              viewBox="0 0 50 50"
              aria-hidden="true"
            >
              <circle
                class="path"
                cx="25"
                cy="25"
                r="22.5"
                fill="none"
                stroke-width="4"
              ></circle>
            </svg>
            <svg
              preserveAspectRatio="none"
              class="spinner__circle-background"
              viewBox="0 0 50 50"
              aria-hidden="true"
            >
              <circle
                class="path"
                cx="25"
                cy="25"
                r="22.5"
                fill="none"
                stroke-width="4"
              ></circle>
            </svg>
          </div>
          <div class="sr-only" aria-live="polite" id={`spinner-label-${i}`}>
            {this.accessibilityTitle
              ? this.accessibilityTitle
              : this.text || 'Loading'}
          </div>
          {this.text ? (
            <div part="text" class="spinner__text" aria-hidden="true">
              {this.text}
            </div>
          ) : (
            <div></div>
          )}
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
