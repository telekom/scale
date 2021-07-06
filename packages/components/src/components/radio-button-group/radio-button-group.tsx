import { Component, h, Prop } from '@stencil/core';
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
  /** (optional) Input status */
  @Prop() status?: string = '';

  handleHelperText() {
    if (this.helperText && this.status === 'error') {
      return (
        <div class="radio-button-group__error-helper-text">
          {this.helperText}
        </div>
      );
    } else if (this.helperText) {
      return (
        <div class="radio-button-group__helper-text">{this.helperText}</div>
      );
    }
  }

  render() {
    return (
      <form>
        <fieldset class="radio-button-group">
          <div class="radio-button-group__label">
            <legend class="radio-button-group__title">{this.label}</legend>
            {this.handleHelperText()}
          </div>
          <div class="radio-button-group__container">
            <slot />
          </div>
        </fieldset>
      </form>
    );
  }
}
