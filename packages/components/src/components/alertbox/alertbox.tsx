import { Component, h, Host, Prop, Element, State } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-alertbox',
  styleUrl: 'alertbox.css',
  shadow: true,
})
export class Alertbox {
  @Prop() size?: 'small' | 'large' = 'small';
  @Prop() color?: 'white' | 'black' | 'error' = 'black';
  @Prop() variant?: 'floating' | 'outline';
  @Prop() icon: boolean = false;
  @Prop({ reflect: true }) close? = false;
  @State() content: boolean = true;
  @Element() element: HTMLElement;

  componentDidLoad() {
    this.content = !!this.element.querySelector("p[slot='text']");
  }

  handleIcons() {
    if (this.icon) {
      switch (this.color) {
        case 'white':
          return (
            <scale-icon-action-success
              class="alertbox__icon-success"
              accessibility-title="success"
            />
          );
        case 'black':
          return (
            <scale-icon-action-success
              class="alertbox__icon-success"
              accessibility-title="success"
            />
          );
        case 'error':
          return (
            <scale-icon-alert-error
              class="alertbox__icon-error"
              accessibility-title="error"
            />
          );
      }
    }
    return;
  }
  

  render() {
    return (
      <Host>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="container" class="alertbox__container">
            {this.handleIcons()}
            <header part="header" class="alertbox__container-header">
              <slot name="header">Missing Title</slot>
              {this.close && (
                <scale-icon-action-circle-close
                  class="alertbox__icon-close"
                  onClick={() => {
                    document.querySelector('scale-alertbox').remove();
                  }}
                  accessibility-title="close"
                />
              )}
            </header>
          </div>
          {this.content && (
            <p part="content" class="alertbox__content">
              <slot name="text" />
            </p>
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
    const name = 'alertbox';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.color && `${prefix}color-${this.color}`,
      this.variant && `${prefix}variant-${this.variant}`,
      this.icon && `${prefix}icon`
    );
  }
}
