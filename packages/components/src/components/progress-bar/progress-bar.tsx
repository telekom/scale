import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  /** (optional) Progress bar class */
  @Prop() public customClass?: string = '';
  /** (required) Progress bar percentage */
  @Prop() public percentage: number;
  /** (optional) Progress bar variant */
  @Prop() public variant?: string;
  /** (optional) Progress bar stroke width */
  @Prop() public strokeWidth?: number = 6;
  /** (optional) Progress bar percentage text */
  @Prop() public showText?: boolean;
  /** (optional) Progress text display inside bar */
  @Prop() public textInside?: boolean;

  public render() {
    return (
      <div class="progress-bar">
        <div
          class="progress-bar-outer"
          style={{ height: `${this.strokeWidth}px` }}
        >
          <div
            class={`progress-bar-inner ${this.getCssClassMap()}`}
            style={{ width: `${this.percentage}%` }}
          >
            {!!this.textInside && (
              <div class="progress-bar-inner-text">{`${this.percentage}%`}</div>
            )}
          </div>
        </div>

        {!!this.showText && (
          <div class="progress-bar-text">{`${this.percentage}%`}</div>
        )}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'progress-bar',
      this.customClass && this.customClass,
      this.variant && `progress-bar-inner-variant-${this.variant}`
    );
  }
}
