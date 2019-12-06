import { Component, Prop, h, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-card',
  styleUrls: ['card.css'],
  shadow: true,
})
export class Card {
  @Element() public hostElement: HTMLStencilElement;
  @Prop() public size?: string = '';
  @Prop() public theme?: string = '';
  @Prop() public variant?: string = '';
  @Prop() public disabled?: boolean = false;
  @Prop() public deselected?: boolean = false;
  @Prop() public imageTop?: string;
  @Prop() public imageTopAlt?: string = '';

  private hasSlotHeader: boolean;
  private hasSlotFooter: boolean;

  public componentWillLoad() {
    this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
    this.hasSlotFooter = !!this.hostElement.querySelector('[slot="footer"]');
  }

  public render() {
    return (
      <div class={this.getCssClassMap()}>
        {this.hasSlotHeader && (
          <div class="card__header">
            <slot name="header" />
          </div>
        )}
        {this.imageTop && (
          <img
            class="card__img-top"
            src={this.imageTop}
            alt={this.imageTopAlt}
          />
        )}
        <div class="card__body">
          <slot />
        </div>
        {this.hasSlotFooter && (
          <div class="card__footer">
            <slot name="footer" />
          </div>
        )}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'card',
      this.size && `card--size-${this.size}`,
      this.theme && `card--theme-${this.theme}`,
      this.variant && `card--variant-${this.variant}`,
      this.disabled && `card--disabled`,
      this.deselected && `card--deselected`
    );
  }
}
