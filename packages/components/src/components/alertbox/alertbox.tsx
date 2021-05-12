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
  @Prop() color?: 'white' | 'black' | 'error'  = 'black';
  @Prop() variant?: 'floatingShadow' | 'outline';
  @Prop() iconVariant: boolean;
  @Prop({ reflect: true }) hasCloseButton? = false;
  @State() content: boolean = true;
  @Element() element: HTMLElement;
  @Event() scaleCloseAlert: EventEmitter<MouseEvent>;

  componentDidLoad() {
    this.content = !!this.element.querySelector("p[slot='text']");
    if(this.color === "error"){
      this.iconVariant = true;
    }
  }

  handleClose(event) {
    this.scaleCloseAlert.emit();
    console.log(event);
  }


  render() {
    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <div class="alertbox_container">
            <div class="alertbox_container_header">

              {this.iconVariant ? (
                <scale-icon-alert-error accessibility-title="error" />
              ) : ( 
                <scale-icon-action-success accessibility-title="success" />
              )}

              <header class="alert_heading">
                <slot name="header">Missing Title</slot>
                {this.hasCloseButton && (
                  <scale-icon-action-circle-close
                    onClick={(event) => {
                      this.handleClose(event);
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
