import { Component, h, Host, Prop } from '@stencil/core';
@Component({
  tag: 'scale-radio-button-group',
  styleUrl: './radio-button-group.css',
  shadow: true,
})
export class RadioButtonGroup {
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  render() {
    return (
      <Host>
        <div class="radio-button-group">
          <div class="radio-button-group__label">
            <h1 class="radio-button-group__title">{this.label}</h1>
            {this.helperText && (
              <div class="radio-button-group__helper-text">
                {this.helperText}
              </div>
            )}
          </div>
          <div class="radio-button-group__container">
            <slot name="radio-button-list" />
          </div>
        </div>
      </Host>
    );
  }
}
