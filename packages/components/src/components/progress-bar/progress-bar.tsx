import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  /** (required) progress percentage */
  @Prop() public percentage: number;
  /** (optional) show progress variant */
  @Prop() public variant?: string;
  /** (optional) progress stroke width */
  @Prop() public strokeWidth?: number = 6;
  /** (optional) show progress percentage text */
  @Prop() public showText?: boolean;
  /** (optional) progress text display inside bar */
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
      this.variant && `progress-bar-inner-variant-${this.variant}`
    );
  }
}
