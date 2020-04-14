import { Component, Prop, Event, h, EventEmitter, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './input.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-input',
  shadow: true,
})
export class Input implements Base {
  /** (optional) Input text class */
  @Prop() customClass?: string = '';
  /** (optional) Input type */
  @Prop() type?:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'url' = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input label variant */
  @Prop() variant?: string = 'inline';
  /** (optional) Input label */
  @Prop() label?: string = '';
  /** (optional) Input helper text */
  @Prop() helperText?: string = '';
  /** (optional) Input status */
  @Prop() status?: string = '';
  /** (optional) Input max length */
  @Prop() maxLength?: number;
  /** (optional) Input min length */
  @Prop() minLength?: number;
  /** (optional) Input placeHolder */
  @Prop() placeholder?: string = '';
  /** (optional) Input disabled */
  @Prop() disabled?: boolean;
  /** (optional) Input required */
  @Prop() required?: boolean;
  /** (optional) Input counter */
  @Prop() counter?: boolean;
  /** (optional) Input value */
  @Prop({ mutable: true }) value?: string;
  /** (optional) Input text event changed */
  @Event() changed: EventEmitter<string>;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Input', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  handleChange(event) {
    this.value = event.target ? event.target.value : this.value;
    this.changed.emit(this.value);
  }

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <div class={this.getCssClassMap()}>
          <input
            type={this.type}
            class={this.getCssClassMap()}
            value={this.value}
            name={this.name}
            required={this.required}
            minLength={this.minLength}
            maxLength={this.maxLength}
            onInput={event => this.handleChange(event)}
            onFocus={event => this.handleChange(event)}
            onBlur={event => this.handleChange(event)}
            onKeyDown={event => this.handleChange(event)}
            placeholder={this.placeholder}
            disabled={this.disabled}
          ></input>
          {!!this.label && <label>{this.label}</label>}
          {!!this.helperText && (
            <div class="input__helper-text">{this.helperText}</div>
          )}

          {this.counter && (
            <div class="input__counter">
              {!!this.value ? this.value.length : 0} / {this.maxLength}
            </div>
          )}
        </div>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.input,
      this.customClass && this.customClass,
      this.type && classes[`input--type-${this.type}`],
      this.variant && classes[`input--variant-${this.variant}`],
      this.disabled && classes[`input--disabled`],
      this.status && classes[`input--status-${this.status}`],
      !!this.value &&
        this.variant === 'inline' &&
        classes['input--variant-inline-animated']
    );
  }
}
