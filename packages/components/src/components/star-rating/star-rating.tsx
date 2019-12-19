import { Component, h, Prop } from '@stencil/core';
import star from './star.svg';
/* import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames'; */

@Component({
  tag: 't-star-rating',
  styleUrl: 'star-rating.css',
  shadow: true,
})
export class StarRating {
  @Prop() public disabled?: boolean = false;

  public render() {
    return (
      <div>
        <img src={star} alt="star rating" />
      </div>
    );
  }

  /*   private getCssClassMap(): CssClassMap {
    return classNames('star-rating', this.disabled && `star--rating--disabled`);
  } */
}
