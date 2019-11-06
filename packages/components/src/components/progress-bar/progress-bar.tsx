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
  @Prop() public showText?: boolean = false;
  /** (optional) progress text display inside bar */
  @Prop() public textInside?: boolean = false;

  public render() {
    return (
      <div class="progress-bar">
        <div
          class="progress-bar__outer"
          style={{ height: `${this.strokeWidth}px` }}
        >
          <div
            class={`progress-bar__inner ${this.getCssClassMap()}`}
            style={{ width: `${this.percentage}%` }}
          >
            {this.textInside && this.textInside === true && (
              <div class="progress-bar__inner-text">{`${this.percentage}%`}</div>
            )}
          </div>
        </div>

        {!!this.showText && (
          <div class="progress-bar__text">{`${this.percentage}%`}</div>
        )}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      this.variant && `progress-bar__inner-variant-${this.variant}`
    );
  }
}
