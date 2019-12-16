import { Component, h, State, Prop } from '@stencil/core';
/* import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames'; */

@Component({
  tag: 't-slider',
  styleUrl: 'slider.css',
  shadow: true,
})
export class Slider {
  @Prop() public value?: number;
  @Prop() public min?: number = 0;
  @Prop() public max?: number = 100;
  /** Slider props disabled optional */
  @Prop() public disabled?: boolean = false;

  @State() private dragging: boolean;
  @State() private startX: number;
  @State() private startY: number;
  @State() private currentX: number;
  @State() private currentY: number;
  @State() private startPosition: number;
  @State() private newPosition: number;

  public onButtonDown = event => {
    if (this.disabled) {
      return;
    }
    this.onDragStart(event);
  };

  public onDragStart = e => {
    this.dragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startPosition = parseInt(this.currentPosition(), 10);
  };

  public render() {
    return (
      <div class="slider">
        <div class="slider--track">
          <div class="slider--bar" style={{ width: `${this.value}` }}></div>
          <div
            class="slider--button-wrapper"
            style={{ left: `${this.value}` }}
            onMouseDown={this.onButtonDown}
          >
            <div class="slider--button" />
          </div>
        </div>
      </div>
    );
  }

  private currentPosition(): string {
    return `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
  }
}
