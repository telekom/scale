import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-divider',
  styleUrls: ['divider.css'],
  shadow: true,
})
export class Divider {
  /** (optional) Card class */
  @Prop() public customClass?: string = '';
  /** (optional) Card size */
  @Prop() public size?: string = '';
  /** (optional) Card theme */
  @Prop() public theme?: string = '';
  @Prop() public horizontal?: boolean = true;
  @Prop() public vertical?: boolean = false;

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        {this.horizontal && <hr class="divider__horizontal" />}
        {!this.vertical && <span class="divider__vertical" />}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'divider',
      this.customClass && this.customClass,
      this.size && `divider--size-${this.size}`,
      this.theme && `divider--theme-${this.theme}`,
      this.vertical && `divider--vertical`
    );
  }
}
