import { Component, Host, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-brand-header-poc',
  styleUrl: 'brand-header.css',
  shadow: true,
})
export class BrandHeader {
  // @Prop() breakpoint?: number = 1024;

  renderLogoSvg() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 38">
        <path d="M7.6 25.1H0v-7.6h7.6v7.6ZM0 0v12.9h2.3v-.4c0-6.1 3.4-9.9 9.9-9.9h.4V30c0 3.8-1.5 5.3-5.3 5.3H6.1V38h19.8v-2.7h-1.1c-3.8 0-5.3-1.5-5.3-5.3V2.7h.4c6.5 0 9.9 3.8 9.9 9.9v.4h2.3V0H0Zm24.3 25.1h7.6v-7.6h-7.6v7.6Z" />
      </svg>
    );
  }

  render() {
    return (
      <Host>
        <header class={this.getCssClassMap()} part="base">
          <a href="/" class="logo" part="logo">
            {this.renderLogoSvg()}
          </a>
          <div class="bar" part="bar">
            {/* viewport: large */}
            <div class="viewport-large" part="viewport-large">
              <div class="container">
                <div class="left">
                  <div class="top">
                    <slot name="extra-lg"></slot>
                  </div>
                  <div class="bottom">
                    <slot name="main-lg"></slot>
                  </div>
                </div>

                <div class="right">
                  <div class="top">
                    <slot name="meta-lg"></slot>
                  </div>
                  <div class="bottom">
                    <slot name="icon-lg"></slot>
                  </div>
                </div>
              </div>
            </div>

            {/* viewport: small */}
            <div class="viewport-small" part="viewport-small">
              <div class="container">
                <div class="left">
                  <slot name="icon-sm"></slot>
                </div>
                <div class="right">
                  <scale-button
                    style={{
                      '--color-ghost':
                        'var(--telekom-color-text-and-icon-standard)',
                    }}
                    variant="ghost"
                    iconOnly
                  >
                    <scale-icon-action-menu></scale-icon-action-menu>
                  </scale-button>
                </div>
              </div>
            </div>

            <slot name="main-sm"></slot>
          </div>
        </header>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('base');
  }
}
