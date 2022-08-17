import { Component, Element, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-radio-button-group',
  styleUrl: './radio-button-group.css',
  shadow: true,
})
export class RadioButtonGroup {
  @Element() hostElement: HTMLElement;
  /** (optional) Input label */
  @Prop() label: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** @deprecated - invalid should replace status */
  @Prop() status?: string = '';
  /** (optional) Input status */
  @Prop() info?: boolean = true;  
  /** (optional) Input status */
  @Prop() invalid?: boolean = false;
  /** (optional) Input status */
  @Prop() warning?: boolean = false;  
  /** (optional) Input status */
  @Prop() success?: boolean = false; 

  componentWillLoad() {
    if (this.invalid || this.warning || this.success) {
      this.info = false
    }
  }

  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message:
          'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  renderHelperIcon() {
    if (this.info || this.warning) {
      return <scale-icon-alert-information size={11}></scale-icon-alert-information>      
    }
    if (this.invalid) {
      return <scale-icon-alert-error size={11}></scale-icon-alert-error>
    }
    if (this.success) {
      return <scale-icon-alert-success size={11}></scale-icon-alert-success>
    }
  }  

  render() {
    return (
      <fieldset class="radio-button-group">
        <legend class="radio-button-group__title">
          <label
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
              {this.renderHelperIcon()}
              {this.helperText}
            </div>
          ) : null}
        </legend>
        <div class="radio-button-group__container">
          <slot />
        </div>
      </fieldset>
    );
  }

  getCssClassMap() {
    return classNames(
      'radio-button-group__helper-text',
      this.warning && `radio-button-group__helper-text--status-warning`, 
      this.success && `radio-button-group__helper-text--status-success`,
      (this.status === 'error' || this.invalid) &&
        `radio-button-group__helper-text--status-error`
    );
  }
}
