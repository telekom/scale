import { Component, Prop, Event, h, EventEmitter } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

export type InputTypes =
  | 'email'
  | 'hidden'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'url';

@Component({
  tag: 't-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class Input {
  /** (optional) Input text class */
  @Prop() public customClass?: string = '';
  /** (optional) Input text theme */
  @Prop() public theme?: string = '';
  /** (optional) Input type */
  @Prop() public type?: InputTypes = 'text';
  /** (optional) Input name */
  @Prop() public name?: string = '';
  /** (optional) Input text value */
  @Prop({ mutable: true }) public value?: string;
  /** (optional) Input text error message */
  @Prop({ mutable: true }) public errorMessage?: string;
  /** (optional) Input text event changed */
  @Event() public changed: EventEmitter<string>;

  public handleChange(event) {
    this.value = event.target ? event.target.value : this.value;
    this.changed.emit(this.value);
  }

  public render() {
    return (
      <input
        type={this.type}
        class={this.getCssClassMap()}
        value={this.value}
        name={this.name}
        onInput={event => this.handleChange(event)}
      />
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'input',
      this.customClass && this.customClass,
      this.theme && `input--theme-${this.theme}`,
      this.type && `input--type-${this.type}`
    );
  }
}
