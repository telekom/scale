import { Component, Prop, Event, h, EventEmitter, State } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import {
  Validator,
  getValidator,
  defaultValidator,
  ValidatorEntry,
} from '../../validators';

@Component({
  tag: 't-input-text',
  styleUrl: 'input-text.css',
  shadow: true,
})
export class InputText {
  /** (required) Input text class */
  @Prop() public customClass?: string = '';
  /** (optional) Input text theme */
  @Prop() public theme?: string = '';
  /** (optional) Input text value */
  @Prop({ mutable: true }) public value: string;
  /** (optional) Input text validator */
  @Prop() public validator: Array<string | ValidatorEntry | Validator<string>>;
  /** (optional) Input text event changed */
  @Event() public changed: EventEmitter<string>;
  /** (optional) Input text state touched */
  @State() public touched: boolean = false;

  // tslint:disable-next-line: variable-name
  public _validator: Validator<string> = defaultValidator;

  public componentWillLoad() {
    this._validator = getValidator<string>(this.validator);
  }

  public componentWillUpdate() {
    this._validator = getValidator<string>(this.validator);
  }

  public handleChange(event) {
    this.value = event.target ? event.target.value : null;
    this.changed.emit(this.value);
    this.touched = true;
  }

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        <input
          type="text"
          class="input-text__input"
          value={this.value}
          onInput={event => this.handleChange(event)}
        />
        {this.touched && !this._validator.validate(this.value) ? (
          <span class="input-text__validation">
            {this._validator.errorMessage}
          </span>
        ) : null}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'input-text',
      this.customClass && this.customClass,
      this.theme && `input-text--theme-${this.theme}`
    );
  }
}
