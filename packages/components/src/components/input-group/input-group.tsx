import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-input-group',
  styleUrl: 'input-group.css',
  shadow: true,
})
export class InputGroup {
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
      'input-group',
      this.customClass && this.customClass,
      this.theme && `input-group--theme-${this.theme}`
    );
  }
}
