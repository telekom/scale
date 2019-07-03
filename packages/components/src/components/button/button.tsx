import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  /** (optional) Button size */
  @Prop() size?: string = '';
  /** (optional) Button theme */
  @Prop() theme?: string = '';
  /** (optional) Button variant */
  @Prop() variant?: string = '';
  /** (optional) Disabled button */
  @Prop() disabled?: boolean = false;
  /** (optional) Deselected button */
  @Prop() deselected?: boolean = false;

  private getCssClassMap(): CssClassMap {
    return classNames(
      'button',
       this.size && `button--size-${this.size}`,
       this.theme && `button--theme-${this.theme}`,
       this.variant && `button--variant-${this.variant}`,
       this.disabled && `button--disabled`,
       this.deselected && `button--deselected`,
    );
  }

  render() {
    return (
      <button class={this.getCssClassMap()}>
        <slot/>
      </button>
    );
  }
}
