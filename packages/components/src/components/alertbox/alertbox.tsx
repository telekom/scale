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
          return <scale-icon-action-success accessibility-title="success" />;
        case 'black':
          return <scale-icon-action-success accessibility-title="success" />;
        case 'error':
          return <scale-icon-alert-error accessibility-title="error" />;
      }
    }
    return;
  }

  render() {
    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <div class="alertbox__container">
            <div class="alertbox__container-header">
              {this.handleIcons()}

              <header class="alertbox__heading">
                <slot name="header">Missing Title</slot>
                {this.close && (
                  <scale-icon-action-circle-close
                    onClick={() => {
                      document.querySelector('scale-alertbox').remove();
                    }}
                    accessibility-title="circle-close"
                  />
                )}
              </header>
            </div>
            {this.content && (
              <p class="alertbox__container-content">
                <slot name="text" />
              </p>
            )}
          </div>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'alertbox',
      this.color && `alertbox--color-${this.color}`
    );
  }
}
