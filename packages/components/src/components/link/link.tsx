import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-link',
  styleUrl: 'link.css',
  shadow: true,
})
export class Link {
  /** (optional) Link class */
  @Prop() public customClass?: string = '';
  /** (optional) Link href */
  @Prop() public href?: string = '';
  /** (optional) Disabled link */
  @Prop() public disabled?: boolean = false;
  /** (optional) Link underline */
  @Prop() public underline?: boolean = false;
  /** (optional) Link open a new tag */
  @Prop() public openNewTab?: boolean = false;
  /** (optional) Link variant */
  @Prop() public variant?: string = '';

  public render() {
    if (!!this.href && !this.disabled) {
      return (
        <a
          href={this.href}
          class={this.getCssClassMap()}
          target={this.openNewTab ? '_blank' : null}
        >
          <slot />
        </a>
      );
    }
    return (
      <div class={this.getCssClassMap()}>
        <slot />
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'link',
      this.customClass && this.customClass,
      this.disabled && `link--disabled`,
      this.underline && 'link--underline',
      this.variant && `link--variant-${this.variant}`
    );
  }
}
