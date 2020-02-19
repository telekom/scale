import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-icon',
  styleUrl: 'icon.css',
})
export class Icon {
  /** (optional) Tag class */
  @Prop() public customClass?: string = '';
  /** (optional) Tag theme */
  @Prop() public theme?: string = '';
  @Prop() public name: string;
  @Prop() public path: string;

  public render() {
    return (
      <svg
        class={this.getCssClassMap()}
        width="24"
        height="24"
        viewBox="0 0 26 26"
      >
        <path d={this.path} stroke="black" fill="transparent" />
      </svg>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'icon',
      this.name && this.name,
      this.customClass && this.customClass,
      this.theme && `icon--theme-${this.theme}`
    );
  }
}
