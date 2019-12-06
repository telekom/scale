import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-tag',
  styleUrl: 'tag.css',
  shadow: true,
})
export class Tag {
  /** (optional) Tag variant */
  @Prop() public variant?: string = '';
  /** (optional) Tag pill */
  @Prop() public pill?: boolean = false;
  /** (optional) Tag on an <a> element */
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
      <div class={this.getCssClassMap()}>
        <slot />
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'tag',
      this.variant && `tag--variant-${this.variant}`,
      this.pill && `tag--pill`,
      !!this.link && 'tag--link'
    );
  }
}
