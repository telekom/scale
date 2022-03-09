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

let i = 0;

@Component({
  tag: 'scale-slider',
  styleUrl: './slider.css',
  shadow: true,
})
export class Slider {
  sliderTrack?: HTMLDivElement;
  /* Host HTML Element */
  @Element() hostElement: HTMLElement;
  /** (optional) the name of the slider */
  @Prop() name?: string;
  /** (optional) the display value of the slider */
  @Prop() value?: number;
  /** t(optional) he minimal value of the slider */
  @Prop() min?: number = 0;
  /** (optional) the maximal value of the slider */
  @Prop() max?: number = 100;
  /** (optional) the step size to increase or decrease when dragging slider */
  @Prop() step?: number = 1;
  /** (optional) slider label */
  @Prop() label?: string;
  /** (optional) slider display value */
  @Prop() showValue?: boolean = true;
  /** (optional) slider value unit */
  @Prop() unit?: string = '%';
  /** (optional) number of decimal places */
  @Prop() decimals?: 0 | 1 | 2 = 0;
  /** @deprecated - optional) slider custom color */
  @Prop() customColor?: string;
  /** (optional) disabled  */
  @Prop() disabled?: boolean = false;
  /** (optional) smaller track */
  @Prop() trackSmall?: boolean = false;
  /** (optional) larger thumb */
  @Prop() thumbLarge?: boolean = false;
  /** (optional) Slider id */
  @Prop() sliderId?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  // The actual position in % of the slider thumb
  @State() position: number;

  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter<number>;

  @Event({ eventName: 'scale-input' }) scaleInput: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleInput' }) scaleInputLegacy: EventEmitter<number>;

  private dragging: boolean;
  private offsetLeft: number;

  constructor() {
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillLoad() {
    if (this.sliderId == null) {
      this.sliderId = 'slider-' + i++;
    }
    this.setPosition();
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
  }

  onButtonDown = () => {
    if (this.disabled) {
      return;
    }
    this.onDragStart();
    this.addGlobalListeners();
  };

  onKeyDown = (event: KeyboardEvent) => {
    let steps = 0;
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      steps = event.key === 'ArrowRight' ? this.step : -this.step;
    }
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      steps = event.key === 'ArrowUp' ? this.step * 10 : -this.step * 10;
    }
    this.setValue(this.value + steps);
  };

  onDragStart = () => {
    this.dragging = true;
    this.offsetLeft = this.sliderTrack.getBoundingClientRect().left;
  };

  onDragging = (event: any) => {
    const { dragging, offsetLeft } = this;

    if (dragging) {
      const currentX = this.handleTouchEvent(event).clientX;
      const position: number =
        ((currentX - offsetLeft) / this.sliderTrack.offsetWidth) * 100;
      const nextValue = (position * (this.max - this.min)) / 100 + this.min;
      // https://stackoverflow.com/q/14627566
      const roundedNextValue = Math.ceil(nextValue / this.step) * this.step;
      this.setValue(roundedNextValue);
    }
  };

  onDragEnd = () => {
    this.dragging = false;
    emitEvent(this, 'scaleChange', this.value);
    this.removeGlobalListeners();
  };

  handleTouchEvent(event: any): MouseEvent | Touch {
    return event.type.indexOf('touch') === 0 ? event.touches[0] : event;
  }

  setValue = (nextValue: number) => {
    this.value = this.clamp(nextValue);
    emitEvent(this, 'scaleInput', this.value);
  };

  @Watch('value')
  handleValueChange() {
    this.setPosition();
  }

  setPosition = () => {
    if (!this.value) {
      this.position = 0;
      return;
    }
    const clampedValue = this.clamp(this.value);
    // https://stackoverflow.com/a/25835683
    this.position = ((clampedValue - this.min) * 100) / (this.max - this.min);
  };

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

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
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
          <div part="track-wrapper" class="slider__track-wrapper">
            <div
              part="track"
              class="slider__track"
              ref={(el) => (this.sliderTrack = el as HTMLDivElement)}
            >
              <div
                part="bar"
                class="slider__bar"
                style={{
                  width: `${this.position}%`,
                  backgroundColor: this.customColor
                    ? this.customColor
                    : this.disabled
                    ? `var(--background-bar-disabled)`
                    : `var(--background-bar)`,
                }}
              ></div>
              <div
                part="thumb-wrapper"
                class="slider__thumb-wrapper"
                style={{ left: `${this.position}%` }}
                onMouseDown={this.onButtonDown}
                onTouchStart={this.onButtonDown}
              >
                <div
                  part="thumb"
                  class="slider__thumb"
                  tabindex="0"
                  role="slider"
                  id={this.sliderId}
                  aria-valuemin={this.min}
                  aria-valuenow={this.value}
                  aria-valuemax={this.max}
                  aria-valuetext={`${this.value}`}
                  aria-labelledby={`${this.sliderId}-label`}
                  aria-orientation="horizontal"
                  aria-disabled={this.disabled}
                  onKeyDown={this.onKeyDown}
                />
              </div>
            </div>
            <input type="hidden" value={this.value} name={this.name} />
            {this.showValue && (
              <div part="display-value" class="slider__display-value">
                {this.value != null && this.value.toFixed(this.decimals)}
                {this.value != null && this.unit}
              </div>
            )}
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
      this.trackSmall && `${prefix}track-small`,
      this.thumbLarge && `${prefix}thumb-large`
    );
  }

  private clamp = (val: number) => {
    return Math.min(Math.max(val, this.min), this.max);
  };
}
