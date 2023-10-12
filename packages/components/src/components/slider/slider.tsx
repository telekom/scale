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
  Fragment,
} from '@stencil/core';
import classNames from 'classnames';
import { emitEvent, generateUniqueId } from '../../utils/utils';
import statusNote from '../../utils/status-note';

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
  /** (optional) the value of the slider */
  @Prop({ mutable: true, reflect: true }) value?: number = 0;
  /** (optional) multi-thumb */
  @Prop() range?: boolean = false;
  /** (optional) when `range` is true, the "from" value */
  @Prop({ mutable: true, reflect: true }) valueFrom?: number = 0;
  /** (optional) when `range` is true, the "to" value */
  @Prop({ mutable: true, reflect: true }) valueTo?: number = 0;
  /** t(optional) he minimal value of the slider */
  @Prop() min?: number = 0;
  /** (optional) the maximal value of the slider */
  @Prop() max?: number = 100;
  /** (optional) the step size to increase or decrease when dragging slider */
  @Prop() step?: number = 1;
  /** (optional) show a mark for each step */
  @Prop() showStepMarks?: boolean = false;
  /** (optional) slider label */
  @Prop() label?: string;
  /** (optional) helper text */
  @Prop() helperText?: string;
  /** (optional) slider display value */
  @Prop() showValue?: boolean = true;
  /** (optional) slider value unit */
  @Prop() unit?: string = '';
  /** (optional) unit position */
  @Prop() unitPosition?: 'before' | 'after' = 'after';
  /** (optional) number of decimal places */
  @Prop() decimals?: 0 | 1 | 2 = 0;
  /**
   * (optional) adapt styles for a specific platform.
   * Ideally done via a global `data-platform` attribute
   * (e.g. data-platform="ios" on `body`)
   * but browser support is not yet sufficient.
   * @see @url(https://caniuse.com/mdn-css_selectors_host-context)
   */
  @Prop({ reflect: true }) platform?: 'ios' | 'android';
  /** @deprecated (optional) slider custom color */
  @Prop() customColor?: string;
  /** (optional) disabled  */
  @Prop() disabled?: boolean = false;
  /** @deprecated (optional) smaller track */
  @Prop() trackSmall?: boolean;
  /** @deprecated (optional) larger thumb */
  @Prop() thumbLarge?: boolean;
  /** (optional) Slider id */
  @Prop({ mutable: true }) sliderId?: string;
  /** (optional) Aria label for range slider */
  @Prop() innerAriaValueText = '$from to $to';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  // The actual position in % of the slider thumb
  @State() position: number = 0;
  @State() positionFrom: number = 25;
  @State() positionTo: number = 75;

  @Event({ eventName: 'scale-change' }) scaleChange: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleChange' }) scaleChangeLegacy: EventEmitter<number>;

  @Event({ eventName: 'scale-input' }) scaleInput: EventEmitter<number>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleInput' }) scaleInputLegacy: EventEmitter<number>;

  private dragging: boolean;
  // Don't know how to make TypeScript handle `this[offsetKey]`
  // private offsetLeft: number;
  // private offsetLeftFrom: number;
  // private offsetLeftTo: number;
  private activeRangeThumb: null | 'From' | 'To' = null;
  private readonly internalId = generateUniqueId();

  private lastThumbZIndex: number = 3

  constructor() {
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  @Watch('value')
  @Watch('valueFrom')
  @Watch('valueTo')
  handleValueChange() {
    this.setPosition();
  }

  componentWillLoad() {
    if (this.sliderId == null) {
      this.sliderId = 'slider-' + this.internalId;
    }
    // Set initial position
    if (this.range) {
      this.setPosition('From');
      this.setPosition('To');
    } else {
      this.setPosition();
    }
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

  onButtonDown = (event) => {
    if (this.disabled) {
      return;
    }
    this.setActiveRangeThumbFromEvent(event);
    this.onDragStart();
    this.addGlobalListeners(event);
  };

  onKeyDown = (event: KeyboardEvent) => {
    let steps = 0;
    this.setActiveRangeThumbFromEvent(event);
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      steps = event.key === 'ArrowRight' ? this.step : -this.step;
    }
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      steps = event.key === 'ArrowUp' ? this.step * 10 : -this.step * 10;
    }
    const valueKey = this.getKeyFor('value');
    this.setValue(this[valueKey] + steps, valueKey);
    emitEvent(
      this,
      'scaleChange',
      this.range ? [this.valueFrom, this.valueTo] : this.value
    );
  };

  onDragStart = () => {
    const offsetKey = this.getKeyFor('offsetLeft');
    this.dragging = true;
    this[offsetKey] = this.sliderTrack.getBoundingClientRect().left;
  };

  onDragging = (event: any) => {
    if (!this.dragging) {
      return;
    }
    const valueKey = this.getKeyFor('value');
    const offsetLeftKey = this.getKeyFor('offsetLeft');
    const offsetLeft = this[offsetLeftKey];

    const currentX = this.handleTouchEvent(event).clientX;
    const position: number =
      ((currentX - offsetLeft) / this.sliderTrack.offsetWidth) * 100;
    const nextValue = (position * (this.max - this.min)) / 100 + this.min;
    // https://stackoverflow.com/q/14627566
    const roundedNextValue = Math.ceil(nextValue / this.step) * this.step;
    this.setValue(roundedNextValue, valueKey);
  };

  onDragEnd = () => {
    this.dragging = false;
    emitEvent(
      this,
      'scaleChange',
      this.range ? [this.valueFrom, this.valueTo] : this.value
    );
    this.removeGlobalListeners();
  };

  handleTouchEvent(event: any): MouseEvent | Touch {
    return event.type.indexOf('touch') === 0 ? event.touches[0] : event;
  }

  setValue = (
    nextValue: number,
    valueKey: string | 'value' | 'valueFrom' | 'valueTo' = 'value'
  ) => {
    this[valueKey] = this.clamp(nextValue);
    emitEvent(
      this,
      'scaleInput',
      this.range ? [this.valueFrom, this.valueTo] : this.value
    );
  };

  setActiveRangeThumbFromEvent = (event) => {
    if (!this.range) {
      this.activeRangeThumb = null;
      return;
    }
    const part = (event.target as HTMLElement).part;
    this.activeRangeThumb = part.contains('from') ? 'From' : 'To';
  };

  setPosition = (thumb?: string) => {
    const valueKey = this.getKeyFor('value', thumb);
    const positionKey = this.getKeyFor('position', thumb);
    const clampedValue = this.clamp(this[valueKey]);
    // https://stackoverflow.com/a/25835683
    // ((input - min) * 100) / (max - min)
    this[positionKey] =
      ((clampedValue - this.min) * 100) / (this.max - this.min);
  };

  /**
   * Utility function
   * e.g. 'value' -> 'valueFrom' if `activeRangeThumb='From'`
   * @param propName
   * @returns {string} The prop name with the range suffix if needed
   */
  getKeyFor = (
    propName: 'value' | 'offsetLeft' | 'position',
    thumb?: string
  ) => {
    if (this.range) {
      return `${propName}${this.activeRangeThumb ?? thumb}`;
    }
    return propName;
  };

  getTextValue = () => {
    if (this.range) {
      const from = this.valueFrom?.toFixed(this.decimals);
      const to = this.valueTo?.toFixed(this.decimals);
      return this.unitPosition === 'before'
        ? `${this.unit}${from} - ${this.unit}${to}`
        : `${from}${this.unit} - ${to}${this.unit}`;
    }
    return this.unitPosition === 'before'
      ? `${this.unit}${this.value?.toFixed(this.decimals)}`
      : `${this.value?.toFixed(this.decimals)}${this.unit}`;
  };

  getNumberOfSteps = () => {
    const n = (this.max - this.min) / this.step + 1;
    return [...Array(n).keys()];
  };

  clamp = (val: number) => {
    let min = this.min;
    let max = this.max;
    // Take into account the other thumb, when `range=true`
    if (this.range) {
      if (this.activeRangeThumb === 'From') {
        max = Math.min(this.valueTo, this.max);
      } else if (this.activeRangeThumb === 'To') {
        min = Math.max(this.valueFrom, this.min);
      }
    }
    // Regular generic clamp
    return Math.min(Math.max(val, min), max);
  };

  addGlobalListeners(e) {
    this.lastThumbZ = this.lastThumbZIndex + 1
    e.target.parentNode.style.zIndex = this.lastThumbZIndex.toString()
    window.addEventListener('mousemove', this.onDragging);
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchmove', this.onDragging);
    window.addEventListener('touchend', this.onDragEnd);
  }

  removeGlobalListeners() {
    window.removeEventListener('mousemove', this.onDragging);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchmove', this.onDragging);
    window.removeEventListener('touchend', this.onDragEnd);
  }

  getRangeAriaValueText() {
    const filledText = this.innerAriaValueText
      .replace(/\$from/g, `${this.valueFrom}`)
      .replace(/\$to/g, `${this.valueTo}`);
    return filledText;
  }

  render() {
    const helperTextId = `helper-message-${this.internalId}`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part={classNames('base', this.disabled && 'disabled')}>
          <div part="label-wrapper">
            {!!this.label && (
              <label
                part="label"
                id={`${this.sliderId}-label`}
                htmlFor={this.sliderId}
              >
                {this.label}
              </label>
            )}
            {this.showValue && (
              <div part="value-text">{this.getTextValue()}</div>
            )}
          </div>
          <div part="track-wrapper">
            <div
              part="track"
              ref={(el) => (this.sliderTrack = el as HTMLDivElement)}
            >
              <div
                part="bar"
                style={{
                  left: (this.range ? this.positionFrom : 0) + '%',
                  width: `${
                    this.range
                      ? this.positionTo - this.positionFrom
                      : this.position
                  }%`,
                }}
              ></div>
              {this.showStepMarks && (
                <div part="step-marks">
                  {this.getNumberOfSteps().map(() => (
                    <span part="step-mark"></span>
                  ))}
                </div>
              )}
              <div part="inner-track">
                {/* Two thumbs or one */}
                {this.range ? (
                  <Fragment>
                    <div
                      part="thumb-wrapper from"
                      style={{ left: `${this.positionFrom}%` }}
                      onMouseDown={this.onButtonDown}
                      onTouchStart={this.onButtonDown}
                    >
                      <div
                        part="thumb from"
                        tabindex="0"
                        role="slider"
                        id={this.sliderId + '-from'}
                        aria-valuemin={this.min}
                        aria-valuenow={`${this.valueFrom} to ${this.valueTo}`}
                        aria-valuemax={this.max}
                        aria-valuetext={`${this.valueFrom} to ${this.valueTo}`}
                        aria-labelledby={`${this.sliderId}-label`}
                        aria-orientation="horizontal"
                        aria-disabled={this.disabled}
                        {...(this.helperText ? ariaDescribedByAttr : {})}
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                    <div
                      part="thumb-wrapper to"
                      style={{ left: `${this.positionTo}%` }}
                      onMouseDown={this.onButtonDown}
                      onTouchStart={this.onButtonDown}
                    >
                      <div
                        part="thumb to"
                        tabindex="0"
                        role="slider"
                        id={this.sliderId + '-to'}
                        aria-valuemin={this.min}
                        aria-valuenow={this.value}
                        aria-valuemax={this.max}
                        aria-valuetext={this.getRangeAriaValueText()}
                        aria-labelledby={`${this.sliderId}-label`}
                        aria-orientation="horizontal"
                        aria-disabled={this.disabled}
                        {...(this.helperText ? ariaDescribedByAttr : {})}
                        onKeyDown={this.onKeyDown}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <div
                    part="thumb-wrapper"
                    style={{ left: `${this.position}%` }}
                    onMouseDown={this.onButtonDown}
                    onTouchStart={this.onButtonDown}
                  >
                    <div
                      part="thumb"
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
                      {...(this.helperText ? ariaDescribedByAttr : {})}
                      onKeyDown={this.onKeyDown}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* (a11y) Not sure about this being only one input, or its value, or useful at all… */}
          <input type="hidden" value={this.getTextValue()} name={this.name} />
          {this.helperText && (
            <div
              part="meta"
              id={helperTextId}
              aria-live="polite"
              aria-relevant="additions removals"
            >
              <div part="helper-text">{this.helperText}</div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
