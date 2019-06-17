import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-alert',
  styleUrls: [
    './../../../../../node_modules/@telements/styles/dist/alert.css',
    'alert.css'
  ],
  shadow: true
})
export class alert {
  @Prop() customClass?: string = '';
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';

  private getCssClassMap(): CssClassMap {
    return classNames(
      'alert',
      this.customClass && this.customClass,
      this.size && `alert--size-${this.size}`,
      this.theme && `alert--theme-${this.theme}`,
      this.variant && `alert--variant-${this.variant}`,
    );
  }

  render() {
    return (
      <div class={this.getCssClassMap()}>
        <slot/>
      </div>
    );
  }
}
