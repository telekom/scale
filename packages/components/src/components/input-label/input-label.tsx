import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-input-label',
  styleUrl: 'input-label.css',
  shadow: true,
})
export class InputLabel {
  /** (optional) Input text class */
  @Prop() public customClass?: string = '';
  /** (optional) Input text theme */
  @Prop() public theme?: string = '';

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        <slot />
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'input-label',
      this.customClass && this.customClass,
      this.theme && `input-label--theme-${this.theme}`
    );
  }
}
