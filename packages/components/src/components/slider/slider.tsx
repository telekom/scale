import { Component, h, State, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-slider',
  styleUrl: 'slider.css',
  shadow: true,
})
export class Slider {
  /** the binding value of the slider optional */
  @Prop() public value?: number;
  /** the minimal value of the slider optional */
  @Prop() public min?: number = 0;
  /** the maximal value of the slider optional */
  @Prop() public max?: number = 100;
  /** the step size to increase of decrease when dragging slider */
  @Prop() public step?: number = 0.1;
  /** disabled optional */
  @Prop() public disabled?: boolean = false;

  @State() private dragging: boolean;
  @State() private startX: number;
  @State() private currentX: number;
  @State() private startPosition: number;
  @State() private newPosition: number;

  private sliderTrack?: HTMLDivElement;

  public onButtonDown = event => {
    if (this.disabled) {
      return;
    }
    this.onDragStart(event);

    window.addEventListener('mousemove', this.onDragging.bind(this));
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
  };

  public render() {
    return (
      <div class="slider">
        <div
          class={this.getCssClassMap()}
          ref={el => (this.sliderTrack = el as HTMLDivElement)}
        >
          <div class="slider--bar" style={{ width: `${this.value}%` }}></div>
          <div
            class="slider--button-wrapper"
            style={{ left: `${this.value}%` }}
            onMouseDown={this.onButtonDown}
          >
            <div class="slider--button" />
          </div>
        </div>
      </div>
    );
  }

  private onDragStart = e => {
    this.dragging = true;
    this.startX = e.clientX;
    this.startPosition = parseInt(this.currentPosition(), 10);
  };

  private onDragging = event => {
    const { dragging, startX, startPosition, newPosition } = this;

    if (dragging) {
      this.currentX = event.clientX;

      let diff;

      diff = ((this.currentX - startX) / this.sliderTrack.offsetWidth) * 100;

      this.newPosition = startPosition + diff;
      this.setPosition(newPosition);
    }
  };

  private onDragEnd = () => {
    const { dragging, newPosition } = this;
    if (dragging) {
      // SetTime out to prevent slider mini change caused by click event right after mouse up
      setTimeout(() => {
        this.dragging = false;
        this.setPosition(newPosition);
      }, 0);

      window.removeEventListener('mousemove', this.onDragging.bind(this));
      window.removeEventListener('mouseup', this.onDragEnd.bind(this));
    }
  };

  private setPosition = newPosition => {
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }

    const lengthPerStep = 100 / ((this.max - this.min) / this.step);
    const steps = Math.round(newPosition / lengthPerStep);
    this.value =
      steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
  };

  private currentPosition(): string {
    return `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'slider--track',
      this.disabled && `slider--track-disabled`
    );
  }
}
