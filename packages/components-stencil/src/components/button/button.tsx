import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-button',
  styleUrls: [
    './../../../../../node_modules/@telements/styles/dist/button.css',
    'button.css'
  ],
  shadow: true
})
export class Button {
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop() disabled?: boolean = false;
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
