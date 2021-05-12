import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-alertbox',
  styleUrl: 'alertbox.css',
  shadow: true,
})
export class Alertbox {
  @Prop() size?: 'small' | 'big' = 'small';
  @Prop() color?: 'white' | 'black' | 'error' = 'black';
  @Prop() variant?: 'floatingShadow' | 'outline';
  @Prop() icon: boolean = false;
  @Prop({ reflect: true }) close? = false;
  @State() content: boolean = true;
  @Element() element: HTMLElement;
  @Event() scaleCloseAlert: EventEmitter<MouseEvent>;

  componentDidLoad() {
    this.content = !!this.element.querySelector("p[slot='text']");
  }

  handleClose() {
    this.scaleCloseAlert.emit();
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
          <div class="alertbox_container">
            <div class="alertbox_container_header">
              {this.handleIcons()}

              <header class="alert_heading">
                <slot name="header">Missing Title</slot>
                {this.close && (
                  <scale-icon-action-circle-close
                    onClick={() => {
                      this.handleClose();
                    }}
                    accessibility-title="circle-close"
                  />
                )}
              </header>
            </div>
            {this.content && (
              <p class="alertbox_container_content">
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
      'Alertbox',
      this.color && `alertbox--color-${this.color}`
    );
  }
}
