import { Component, Prop, Event, h, EventEmitter } from '@stencil/core';
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
  @Prop({ mutable: true }) public value: string;

  @Prop() public validator: Array<string | ValidatorEntry | Validator<string>>;

  @Event() public changed: EventEmitter<string>;

  @Prop() public theme: string;

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
  }

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        <div>
          <input
            type="text"
            class="input-text__input"
            value={this.value}
            onInput={event => this.handleChange(event)}
          />
        </div>
        {!this._validator.validate(this.value) ? (
          <span class="validation-error">{this._validator.errorMessage}</span>
        ) : null}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'input-text',
      this.theme && `input-text--theme-${this.theme}`
    );
  }
}
