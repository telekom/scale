import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-text',
  styleUrl: 'text.css',
  shadow: true,
})
export class Text {
  /** (optional) Tag class */
  @Prop() public customClass?: string = '';
  /** (optional) Tag theme */
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
      'text',
      this.customClass && this.customClass,
      this.theme && `text--theme-${this.theme}`
    );
  }
}
