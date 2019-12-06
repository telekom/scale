import { Component, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-input-text',
  styleUrl: 'input-text.css',
  shadow: true,
})
export class InputText {
  public render() {
    return <input type="text" class={this.getCssClassMap()} />;
  }
  private getCssClassMap(): CssClassMap {
    return classNames('input-text');
  }
}
