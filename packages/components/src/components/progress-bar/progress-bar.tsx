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

import { Component, Prop, h, Host, Element } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

const ICON_SIZE = 16;
let i = 0;
@Component({
  tag: 'scale-progress-bar',
  styleUrl: './progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  /* Host HTML Element */
  @Element() hostElement: HTMLElement;
  /** (optional) Progress bar busy switch */
  @Prop() busy?: boolean = false;
  /** (required) Progress bar percentage */
  @Prop() percentage: number = 0;
  /** (optional) Progress bar percentage to start the animation from (default: 0) */
  @Prop() percentageStart: number = 0;
  /** @deprecated - (optional) Progress bar customColor */
  @Prop() customColor?: string;
  /** (optional) Progress bar percentage text */
  @Prop() showStatus?: boolean = true;
  /** (optional) Progress bar icon indicator */
  @Prop() icon?: string;
  /** (optional) Progress bar status description text */
  @Prop() statusDescription?: string;
  /** (optional) Progress bar error */
  @Prop() hasError?: boolean;
  /** (optional) Progress bar disabled */
  @Prop() disabled?: boolean;
  /** (optional) Progress bar id */
  @Prop() progressBarId?: string;
  /** (optional) Progress bar label */
  @Prop() label?: string;
  /** (optional) disables aria-live */
  @Prop() mute?: boolean;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  componentWillLoad() {
    if (this.progressBarId == null) {
      this.progressBarId = 'progress-bar-' + i++;
    }
    if (this.disabled) {
      this.showStatus = false;
    }
  }
  componentWillUpdate() {}
  disconnectedCallback() {}
  componentDidRender() {
    if (this.customColor !== undefined) {
      statusNote({
        tag: 'deprecated',
        message: `Property "customColor" is deprecated. 
          Please use css variable "--background" to set the progress bar background color;
          e.g. <scale-progress-bar percentage="20" style="--background: green"></scale-progress-bar>`,
        type: 'warn',
        source: this.hostElement,
      });
    }
  }

  transitions = (width: number, widthStart: number) => `
    @keyframes showProgress {
      from {
        width: ${widthStart}%;
      }
      to {
        width: ${width}%;
      }
    }
  `;

  progressStyle = () => {
    const customColor = this.customColor
      ? { '--background': this.customColor }
      : {};
    return {
      '--progress': this.disabled ? '100%' : `${this.percentage}%`,
      ...customColor,
    };
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <style>{this.transitions(this.percentage, this.percentageStart)}</style>

        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div class="progress-bar__top-container">
            {!!this.label ? (
              <label
                part="label"
                class="progress-bar__label"
                htmlFor={this.progressBarId}
              >
                {this.label}
              </label>
            ) : (
              <span> </span>
            )}
            {!!this.showStatus && !this.hasError && this.percentage !== 100 && (
              <div
                part="status"
                class="progress-bar__status"
                aria-hidden="true"
              >
                {this.percentage}%
              </div>
            )}

            {this.hasError ? (
              <div class="progress-bar__icon">
                <scale-icon-alert-error
                  size={ICON_SIZE}
                ></scale-icon-alert-error>
              </div>
            ) : this.percentage === 100 ? (
              <div class="progress-bar__icon">
                <scale-icon-alert-success
                  size={ICON_SIZE}
                ></scale-icon-alert-success>
              </div>
            ) : null}
          </div>
          <div part="wrapper" class="progress-bar__wrapper">
            <div
              part="outer"
              class="progress-bar__outer"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={this.percentage}
              aria-busy={this.busy}
              aria-valuetext={`${this.percentage}%`}
              aria-label={this.label}
              id={this.progressBarId}
            >
              {this.percentage > 0 && (
                <div
                  part="inner"
                  class="progress-bar__inner"
                  style={this.progressStyle()}
                ></div>
              )}
            </div>
            <slot name="icon"></slot>
          </div>
        </div>
        {!!this.statusDescription && (
          <div
            part="status-description"
            class="progress-bar__status-description"
            role="alert"
          >
            {this.statusDescription}
          </div>
        )}
        {!this.mute && (
          <span aria-live="polite" class="progress-bar__aria-live">
            {this.percentage !== Math.round(this.percentage / 10) * 10
              ? `${Math.round(this.percentage / 10) * 10}%`
              : null}
          </span>
        )}
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
    const component = 'progress-bar';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.hasError && `${prefix}has-error`,
      this.disabled && `${prefix}disabled`,
      this.percentage === 100 && `${prefix}completed`
    );
  }
}
