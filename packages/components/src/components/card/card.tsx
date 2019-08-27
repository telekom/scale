import { Component, Prop, h, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-card',
  styleUrls: [
    'card.css'
  ],
  shadow: true
})
export class Card {
  @Element() hostElement: HTMLStencilElement;
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop() disabled?: boolean = false;
  @Prop() deselected?: boolean = false;
  @Prop() imageTop?: string;
  @Prop() imageTopAlt?: string = '';
  
  private hasSlotHeader: boolean;
  private hasSlotFooter: boolean;

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

  componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotFooter = !!this.hostElement.querySelector('[slot="footer"]');
  }

  render() {
    return (
      <div class={this.getCssClassMap()}>
        {this.hasSlotHeader && (
          <div class="card__header">
            <slot name="header" />
          </div>
        )}
        {this.imageTop && (
          <img class="card__img-top" src={this.imageTop} alt={this.imageTopAlt} />
        )}
        <div class="card__body">
          <slot/>
        </div>
        {this.hasSlotFooter && (
          <div class="card__footer">
            <slot name="footer" />
          </div>
        )}
      </div>
    );
  }
}
