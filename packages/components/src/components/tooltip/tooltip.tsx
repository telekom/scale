import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop() public size?: string = '';
  @Prop() public delay?: number | object = 0;
  @Prop() public placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right' =
    'auto';
  @Prop() public offset?: string | number = '';

  public render() {
    return (
      <span class={this.getCssClassMap()}>
        <slot />
      </span>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'tooltip',
      this.size && `tooltip--size-${this.size}`,
      this.placement && `tooltip--placement-${this.placement}`
    );
  }
}
