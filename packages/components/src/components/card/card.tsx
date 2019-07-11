import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-card',
  styleUrls: [
    'card.css'
  ],
  shadow: true
})
export class card {
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop() disabled?: boolean = false;
  @Prop() deselected?: boolean = false;

  private getCssClassMap(): CssClassMap {
    return classNames(
      'card',
      this.size && `card--size-${this.size}`,
      this.theme && `card--theme-${this.theme}`,
      this.variant && `card--variant-${this.variant}`,
      this.disabled && `card--disabled`,
      this.deselected && `card--deselected`,
    );
  }

  render() {
    return (
      <div class={this.getCssClassMap()}>
        <div class="card__header">
        <h4 class="card-title">Testtitel Header</h4>
        <h5 class="card-subtitle">Subtitel Header</h5>
          <slot name="header" />
        </div> 
        <img class="card-img-top" src="http://placehold.it/400x300" alt="Card image"></img>
        <div class="card__body">
          <slot/>
          <t-button variant="primary" class="hydrated">Click me!</t-button>
        </div>
        <div class="card__footer">
        <h4 class="card-title">Testtitel Footer</h4>
          <slot name="footer" />
        </div>
      </div>
    );
  }
}
