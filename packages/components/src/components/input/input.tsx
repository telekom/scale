import { Component, Prop, Event, h, EventEmitter, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './input.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

type InputTypes =
  | 'email'
  | 'hidden'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'url';

@Component({
  tag: 'scale-input',
  shadow: true,
})
export class Input implements Base {
  /** (optional) Input text class */
  @Prop() customClass?: string = '';
  /** (optional) Input type */
  @Prop() type?: InputTypes = 'text';
  /** (optional) Input name */
  @Prop() name?: string = '';
  /** (optional) Input text value */
  @Prop({ mutable: true }) value?: string;
  /** (optional) Input text error message */
  @Prop({ mutable: true }) errorMessage?: string;
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
        <input
          type={this.type}
          class={this.getCssClassMap()}
          value={this.value}
          name={this.name}
          onInput={event => this.handleChange(event)}
        />
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.input,
      this.customClass && this.customClass,
      this.type && classes[`input--type-${this.type}`]
    );
  }
}
