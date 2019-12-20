import { Component, h, Prop, State } from '@stencil/core';
import star from './star.svg';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-star-rating',
  styleUrl: 'star-rating.css',
  shadow: true,
})
export class StarRating {
  @Prop() public range = [1, 2, 3, 4, 5];
  @Prop() public disabled?: boolean = false;

  @State() private selectedValue = null;
  @State() private preSelectValue = 0;
  @State() private selected = false;

  public handleMouseEnter = val => {
    this.preSelectValue = val;
  };

  public handleMouseLeave = val => {
    if (this.selectedValue) {
      this.preSelectValue = val;
    } else {
      this.preSelectValue = 0;
    }
  };

  public handleClick = val => {
    if (this.selectedValue !== val) {
      this.selectedValue = val;
      this.preSelectValue = val;
    } else {
      this.selectedValue = null;
      this.preSelectValue = 0;
    }
  };

  public render() {
    return (
      <div class="star-rating">
        {this.range.map(val => {
          this.selected = val <= this.preSelectValue;
          return (
            <div
              class={this.getCssClassMap()}
              onMouseEnter={() => this.handleMouseEnter(val)}
              onMouseLeave={() => this.handleMouseLeave(val)}
              onClick={() => this.handleClick(val)}
              innerHTML={star}
            />
          );
        })}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'star-rating--svg-container',
      this.selected && `star--selected`
    );
  }
}
