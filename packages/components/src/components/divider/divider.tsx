import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-divider',
  styleUrls: ['divider.css'],
  shadow: true,
})
export class Divider {
  /** (optional) Devider class */
  @Prop() public customClass?: string = '';
  /** (optional) Devider size */
  @Prop() public size?: string = '';
  /** (optional) Devider theme */
  @Prop() public theme?: string = '';
  /** (optional) Devider horizontal */
  @Prop() public horizontal?: boolean = true;
  /** (optional) Devider vertical */
  @Prop() public vertical?: boolean = false;

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        {this.horizontal && <hr class="divider__horizontal" />}
        {!this.horizontal && (
          /* istanbul ignore next */ <span class="divider__vertical" />
        )}
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
