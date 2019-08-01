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
  @Prop() imageTop?: string;
  @Prop() imageTopAlt?: string = '';

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
          <slot name="header" />
        </div> 
        {this.imageTop && <img class="card__img-top" src={this.imageTop} alt={this.imageTopAlt}></img>}
        <div class="card__body">
          <slot/>
        </div>
        <div class="card__footer">
          <slot name="footer" />
        </div>
      </div>
    );
  }
}
