import { Component, Prop, h, Method } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class Button {
  /** (optional) Button class */
  @Prop() public customClass?: string = '';
  /** (optional) Button size */
  @Prop() public size?: string = '';
  /** (optional) Button theme */
  @Prop() public theme?: string = '';
  /** (optional) Button variant */
  @Prop() public variant?: string = '';
  /** (optional) Disabled button */
  @Prop() public disabled?: boolean = false;
  /** (optional) Deselected button */
  @Prop() public deselected?: boolean = false;

  /** Button method: disable()  */
  @Method()
  public async disable() {
    this.disabled = true;
  }

  /** Button method: enable()  */
  @Method()
  public async enable() {
    this.disabled = false;
  }

  public render() {
    return (
      <button class={this.getCssClassMap()} disabled={this.disabled}>
        <slot />
      </button>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'button',
      this.customClass && this.customClass,
      this.size && `button--size-${this.size}`,
      this.theme && `button--theme-${this.theme}`,
      this.variant && `button--variant-${this.variant}`,
      this.disabled && `button--disabled`,
      this.deselected && `button--deselected`
    );
  }
}
