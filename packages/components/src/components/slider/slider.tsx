/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// ((input - min) * 100) / (max - min)

import {
  Component,
  h,
  State,
  Prop,
  Host,
  Event,
  Watch,
  EventEmitter,
  Element,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';
import statusNote from '../../utils/status-note';

let index = 0;

@Component({
  tag: 'scale-slider',
  styleUrl: './slider.css',
  shadow: true,
})
export class Slider {
  sliderTrack?: HTMLDivElement;
  /* Host HTML Element */
  @Element() hostElement: HTMLElement;
  /** (optional) the platform the slider is used for */
  @Prop() platform?: 'web' | 'ios' | 'android' = 'web';
  /** (optional) the name of the slider */
  @Prop() name?: string;
  /** (optional) the display value of from slider */
  @Prop() valueFrom?: number;
  /** (optional) the display value of the to slider */
  @Prop() valueTo?: number;
  /** (optional) the minimal value of the slider */
  @Prop() min?: number = 0;
  /** (optional) the maximal value of the slider */
  @Prop() max?: number = 100;
  /** (optional) the step size to increase or decrease when dragging slider */
  @Prop() step?: number = 1;
  /** (optional) slider shows visible steps */
  @Prop() visibleStep?: boolean = false;
  /** (optional) slider label */
  @Prop() label?: string;
  /** (optional) slider display value */
  @Prop() showValue?: boolean = true;
  /** (optional) slider value unit */
  @Prop() unit?: string = '%';
  /** (optional) number of decimal places */
  @Prop() decimals?: 0 | 1 | 2 = 0;
  /** @deprecated - (optional) smaller track */
  @Prop() trackSmall?: boolean = false;
  /** @deprecated - (optional) larger thumb */
  @Prop() thumbLarge?: boolean = false;
  /** @deprecated - (optional) slider custom color */
  @Prop() customColor?: string;
  /** (optional) disabled  */
  @Prop() disabled?: boolean = false;
  /** (optional) Slider id */
  @Prop() sliderId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  // The actual position in % of the slider thumb
  @State() positionValueFrom: number;
  // The actual position in % of the slider thumb
  @State() positionValueTo: number;
  // The selected slider length
  @State() sliderLength: number;

  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter<number>;

  @Event({ eventName: 'scale-input' }) scaleInput: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleInput' }) scaleInputLegacy: EventEmitter<number>;

  //Boolean whether FROM thumb is currently being dragged
  private draggingValueFrom: boolean;
  //Boolean whether TO thumb is currently being dragged
  private draggingValueTo: boolean;
  //Current positioning of the FROM thumbs as seen from the left
  private offsetLeftValueFrom: number;
  //Current positioning of the TO thumbs as seen from the left.
  private offsetLeftValueTo: number;
  //Current selected thumb
  private thumbNumber: string;
  //Based on this array the step points are generated, measured by the length the number is determined
  private stepPointInitArray = [];
  //Signals that a range slider is rendered
  private activeRange: boolean;

  constructor() {
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  @Watch('valueFrom')
  handleValueChange() {
    this.setPosition();
  }

  @Watch('valueTo')
  handleValueToChange() {
    this.setPosition();
  }

  componentWillLoad() {
    if (this.sliderId == null) {
      this.sliderId = 'slider-' + index++;
    }
    //
    this.valueFrom || this.valueFrom === 0
      ? (this.activeRange = true)
      : (this.activeRange = false);
    this.initPosition();
    this.generateStepPoints();
  }

  disconnectedCallback() {
    this.removeGlobalListeners();
  }

  componentDidLoad() {
    if (this.customColor !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "customColor" is deprecated. 
          Please use css variable "--background-bar" to set the slider-bar color;
          e.g. <scale-slider value="20" style="--background-bar: green"></scale-slider>`,
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.thumbLarge !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "thumbLarge" is deprecated.`,
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.trackSmall !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "trackSmall" is deprecated.`,
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  componentDidRender() {
    const sliderLength = this.hostElement.shadowRoot.querySelector(
      '#slider_track-point-wrapper'
    ) as HTMLInputElement;
    console.log(sliderLength.offsetWidth);
    this.sliderLength = sliderLength.offsetWidth;
  }

  onButtonDown = (event: any) => {
    const targetIDString = event.target.id;
    this.thumbNumber = targetIDString.charAt(0);
    if (this.disabled) {
      return;
    }
    this.onDragStart();
    this.addGlobalListeners();
  };

  onKeyDown = (event: KeyboardEvent, id: string) => {
    let steps = 0;
    const targetIDString = id;
    this.thumbNumber = targetIDString.charAt(0);
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      steps = event.key === 'ArrowRight' ? this.step : -this.step;
    }
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      steps = event.key === 'ArrowUp' ? this.step * 10 : -this.step * 10;
    }
    this.thumbNumber === '1'
      ? this.setValue(this.valueFrom + steps)
      : this.setValueTo(this.valueTo + steps);
  };

  onDragStart = () => {
    switch (this.thumbNumber) {
      case '2':
        this.draggingValueTo = true;
        this.offsetLeftValueTo = this.sliderTrack.getBoundingClientRect().left;
      default:
        this.draggingValueFrom = true;
        this.offsetLeftValueFrom = this.sliderTrack.getBoundingClientRect().left;
    }
  };

  onDragging = (event: any) => {
    switch (this.thumbNumber) {
      case '1':
        if (this.draggingValueFrom) {
          this.setValue(
            this.getNextDraggingValue(event, this.offsetLeftValueFrom)
          );
        }
      case '2':
        if (this.draggingValueTo) {
          this.setValueTo(
            this.getNextDraggingValue(event, this.offsetLeftValueTo)
          );
        }
    }
  };

  getNextDraggingValue = (event: any, offsetLeft: number) => {
    const currentX = this.handleTouchEvent(event).clientX;
    const position: number =
      ((currentX - offsetLeft) / this.sliderTrack.offsetWidth) * 100;
    const nextValue = (position * (this.max - this.min)) / 100 + this.min;
    // https://stackoverflow.com/q/14627566
    const roundedNextValue = Math.ceil(nextValue / this.step) * this.step;
    return roundedNextValue;
  };

  onDragEnd = () => {
    switch (this.thumbNumber) {
      case '2':
        this.draggingValueTo = false;
        emitEvent(this, 'scaleChange', this.valueTo);
      default:
        this.draggingValueFrom = false;
        emitEvent(this, 'scaleChange', this.valueFrom);
    }
    this.removeGlobalListeners();
  };

  handleTouchEvent(event: any): MouseEvent | Touch {
    return event.type.indexOf('touch') === 0 ? event.touches[0] : event;
  }

  setValue = (nextValue: number) => {
    this.valueFrom = this.clamp(nextValue);
    emitEvent(this, 'scaleInput', this.valueFrom);
  };

  setValueTo = (nextValue: number) => {
    this.valueTo = this.clamp(nextValue);
    emitEvent(this, 'scaleInput', this.valueTo);
  };

  initPosition = () => {
    this.positionValueFrom = !this.valueFrom
      ? 0
      : this.getClampedPosition(this.valueFrom);
    this.positionValueTo = !this.valueTo
      ? 0
      : this.getClampedPosition(this.valueTo);
  };

  setPosition = () => {
    console.log(this.valueTo);
    this.positionValueFrom = this.getClampedPosition(this.valueFrom);
    this.positionValueTo = this.getClampedPosition(this.valueTo);
  };

  getClampedPosition(value: number) {
    const clampedValue = this.clamp(value);
    return ((clampedValue - this.min) * 100) / (this.max - this.min);
  }

  addGlobalListeners() {
    window.addEventListener('mousemove', this.onDragging.bind(this));
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
    window.addEventListener('touchmove', this.onDragging.bind(this));
    window.addEventListener('touchend', this.onDragEnd.bind(this));
  }

  removeGlobalListeners() {
    window.removeEventListener('mousemove', this.onDragging);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchmove', this.onDragging);
    window.removeEventListener('touchend', this.onDragEnd);
  }

  generateStepPoints() {
    const numberOfSteps = this.max / this.step;
    this.stepPointInitArray.length = 0;
    for (let i = -1; i < numberOfSteps; i++) {
      this.stepPointInitArray.push(`${i + 1}`);
    }
  }

  generateCurrentValueArray() {
    const currentValues = [];
    currentValues.push(this.valueFrom != null ? this.valueFrom : '0');
    currentValues.push(this.valueTo != null ? this.valueTo : '0');
    return currentValues;
  }

  getLowestValue() {
    return Math.min(...this.generateCurrentValueArray());
  }

  getHighestValue() {
    return Math.max(...this.generateCurrentValueArray());
  }

  getDistanceBetweenValues() {
    return this.getHighestValue() - this.getLowestValue();
  }

  /* Calculate the current left offset for the thumbs in px. 
  Here the horizontal paddings are already considered. */
  getThumbOffset(thumb: string) {
    // -16px, sum of both paddings right and left of 8px each
    const sliderLengthWithoutHoricontalPadding = this.sliderLength - 16;
    const valueRange = this.max - this.min;
    const sliderPositionToInPx =
      (this.valueTo / valueRange) * sliderLengthWithoutHoricontalPadding;
    const sliderPositionFromInPx =
      (this.valueFrom / valueRange) * sliderLengthWithoutHoricontalPadding;

    // 8px, related to the padding-left
    switch (thumb) {
      case 'to':
        return sliderPositionToInPx + 8;
      case 'from':
        return sliderPositionFromInPx + 8;
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div class="slider__headline">
            {!!this.label && (
              <label
                part="label"
                class="slider__label"
                id={`${this.sliderId}-label`}
                htmlFor={this.sliderId}
              >
                {this.label}
              </label>
            )}
            {this.showValue && (
              <div part="display-value" class="slider__display-value">
                {this.valueTo != null &&
                  !this.activeRange &&
                  this.valueTo.toFixed(this.decimals)}
                {this.activeRange &&
                  this.getLowestValue() + '-' + this.getHighestValue()}
                {this.unit != null && this.unit}
              </div>
            )}
          </div>
          <div part="track-wrapper" class="slider__track-wrapper">
            <div
              part="track"
              class="slider__track"
              ref={(el) => (this.sliderTrack = el as HTMLDivElement)}
            >
              {this.activeRange ? (
                <div
                  part="bar"
                  class="slider__bar"
                  style={{
                    width: `${
                      (this.getDistanceBetweenValues() / this.max) * 100
                    }%`,
                    left: `${(this.getLowestValue() / this.max) * 100}%`,
                    backgroundColor: this.customColor
                      ? this.customColor
                      : this.disabled
                      ? `var(--background-bar-disabled)`
                      : `var(--background-bar)`,
                  }}
                ></div>
              ) : (
                <div
                  part="bar"
                  class="slider__bar"
                  style={{
                    width: `${this.positionValueTo}%`,
                    backgroundColor: this.customColor
                      ? this.customColor
                      : this.disabled
                      ? `var(--background-bar-disabled)`
                      : `var(--background-bar)`,
                  }}
                ></div>
              )}
              <div
                class="slider_track-point-wrapper"
                id="slider_track-point-wrapper"
              >
                {this.visibleStep === true
                  ? this.stepPointInitArray.map(() => {
                      return <div class="slider_track-point"></div>;
                    })
                  : null}
              </div>
              {this.activeRange && (
                <div
                  part="thumb-wrapper"
                  class="slider__thumb-wrapper"
                  id={'1-' + this.sliderId + '-wrapper'}
                  style={{
                    left: `${this.getThumbOffset('from')}px`,
                  }}
                  onMouseDown={this.onButtonDown}
                  onTouchStart={this.onButtonDown}
                >
                  <div
                    part="thumb"
                    class="slider__thumb"
                    tabindex="0"
                    role="slider"
                    id={'1-' + this.sliderId}
                    aria-valuemin={this.min}
                    aria-valuenow={this.valueFrom}
                    aria-valuemax={this.max}
                    aria-valuetext={`${this.valueFrom}`}
                    aria-labelledby={`${this.sliderId}-label`}
                    aria-orientation="horizontal"
                    aria-disabled={this.disabled}
                    onKeyDown={(event) => {
                      this.onKeyDown(event, `1-${this.sliderId}`);
                    }}
                  />
                </div>
              )}
              <div
                part="thumb-wrapper"
                class="slider__thumb-wrapper-to"
                id={'2-' + this.sliderId + '-wrapper'}
                style={{
                  left: `${this.getThumbOffset('to')}px`,
                }}
                onMouseDown={this.onButtonDown}
                onTouchStart={this.onButtonDown}
              >
                <div
                  part="thumb"
                  class="slider__thumb"
                  tabindex="0"
                  role="slider"
                  id={'2-' + this.sliderId}
                  aria-valuemin={this.min}
                  aria-valuenow={this.valueTo}
                  aria-valuemax={this.max}
                  aria-valuetext={`${this.valueTo}`}
                  aria-labelledby={`${this.sliderId}-label`}
                  aria-orientation="horizontal"
                  aria-disabled={this.disabled}
                  onKeyDown={(event) => {
                    this.onKeyDown(event, `2-${this.sliderId}`);
                  }}
                />
              </div>
            </div>
            <input type="hidden" value={this.valueFrom} name={this.name} />
          </div>
        </div>
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'slider';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.disabled && `${prefix}disabled`,
      this.platform && `${prefix}${this.platform}`
    );
  }

  private clamp = (val: number) => {
    return Math.min(Math.max(val, this.min), this.max);
  };
}
