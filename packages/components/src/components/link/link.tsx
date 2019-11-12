import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-link',
  styleUrl: 'link.css',
  shadow: true,
})
export class Link {
  /** (optional) link href */
  @Prop() public href?: string = '';
  /** (optional) link disabled */
  @Prop() public disabled?: string = '';
  /** (optional) link variant */
  @Prop() public underline?: string = '';
  /** (optional) link open a new tag */
  @Prop() public newTag?: boolean = false;
  /** (optional) link variant */
  @Prop() public variant?: string = '';

  public render() {
    if (!!this.href) {
      if (!!this.newTag) {
        return (
          <a href={this.href} class={this.getCssClassMap()} target="_blank">
            <slot />
          </a>
        );
      }
      return (
        <a href={this.href} class={this.getCssClassMap()}>
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
      this.disabled && `link--disabled`,
      this.underline && 'link--underline',
      this.variant && `link--variant-${this.variant}`
    );
  }
}
