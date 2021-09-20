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
    return (
      <form>
        <fieldset class="radio-button-group">
          <legend class="radio-button-group__title">
            <label
              role="text"
              class="radio-button-group__title-label"
              aria-label={this.label}
            >
              {this.label}
            </label>
            {this.helperText ? (
              <div
                role="text"
                class={this.getCssClassMap()}
                aria-label={this.helperText}
              >
                {this.helperText}
              </div>
            ) : null}
          </legend>
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
