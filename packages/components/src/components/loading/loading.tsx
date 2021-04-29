import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-loading',
  styleUrl: './loading.css',
  shadow: true,
})
export class Loading {
  @Prop() variant: 'white' | 'magenta' = 'magenta';
  @Prop() alignment: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() text: boolean = false;

  getLoadingText() {
    return this.alignment === 'horizontal' ? (
      <div class="spinner-text--alignment-horizontal">Loading...</div>
    ) : (
      <div class="spinner-text--alignment-vertical">Loading ...</div>
    );
  }

  styles() {
    return `:host {
        --loading-color: ${this.variant === 'white' ? '#fff' : '#e20074'};
      }`;
  }

  render() {
    return (
      <Host>
        <style>{this.styles()}</style>
        <div class={this.getCssClassMap()}>
          <div class="spinner-container">
            <div class="spinner-circle"></div>
          </div>
          {this.text ? this.getLoadingText() : false}
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return (
      classNames(`spinner`),
      this.alignment && `spinner--alignment-${this.alignment}`
    );
  }
}
