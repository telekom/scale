import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
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

  render() {
    const ariaLabel = this.label + ' ' + this.helperText;

    return (
      <form>
        <fieldset class="radio-button-group">
          <div
            class="radio-button-group__label"
            aria-label={this.helperText ? ariaLabel : this.label}
            tabindex="0"
          >
            <legend class="radio-button-group__title">{this.label}</legend>
            {this.helperText ? (
              <div class={this.getCssClassMap()}>{this.helperText}</div>
            ) : null}
          </div>
          <div class="radio-button-group__container">
            <slot />
          </div>
        </fieldset>
      </form>
    );
  }

  getCssClassMap() {
    return classNames(
      'radio-button-group__helper-text',
      this.status === 'error' && `radio-button-group__helper-text--status-error`
    );
  }
}
