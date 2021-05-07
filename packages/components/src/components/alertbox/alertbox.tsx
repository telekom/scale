import { Component, h, Host, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
@Component({
  tag: 'scale-alertbox',
  styleUrl: 'alertbox.css',
  shadow: true,
})
export class Alertbox {
  @Prop() size?: 'small' | 'big' = 'small';
  @Prop() color?: 'white' | 'black' | 'magenta' = 'magenta';
  @Prop() variant?: 'floatingShadow' | 'outline';
  @Prop() iconVariant?: 'check' | 'error';
  @Prop({ reflect: true }) hasCloseButton? = false;
  @State() content: boolean = true;
  @Element() element: HTMLElement;
  @Event() scaleCloseAlert: EventEmitter<MouseEvent>; 
  componentDidLoad() {
    this.content = !!this.element.querySelector("p[slot='text']");
  }
  handleClose(event) {

    this.scaleCloseAlert.emit();
    console.log(event)
  }
  render() {
    console.log("THIS HAS CLOSE BUTTON: ",this.hasCloseButton);
    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <div class="alertbox_container">
            <div class="alertbox_container_header">
              <header class="alert_heading">
                <slot name="header">Missing Title</slot>
                {this.hasCloseButton && <scale-icon-action-circle-close 
                onClick={(event)=>{
                  this.handleClose(event);
                }}
                accessibility-title="circle-close" />}
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