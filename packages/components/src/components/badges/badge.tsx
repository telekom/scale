import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class Badge {
  /** (required) Badge class */
  @Prop() public customClass?: string = '';
  /** (optional) Badge size */
  @Prop() public size?: string = '';
  /** (optional) Badge variant */
  @Prop() public variant?: string = '';
  /** (optional) Badge pill */
  @Prop() public pill?: boolean = false;
  /** (optional) Badge link */
  @Prop() public link?: string = '';

  public render() {
    if (!!this.link) {
      return (
        <a href={this.link} class={this.getCssClassMap()}>
          <slot />
        </a>
      );
    }
    return (
      <span class={this.getCssClassMap()}>
        <slot />
      </span>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'badge',
      this.customClass && this.customClass,
      this.size && `badge--size-${this.size}`,
      this.variant && `badge--variant-${this.variant}`,
      this.pill && `badge--pill`,
      !!this.link && 'badge--link'
    );
  }
}
